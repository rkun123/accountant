import clsx from "clsx";
import { FC, useState } from "react";
import { useAnalysisQuery } from "../../generated/graphql";
import Twemoji from "../../lib/Twemoji";
import TotalByGenre from "./TotalByGenre";

interface Props {
  start: string;
  end: string;
}

const TotalsByGenre: FC<Props> = ({ start, end }: Props) => {
  const { data, loading, refetch } = useAnalysisQuery({
    variables: {
      start,
      end,
    },
  });

  const [open, setOpen] = useState(false);

  const analysis = data?.analysis;

  return (
    <>
      <div
        className={clsx(
          "flex",
          "gap-2",
          "justify-center",
          "items-center",
          "animate-pulse",
        )}
        onClick={() => setOpen(!open)}
      >
        <Twemoji emoji="🧮"></Twemoji>
        Analysis
      </div>
      {open && (
        <div
          className={clsx(
            "flex",
            "flex-col",
            "rounded-md",
            "bg-slate-200",
            "px-8",
            "py-4",
          )}
        >
          {!analysis || loading ? <div>Loading...</div> : (
            analysis.consumes.map((consume) =>
              consume && (
                <TotalByGenre
                  genre={consume?.genre}
                  amount={consume.amount}
                />
              )
            )
          )}
        </div>
      )}
    </>
  );
};

export default TotalsByGenre;
