import { NextRequest } from 'next/server';
// import { allGuides } from "content-collections"
import { compareDesc } from 'date-fns';
import { safeStringToInteger } from '@/util/transformString';
import { VERCEL_REVALIDATE } from '@/config/constants';

//TODO: Make test for this request
//await new Promise((resolve) => setTimeout(resolve, 5000))

const PER_PAGE = 20;

type StaticParams = {
  params: { page: string };
};

export async function GET(req: NextRequest, { params }: StaticParams) {
  const requestedPage = Number(params.page);

  try {
    const keywords = req.nextUrl.searchParams.get('keywords');
    let page = safeStringToInteger(req.nextUrl.searchParams.get('page'));
    if (page <= 0) {
      page = 1;
    }
    let guides = allGuides
      .filter(guide => guide.published)
      .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
    if (keywords) {
      guides = guides.filter(guide =>
        guide.title.toLowerCase().includes(keywords.toLowerCase())
      );
    }
    const guidesLength = guides.length;
    const maxPages = Math.ceil(guidesLength / PER_PAGE);
    const startIndex = (page - 1) * PER_PAGE;
    const endIndex = startIndex + PER_PAGE;
    guides = guides.slice(startIndex, endIndex);
    const response = {
      currentPage: page,
      maximumPages: maxPages,
      guidesPerPage: PER_PAGE,
      guidesLength,
      guides,
    };
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export const runtime = 'edge';

export const preferredRegion = ['fra1', 'cdg1'];

// Enforces that only the paths from `generateStaticParams` are allowed, giving 404 on the contrary
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = false;

// Enforces that this route is cached and static as much as possible
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'error';

// Ensures that this endpoint is invalidated and re-executed every X minutes
// so that when new deployments happen, the data is refreshed
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = VERCEL_REVALIDATE;
