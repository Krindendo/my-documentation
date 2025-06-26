"use client";

import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";

import { GridPattern, GridPatternProps } from "@/components/grid-pattern";

export interface CardProps {
  children: React.ReactNode;
  href: Url;
  pattern: { y: number; squares: number[][] };
}

function Card({ children, href, pattern }: CardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <Link href={href} className="overflow-hidden" prefetch={true}>
      <div
        onMouseMove={({ currentTarget, clientX, clientY }) => {
          const { left, top } = currentTarget.getBoundingClientRect();
          mouseX.set(clientX - left);
          mouseY.set(clientY - top);
        }}
        className="group relative flex h-full rounded-2xl bg-zinc-50 pt-5 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/5 dark:hover:shadow-black/5"
      >
        <CardPattern mouseX={mouseX} mouseY={mouseY} {...pattern} />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/10 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
        <div className="relative rounded-2xl p-6">{children}</div>
      </div>
    </Link>
  );
}

export interface CardTitleProps {
  children: React.ReactNode;
}

function CardTitle({ children }: CardTitleProps) {
  return (
    <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-white">
      <span className="absolute inset-0 rounded-2xl" />
      {children}
    </h3>
  );
}

export interface CardDescriptionProps {
  children: React.ReactNode;
}

function CardDescription({ children }: CardDescriptionProps) {
  return (
    <p className="mt-1 text-sm leading-5 text-zinc-600 dark:text-zinc-400">
      {children}
    </p>
  );
}

interface CardPatternProps
  extends Omit<GridPatternProps, "width" | "height" | "x"> {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

function CardPattern({ mouseX, mouseY, ...gridProps }: CardPatternProps) {
  const maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/5 dark:stroke-white/5"
          {...gridProps}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-100 to-yellow-100 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-orange-800 dark:to-yellow-600"
        // className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-100 to-yellow-100 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-orange-800 dark:to-yellow-600"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/5 dark:stroke-white/10"
          {...gridProps}
        />
      </motion.div>
    </div>
  );
}

export { Card, CardTitle, CardDescription };
