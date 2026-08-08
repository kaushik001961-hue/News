export default async function TestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div style={{ padding: 40 }}>
      <h1>Dynamic Route Test</h1>
      <p>ID: {id}</p>
    </div>
  );
}