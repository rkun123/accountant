import { FC, ReactNode } from "react";
import clsx from "clsx";
import { Genre, useGenresQuery } from "../generated/graphql";
import SelectGenre from "./SelectGenre";
import useEditor from "./useEditor";

const Edit: FC = () => {
  const { data, refetch: _refetch } = useGenresQuery();
  const genres = data?.genres.filter((g) => g !== null) as Genre[];
  const {
    setGenreId,
    setAmount,
    setDescription,
    send,
    amount,
    description,
    genreId,
    sendable,
  } = useEditor(genres);

  function addAccount() {
    send();
  }

  async function refetch() {
    await _refetch();
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
          <SelectGenre
            genres={genres}
            genreId={genreId}
            setGenreId={setGenreId}
            refetchGenres={refetch}
          />
        </RowEdit>
        <RowEdit label="Amount">
          <input
            className={clsx("w-full", "h-8", "p-2")}
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value, 10))}
          />
        </RowEdit>
        <RowEdit label="Description">
          <input
            className={clsx("w-full", "h-8", "p-2", "rounded-sm")}
            type="text"
            value={description}
            onChange={(e) => {
              console.debug(e);
              setDescription(e.target.value);
            }}
          />
        </RowEdit>
        <RowEdit label="Send">
          <button
            className={clsx(
              "px-6",
              "py-1",
              "rounded-full",
              "disabled:bg-slate-500",
              "bg-slate-300"
            )}
            disabled={!sendable}
            onClick={() => {
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
      <div
        className={clsx(
          "flex-grow",
          "rounded-sm",
          "border-solid",
          "border-1",
          "border-slate-300"
        )}
      >
        {children}
      </div>
    </div>
  );
};
