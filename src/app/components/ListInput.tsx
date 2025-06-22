interface ListInputProps {
  title: string;
  data: string[];
  dataAddHandler: () => void;
  dataChangeHandler: (value: string, index: number) => void;
  dataDeleteHandler: (index: number) => void;
}

export default function ListInput({
  title,
  data,
  dataAddHandler,
  dataChangeHandler,
  dataDeleteHandler,
}: ListInputProps) {
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
      <legend className="fieldset-legend text-xl font-bold">
        {title + "s"}
      </legend>
      {data.map((_item, i) => (
        <div key={i} className="flex flex-row gap-2 items-center">
          <label className="text-lg">{`${title} ` + (i + 1)}</label>
          <input
            type="text"
            className="input"
            value={data[i]}
            onChange={(e) => dataChangeHandler(e.target.value, i)}
            required
          />
          <button
            type="button"
            className="btn btn-soft btn-warning"
            onClick={() => dataDeleteHandler(i)}
          >
            Delete
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-neutral"
        onClick={dataAddHandler}
      >
        + {title}
      </button>
    </fieldset>
  );
}
