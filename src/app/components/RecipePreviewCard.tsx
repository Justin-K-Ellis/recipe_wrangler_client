interface RecipePreviewProps {
  name: string;
  cuisine: string | null;
}

export default function RecipePreviewCard({
  name,
  cuisine,
}: RecipePreviewProps) {
  return (
    <div className="card w-full md:w-9/10 card-border shadow hover:shadow-lg">
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        {cuisine && (
          <div className="flex justify-between">
            <div className="badge badge-soft badge-primary">{cuisine}</div>
          </div>
        )}
      </div>
    </div>
  );
}
