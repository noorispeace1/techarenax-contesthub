export default function ContestDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Contest Details: {params.id}</h1>
    </div>
  );
}
