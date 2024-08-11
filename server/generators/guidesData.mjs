'use strict';

import { createReadStream } from 'node:fs';
import { basename, extname, join } from 'node:path';
import readline from 'node:readline';

import graymatter from 'gray-matter';

import { getMarkdownFiles } from '@/config/next.helpers';

// gets the current guide path based on local module path
const guidePath = join(process.cwd(), 'pages/guides');

/**
 * This contains the metadata of all available guide categories
 */
const guideCategories = new Set(['all']);

/**
 * This method parses the source (raw) Markdown content into Frontmatter
 * and returns basic information for guide posts
 *
 * @param {string} filename the filename related to the guidepost
 * @param {string} source the source markdown content of the guide post
 */
const getFrontMatter = (filename, source) => {
  const {
    title = 'Untitled',
    date = new Date(),
    category = 'uncategorized',
    published = true,
  } = graymatter(source).data;

  // We also use publishing years as categories for the guide
  const publishYear = new Date(date).getUTCFullYear();

  // Provides a full list of categories for the guide Post which consists of
  // all = (all guide posts), publish year and the actual guide category
  const categories = [category, `year-${publishYear}`, 'all'];

  // we add the year to the categories set
  guideCategories.add(`year-${publishYear}`);

  // we add the category to the categories set
  guideCategories.add(category);

  // this is the url used for the guide post it based on the category and filename
  const slug = `/guides/${category}/${basename(filename, extname(filename))}`;

  return { title, published, date: new Date(date), categories, slug };
};

/**
 * This method is used to generate the Node.js Website guide Data
 * for self-consumption during RSC and Static Builds
 *
 * @return {Promise<import('../../types').guideData>}
 */
const generateGuideData = async () => {
  // We retrieve the full pathnames of all guide Posts to read each file individually
  const filenames = await getMarkdownFiles(process.cwd(), 'pages/guides', [
    '**/index.md',
  ]);

  return new Promise(resolve => {
    const posts = [];
    const rawFrontmatter = [];

    filenames.forEach(filename => {
      // We create a stream for reading a file instead of reading the files
      const _stream = createReadStream(join(guidePath, filename));

      // We create a readline interface to read the file line-by-line
      const _readLine = readline.createInterface({ input: _stream });

      // Creates an array of the metadata based on the filename
      // This prevents concurrency issues since the for-loop is synchronous
      // and these event listeners are not
      rawFrontmatter[filename] = [0, ''];

      // We read line by line
      _readLine.on('line', line => {
        rawFrontmatter[filename][1] += `${line}\n`;

        // We observe the frontmatter separators
        if (line === '---') {
          rawFrontmatter[filename][0] += 1;
        }

        // Once we have two separators we close the readLine and the stream
        if (rawFrontmatter[filename][0] === 2) {
          _readLine.close();
          _stream.close();
        }
      });

      // Then we parse gray-matter on the frontmatter
      // This allows us to only read the frontmatter part of each file
      // and optimise the read-process as we have thousands of markdown files
      _readLine.on('close', () => {
        posts.push(getFrontMatter(filename, rawFrontmatter[filename][1]));

        if (posts.length === filenames.length) {
          resolve({ categories: [...guideCategories], posts });
        }
      });
    });
  });
};

export default generateGuideData;
