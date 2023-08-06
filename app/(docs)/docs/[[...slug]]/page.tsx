interface DocPageProps {
  params: {
    slug: string[]
  }
}

export default async function DocPage({ params }: DocPageProps) {
  return (
    <main>
      <h1>Test</h1>
    </main>
  )
}
