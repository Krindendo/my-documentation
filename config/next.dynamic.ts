import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, normalize, sep } from 'node:path';

import matter from 'gray-matter';
import { cache } from 'react';
import { VFile } from 'vfile';

import { BASE_URL, BASE_PATH, IS_DEVELOPMENT } from '@/config/constants';
import {
  IGNORED_ROUTES,
  DYNAMIC_ROUTES,
  PAGE_METADATA,
} from '@/config/dynamic.constants';
import { getMarkdownFiles } from '@/config/next.helpers';
import { siteConfig } from '@/config/site';
import { compileMDX } from '@/config/next.mdx.compiler';

// This is the combination of the Application Base URL and Base PATH
const baseUrlAndPath = `${BASE_URL}${BASE_PATH}`;

// This is a small utility that allows us to quickly separate locale from the remaining pathname
const getPathname = (path = []) => path.join('/');

// This maps a pathname into an actual route object that can be used
// we use a platform-specific separator to split the pathname
// since we're using filepaths here and not URL paths
const mapPathToRoute = (path = '') => ({ path: path.split(sep) });

// Provides an in-memory Map that lasts the whole build process
// and disabled when on development mode (stubbed)
const createCachedMarkdownCache = () => {
  if (IS_DEVELOPMENT) {
    return {
      has: () => false,
      set: () => {},
      get: () => null,
    };
  }

  return new Map();
};

const getDynamicRouter = async () => {
  // Creates a Cache System that is disabled during development mode
  const cachedMarkdownFiles = createCachedMarkdownCache();

  // Keeps the map of pathnames to filenames
  const pathnameToFilename = new Map();

  const websitePages = await getMarkdownFiles(process.cwd(), `pages`);

  websitePages.forEach(filename => {
    // This Regular Expression is used to remove the `index.md(x)` suffix
    // of a name and to remove the `.md(x)` extensions of a filename.
    let pathname = filename.replace(/((\/)?(index))?\.mdx?$/i, '');

    if (pathname.length > 1 && pathname.endsWith(sep)) {
      pathname = pathname.substring(0, pathname.length - 1);
    }

    pathname = normalize(pathname).replace('.', '');

    // We map the pathname to the filename to be able to quickly
    // resolve the filename for a given pathname
    pathnameToFilename.set(pathname, filename);
  });

  /**
   * This method returns a list of all routes that exist for a given locale
   *
   * @returns {Array<string>}
   */
  const getRoutes = async () => {
    const shouldIgnoreStaticRoute = pathname =>
      IGNORED_ROUTES.every(e => !e({ pathname }));

    return [...pathnameToFilename.keys()]
      .filter(shouldIgnoreStaticRoute)
      .concat([...DYNAMIC_ROUTES.keys()]);
  };

  /**
   * This method attempts to retrieve either a localized Markdown file
   * or the English version of the Markdown file if no localized version exists
   * and then returns the contents of the file and the name of the file (not the path)
   *
   * @param {string} locale
   * @param {string} pathname
   * @returns {Promise<{ source: string; filename: string }>}
   */
  const _getMarkdownFile = async (pathname = '') => {
    const normalizedPathname = normalize(pathname).replace('.', '');

    // This verifies if the given pathname actually exists on our Map
    // meaning that the route exists on the website and can be rendered
    if (pathnameToFilename.has(normalizedPathname)) {
      const filename = pathnameToFilename.get(normalizedPathname);

      let filePath = join(process.cwd(), 'pages');

      // We verify if our Markdown cache already has a cache entry for a localized
      // version of this file, because if not, it means that either
      // we did not cache this file yet or there is no localized version of this file
      if (cachedMarkdownFiles.has(normalizedPathname)) {
        const fileContent = cachedMarkdownFiles.get(normalizedPathname);

        return { source: fileContent, filename };
      }

      // No cache hit exists, so we check if the localized file actually
      // exists within our file system and if it does we set it on the cache
      // and return the current fetched result; If the file does not exist
      // we fallback to the English source
      if (existsSync(join(filePath, filename))) {
        filePath = join(filePath, filename);

        const fileContent = await readFile(filePath, 'utf8');

        cachedMarkdownFiles.set(normalizedPathname, fileContent);

        return { source: fileContent, filename };
      }

      // We then attempt to retrieve the source version of the file as there is no localised version
      // of the file and we set it on the cache to prevent future checks of the same locale for this file
      const { source: fileContent } = await _getMarkdownFile(pathname);

      // We set the source file on the localized cache to prevent future checks
      // of the same locale for this file and improve read performance
      cachedMarkdownFiles.set(normalizedPathname, fileContent);

      return { source: fileContent, filename };
    }

    return { filename: '', source: '' };
  };

  // Creates a Cached Version of the Markdown File Resolver
  const getMarkdownFile = cache(async pathname => {
    return await _getMarkdownFile(pathname);
  });

  /**
   * This method runs the MDX compiler on the server-side and returns the
   * parsed JSX ready to be rendered on a page as a React Component
   *
   * @param {string} source
   * @param {string} filename
   */
  const _getMDXContent = async (source = '', filename = '') => {
    // We create a VFile (Virtual File) to be able to access some contextual
    // data post serialization (compilation) of the source Markdown into MDX
    const sourceAsVirtualFile = new VFile(source);

    // Gets the file extension of the file, to determine which parser and plugins to use
    const fileExtension = filename.endsWith('.mdx') ? 'mdx' : 'md';

    // This compiles our MDX source (VFile) into a final MDX-parsed VFile
    // that then is passed as a string to the MDXProvider which will run the MDX Code
    return compileMDX(sourceAsVirtualFile, fileExtension);
  };

  // Creates a Cached Version of the MDX Compiler
  const getMDXContent = cache(async (source, filename) => {
    return await _getMDXContent(source, filename);
  });

  /**
   * This method generates the Next.js App Router Metadata
   * that can be used for each page to provide metadata
   *
   * @param {string} path
   * @returns {import('next').Metadata}
   */
  const _getPageMetadata = async (path = '') => {
    const pageMetadata = { ...PAGE_METADATA };

    const { source = '' } = await getMarkdownFile(path);

    const { data } = matter(source);

    pageMetadata.title = data.title
      ? `${siteConfig.title} — ${data.title}`
      : siteConfig.title;

    pageMetadata.twitter.title = pageMetadata.title;

    const getUrlForPathname = p => `${baseUrlAndPath}/${p ? `/${p}` : ''}`;

    pageMetadata.alternates.canonical = getUrlForPathname(path);

    pageMetadata.alternates.languages['x-default'] = getUrlForPathname(path);

    return pageMetadata;
  };

  // Creates a Cached Version of the Page Metadata Context
  const getPageMetadata = cache(async (locale, path) => {
    return await _getPageMetadata(locale, path);
  });

  return {
    mapPathToRoute,
    getPathname,
    getRoutes,
    getMDXContent,
    getMarkdownFile,
    getPageMetadata,
  };
};

export const dynamicRouter = await getDynamicRouter();
