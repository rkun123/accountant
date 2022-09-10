import { useAnalysisQuery } from "./generated/graphql";
import clsx from "clsx";
import dayjs from "dayjs";
import { FC, useEffect, useMemo } from "react";

type Props = {
  start?: string;
  end?: string;
};

const DEFAULT_START = "1970-01-01T00:00:00Z";
const DEFAULT_END = "2100-12-31T23:59:59Z";

const Analysis: FC = ({ start = DEFAULT_START, end = DEFAULT_END }: Props) => {
  const { data, loading, error } = useAnalysisQuery({
    variables: {
      start,
      end,
    },
  });

  const amount = useMemo(
    () => data && data.analysis && data.analysis.amount,
    [data]
  );

  useEffect(() => {
    console.log(loading);
    !loading && console.info(data);
  }, [data, loading]);
  return (
    <div>
      {amount && (
        <div
          className={clsx("rounded-md", "border-2", "border-slate-700", "p-8")}
        >
          <div
            className={clsx("flex", "flex-row", "font-bold", "justify-between")}
          >
            <div>{dayjs(start).format("YYYY/MM/DD")}</div>
            <div>{dayjs(end).format("YYYY/MM/DD")}</div>
          </div>
          <div
            className={clsx(
              "text-4xl",
              "font-bold",
              amount < 0 && "text-red-700"
            )}
          >
            ¥ {amount}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
