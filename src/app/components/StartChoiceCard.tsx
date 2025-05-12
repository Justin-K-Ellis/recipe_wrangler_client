import Link from "next/link";

interface StartChoiceCardProps {
  title: string;
  description: string;
  link: string;
}

export default function StartChoiceCard({
  title,
  description,
  link,
}: StartChoiceCardProps) {
  return (
    <div className="card w-96 bg-base-100 card-xl shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="justify-center card-actions">
          <button className="btn btn-primary">
            <Link href={link}>Go</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
