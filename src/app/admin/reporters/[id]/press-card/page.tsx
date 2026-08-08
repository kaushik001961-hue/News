interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PressCardPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div>
      <h1>Press Card Page - {id}</h1>
    </div>
  );
}