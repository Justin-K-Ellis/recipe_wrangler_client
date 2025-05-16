interface RecipePreviewProps {
  name: string;
  cuisine: string;
}

export default function RecipePreviewCard({
  name,
  cuisine,
}: RecipePreviewProps) {
  return (
    <div className="card w-9/10 card-border shadow hover:shadow-lg">
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <div className="badge badge-soft badge-primary">{cuisine}</div>
      </div>
    </div>
  );
}
