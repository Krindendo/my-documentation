import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

import { siteConfig } from '@/config/site';
import { ogImageSchema } from '@/util/validations/og';

export const runtime = 'edge';

export const preferredRegion = ['fra1', 'cdg1'];

const interRegular = fetch(
  new URL('public/static/fonts/Inter-Regular.ttf', import.meta.url)
).then(res => res.arrayBuffer());

const interBold = fetch(
  new URL('public/static/fonts/CalSans-SemiBold.ttf', import.meta.url)
).then(res => res.arrayBuffer());

export async function GET(req: NextRequest) {
  try {
    const fontRegular = await interRegular;
    const fontBold = await interBold;

    const url = new URL(req.url);
    const values = ogImageSchema.parse(Object.fromEntries(url.searchParams));
    const heading =
      values.heading.length > 140
        ? `${values.heading.substring(0, 140)}...`
        : values.heading;

    const { mode } = values;
    const paint = mode === 'dark' ? '#fff' : '#000';

    const fontSize = heading.length > 100 ? '70px' : '100px';
    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col p-12 w-full h-full items-start"
          style={{
            color: paint,
            background:
              mode === 'dark'
                ? 'linear-gradient(90deg, #000 0%, #111 100%)'
                : 'white',
          }}
        >
          <div tw="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className=" lucide lucide-globe-2"
            >
              <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
              <path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17" />
              <path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <div
              tw="flex text-xl font-bold tracking-tight ml-2"
              style={{ fontFamily: 'Inter', fontWeight: 'normal' }}
            >
              {siteConfig.title}
            </div>
          </div>
          <div tw="flex flex-col flex-1 py-10">
            <div
              tw="flex text-xl uppercase font-bold tracking-tight"
              style={{ fontFamily: 'Inter', fontWeight: 'normal' }}
            >
              {values.type}
            </div>
            <div
              tw="flex leading-[1.1] text-[80px] font-bold"
              style={{
                fontFamily: 'Cal Sans',
                fontWeight: 'bold',
                marginLeft: '-3px',
                fontSize,
              }}
            >
              {heading}
            </div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div
              tw="flex text-xl"
              style={{ fontFamily: 'Inter', fontWeight: 'normal' }}
            >
              my-documentation-omega.vercel.app
            </div>
            <div
              tw="items-center text-xl"
              style={{
                display: 'flex',
                fontFamily: 'Inter',
                fontWeight: 'normal',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <path
                  d="M30 44v-8a9.6 9.6 0 0 0-2-7c6 0 12-4 12-11 .16-2.5-.54-4.96-2-7 .56-2.3.56-4.7 0-7 0 0-2 0-6 3-5.28-1-10.72-1-16 0-4-3-6-3-6-3-.6 2.3-.6 4.7 0 7a10.806 10.806 0 0 0-2 7c0 7 6 11 12 11a9.43 9.43 0 0 0-1.7 3.3c-.34 1.2-.44 2.46-.3 3.7v8"
                  stroke={paint}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 36c-9.02 4-10-4-14-4"
                  stroke={paint}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div tw="flex ml-2">github.com/Krindendo/my-documentation</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontRegular,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Cal Sans',
            data: fontBold,
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
