import { FC, ReactNode } from "react";
import clsx from "clsx";
import { Genre, useGenresQuery } from "../generated/graphql";
import SelectGenre from "./SelectGenre";
import useEditor from "./useEditor";

const Edit: FC = () => {
  const { data } = useGenresQuery();
  const genres = data?.genres.filter((g) => g !== null) as Genre[];
  const { setGenreId, setAmount, setDescription, send } = useEditor(genres);

  function addAccount() {
    send();
  }

  return (
    genres && (
      <div
        className={clsx(
          "flex",
          "flex-col",
          "gap-4",
          "border-2",
          "p-4",
          "rounded-md"
        )}
      >
        <RowEdit label="Genre">
          <SelectGenre genres={genres} setGenreId={setGenreId} />
        </RowEdit>
        <RowEdit label="Amount">
          <input
            className={clsx("w-full", "h-8", "p-2", "rounded-sm")}
            type="number"
            defaultValue={0}
            onChange={(e) => setAmount(parseInt(e.target.value, 10))}
          />
        </RowEdit>
        <RowEdit label="Description">
          <input
            className={clsx("w-full", "h-8", "p-2", "rounded-sm")}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </RowEdit>
        <RowEdit label="Send">
          <button
            className={clsx("px-6", "py-1", "rounded-full", "bg-slate-300")}
            onClick={() => {
              console.log("hoge");
              addAccount();
            }}
          >
            Send
          </button>
        </RowEdit>
      </div>
    )
  );
};

export default Edit;

type RowProps = {
  label: string;
  children: ReactNode;
};

const RowEdit: FC<RowProps> = ({ label, children }: RowProps) => {
  return (
    <div className={clsx("flex", "gap-4", "items-center")}>
      <div className={clsx("font-bold")}>{label}</div>
      <div className={clsx("flex-grow")}>{children}</div>
    </div>
  );
};
