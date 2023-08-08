import Link from "next/link"

import { Icons } from "@/components/icons"

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            animi, recusandae atque vero quod magni impedit tempore ipsa.
            Ratione dicta? Aperiam, dolores.
          </p>
        </div>
      </section>
      <section
        id="frontend"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-10 lg:py-16"
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>
      <section
        id="database"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-10 lg:py-16"
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </>
  )
}
