interface RecipePreviewProps {
  name: string;
  cuisine: string;
  notes: string;
}

export default function RecipePreviewCard({
  name,
  cuisine,
  notes,
}: RecipePreviewProps) {
  return (
    <div className="card w-5/10">
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <div className="badge badge-soft badge-primary">{cuisine}</div>
        <p>{notes}</p>
      </div>
    </div>
  );
}
