import { useAnalysisQuery } from "../generated/graphql";
import clsx from "clsx";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useState } from "react";
import { refetchSignal } from "../lib";
import TotalsByGenre from "./TotalsByGenre";

type Props = {
  start?: string;
  end?: string;
};

const DEFAULT_START = "1970-01-01T00:00:00Z";
const DEFAULT_END = "2100-12-31T23:59:59Z";

const Analysis: FC<Props> = ({
  start = DEFAULT_START,
  end = DEFAULT_END,
}: Props) => {
  const { data, loading, refetch } = useAnalysisQuery({
    variables: {
      start,
      end,
    },
  });

  refetchSignal.useSubscription(() => refetch());

  const amount = useMemo(
    () => data && data.analysis && data.analysis.amount,
    [data],
  );

  useEffect(() => {
    console.log(loading);
    !loading && console.info(data);
  }, [data, loading]);
  return (
    <>
      <div>
        <div
          className={clsx(
            "rounded-md",
            "border-2",
            "border-slate-700",
            "px-8",
            "py-4",
          )}
        >
          <div
            className={clsx(
              "flex",
              "flex-row",
              "font-bold",
              "justify-between",
            )}
          >
            <div>{dayjs(start).format("YYYY/MM/DD")}</div>
            <div>{dayjs(end).format("YYYY/MM/DD")}</div>
          </div>
          {typeof amount === "number"
            ? (
              <div
                className={clsx(
                  "text-4xl",
                  "font-bold",
                  amount < 0 && "text-red-700",
                )}
              >
                ¥ {amount}
              </div>
            )
            : <div>Loading ...</div>}
        </div>
      </div>
      <TotalsByGenre start={start} end={end} />
    </>
  );
};

export default Analysis;
