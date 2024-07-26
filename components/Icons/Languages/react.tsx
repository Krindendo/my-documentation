'use client';

import type { FC, SVGProps } from 'react';

const LogoReact: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    className="h-12 w-12 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-11.5 -10.23174 23 20.46348"
    {...props}
  >
    <circle
      cx="0"
      cy="0"
      r="2.05"
      fill="#61dafb"
      className=" dark:fill-current"
    />
    <g
      stroke="#61dafb"
      strokeWidth="1"
      fill="none"
      className="dark:stroke-current"
    >
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export default LogoReact;
