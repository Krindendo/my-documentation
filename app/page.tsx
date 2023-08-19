import { Metadata } from "next"
import Link from "next/link"

import { siteConfig } from "@/config/site"
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
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
}

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Build Aplications with Confidence
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Lorem ipsum dolor sit a
            <span className="text-orange-500 dark:text-orange-600">m</span>et
            consectetur{" "}
            <span className="text-orange-500 dark:text-orange-600">a</span>
            dipisicing elit. Officiis animi, recu
            <span className="text-orange-500 dark:text-orange-600">s</span>andae
            a<span className="text-orange-500 dark:text-orange-600">t</span>que
            vero quod magni imp
            <span className="text-orange-500 dark:text-orange-600">e</span>dit
            tempore ipsa. Ratione dicta? Ape
            <span className="text-orange-500 dark:text-orange-600">r</span>iam,
            dolores.
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
          <Link
            href="/docs/js"
            className="relative overflow-hidden rounded-lg border bg-background p-2 hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.javascript />
              <div className="space-y-2">
                <h3 className="font-bold">JavaScript</h3>
                <p className="text-sm text-muted-foreground">
                  Scripting language for web development, but it is used
                  everywhere
                </p>
              </div>
            </div>
          </Link>
          <Link
            href="/docs/ts"
            className="relative overflow-hidden rounded-lg border bg-background p-2 hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.typescript />
              <div className="space-y-2">
                <h3 className="font-bold">TypeScript</h3>
                <p className="text-sm text-muted-foreground">
                  Statically typed superset of JavaScript that enhances code
                  quality.
                </p>
              </div>
            </div>
          </Link>
          <Link
            href="/docs/react"
            className="relative overflow-hidden rounded-lg border bg-background p-2 hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.react />
              <div className="space-y-2">
                <h3 className="font-bold">React</h3>
                <p className="text-sm text-muted-foreground">
                  Library for building web and native user interfaces.
                </p>
              </div>
            </div>
          </Link>
          <Link
            href="/docs/next"
            className="relative overflow-hidden rounded-lg border bg-background p-2 hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.nextjs />
              <div className="space-y-2">
                <h3 className="font-bold">Next.js</h3>
                <p className="text-sm text-muted-foreground">
                  The React framework for building <br /> full-stack web
                  applications.
                </p>
              </div>
            </div>
          </Link>
          <Link
            href="/docs/react-native"
            className="relative overflow-hidden rounded-lg border bg-background p-2 hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.react />
              <div className="space-y-2">
                <h3 className="font-bold">React Native</h3>
                <p className="text-sm text-muted-foreground">
                  Native apps with React
                </p>
              </div>
            </div>
          </Link>
          <Link
            href="/docs/vue"
            className="relative overflow-hidden rounded-lg border bg-background p-2 hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.vue />
              <div className="space-y-2">
                <h3 className="font-bold">Vue</h3>
                <p className="text-sm text-muted-foreground">
                  JavaScript framework for building user interfaces.
                </p>
              </div>
            </div>
          </Link>
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
          <Link
            href="/docs/node"
            className="relative overflow-hidden rounded-lg border bg-background p-2 hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.nodejs />
              <div className="space-y-2">
                <h3 className="font-bold">Node.js</h3>
                <p className="text-sm text-muted-foreground">
                  Runtime environment that allows executing JavaScript code
                  outside web browsers.
                </p>
              </div>
            </div>
          </Link>
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
          <Link
            href="/docs/mysql"
            className="relative overflow-hidden rounded-lg border bg-background p-2 hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.planetScale />
              <div className="space-y-2">
                <h3 className="font-bold">MySql</h3>
                <p className="text-sm text-muted-foreground">
                  Relational database management system, known for its speed,
                  reliability.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </>
  )
}

/*
Add this two text in className for fade-up animation:
animate-fade-up opacity-0
and add this class with increment animationDelay
style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
*/
