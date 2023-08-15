interface GuidePageProps {
  params: {
    slug: string[]
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  return (
    <div>
      <h1>Guide Page</h1>
      <h3>{params.slug}</h3>
    </div>
  )
}
