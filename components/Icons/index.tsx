import {
  Check,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Laptop,
  Loader2,
  LucideProps,
  Menu,
  Moon,
  Search,
  SunMedium,
  X,
} from 'lucide-react';
import { LogoPlanetScale } from './Companies/planet-scale';
import { LogoMySQL } from './Languages/my-sql';
import { LogoNodejs } from './Languages/nodejs';
import { LogoVue } from './Languages/vue';
import { LogoNextjs } from './Languages/nextjs';
import { LogoReact } from './Languages/react';
import { LogoGithub } from './Companies/github';
import { LogoJavaScript } from './Languages/javascript';
import { LogoTypeScript } from './Languages/typescript';

export const Icons = {
  logo: Globe2,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  check: Check,
  menu: Menu,
  search: Search,
  gitHub: (props: LucideProps) => (
    <>
      <LogoGithub {...props} />
      <span className="sr-only">Github</span>
    </>
  ),
  javascript: (props: LucideProps) => (
    <>
      <LogoJavaScript {...props} />
      <span className="sr-only">Javascript</span>
    </>
  ),
  typescript: (props: LucideProps) => (
    <>
      <LogoTypeScript {...props} />
      <span className="sr-only">Typescript</span>
    </>
  ),
  react: (props: LucideProps) => (
    <>
      <LogoReact {...props} />
      <span className="sr-only">React</span>
    </>
  ),
  nextjs: (props: LucideProps) => (
    <>
      <LogoNextjs {...props} />
      <span className="sr-only">Next.js</span>
    </>
  ),
  vue: (props: LucideProps) => (
    <>
      <LogoVue {...props} />
      <span className="sr-only">Vue</span>
    </>
  ),
  nodejs: (props: LucideProps) => (
    <>
      <LogoNodejs {...props} />
      <span className="sr-only">Nodejs</span>
    </>
  ),
  mysql: (props: LucideProps) => (
    <>
      <LogoMySQL {...props} />
      <span className="sr-only">MySQL</span>
    </>
  ),
  planetScale: (props: LucideProps) => (
    <>
      <LogoPlanetScale {...props} />
      <span className="sr-only">PlanetScale</span>
    </>
  ),
};
