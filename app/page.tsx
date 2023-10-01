import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { Card, CardDescription, CardTitle } from "@/components/card"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "article",
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.ogImage.toString(),
        width: 1200,
        height: 530,
        alt: siteConfig.name,
      },
    ],
  },
}

//<span className="text-sky-500 dark:text-sky-600">r</span>

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Build Aplications with Confidence
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Lorem ipsum dolor sit amet consectetura dipisicing elit. Officiis
            animi, recu sandae a tque vero quod magni imp edit tempore ipsa.
            Ratione dicta? Ape riam, dolores.
          </p>
        </div>
      </section>
      <section
        id="frontend"
        className="container space-y-6 py-8 dark:bg-transparent md:py-10 lg:py-16"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Frontend
          </h2>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {frontend.map((language) => (
            <Card
              key={language.href}
              href={language.href}
              pattern={language.pattern}
            >
              {language.icon}
              <CardTitle>{language.title}</CardTitle>
              <CardDescription>{language.description}</CardDescription>
            </Card>
          ))}
        </div>
      </section>
      <section
        id="backend"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-10 lg:py-16"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Backend
          </h2>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {backend.map((language) => (
            <Card
              key={language.href}
              href={language.href}
              pattern={language.pattern}
            >
              {language.icon}
              <CardTitle>{language.title}</CardTitle>
              <CardDescription>{language.description}</CardDescription>
            </Card>
          ))}
        </div>
      </section>
      <section
        id="database"
        className="container space-y-6  py-8 dark:bg-transparent md:py-10 lg:py-16"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Database
          </h2>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {database.map((language) => (
            <Card
              key={language.href}
              href={language.href}
              pattern={language.pattern}
            >
              {language.icon}
              <CardTitle>{language.title}</CardTitle>
              <CardDescription>{language.description}</CardDescription>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}

const frontend = [
  {
    href: "/docs/js",
    title: "JavaScript",
    description:
      "Scripting language for web development, but it is used everywhere",
    icon: <Icons.javascript />,
    pattern: {
      y: -12,
      squares: [
        [0, 2],
        [1, 3],
      ],
    },
  },
  {
    href: "/docs/ts",
    title: "TypeScript",
    description:
      "Statically typed superset of JavaScript that enhances code quality.",
    icon: <Icons.typescript />,
    pattern: {
      y: 0,
      squares: [
        [1, 4],
        [1, 4],
      ],
    },
  },
  {
    href: "/docs/react",
    title: "React",
    description: "Library for building web and native user interfaces.",
    icon: <Icons.react />,
    pattern: {
      y: -8,
      squares: [
        [-2, 0],
        [1, 3],
      ],
    },
  },
  {
    href: "/docs/next",
    title: "Next.js",
    description:
      "The React framework for building full-stack web applications.",
    icon: <Icons.nextjs />,
    pattern: {
      y: 8,
      squares: [
        [1, 2],
        [0, 2],
      ],
    },
  },
  {
    href: "/docs/react-native",
    title: "React Native",
    description: "Native apps with React",
    icon: <Icons.react />,
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  {
    href: "/docs/vue",
    title: "Vue",
    description: "JavaScript framework for building user interfaces.",
    icon: <Icons.vue />,
    pattern: {
      y: -6,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  },
]

const backend = [
  {
    href: "/docs/node",
    title: "Node.js",
    description:
      "Runtime environment that allows executing JavaScript code outside web browsers.",
    icon: <Icons.nodejs />,
    pattern: {
      y: 32,
      squares: [
        [0, 2],
        [1, 4],
      ],
    },
  },
]

const database = [
  {
    href: "/docs/mysql",
    title: "MySql",
    description:
      "Relational database management system, known for its speed, reliability.",
    icon: <Icons.planetScale />,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
]
