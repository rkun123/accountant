import clsx from "clsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import DeleteAccount from "./DeleteAccount";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");
import { Account } from "../generated/graphql";
import { useState } from "react";

type Props = {
  account: Account;
};

const AccountComponent: React.FC<Props> = ({ account }: Props) => {
  const [isOpenDesc, setIsOpenDesc] = useState(true);

  return (
    <div className={clsx("flex", "flex-col", "px-4", "py-2", "gap-2")}>
      <div className={clsx("flex", "justify-between", "text-lg", "font-bold")}>
        <div className={clsx("flex", "flex-col", "items-start")}>
          <div
            className={clsx("text-2xl", account.amount < 0 && "text-red-700")}
          >
            ¥ {account.amount}
          </div>
          <div className={clsx("text-sm", "italic")}>{account.genre.title}</div>
        </div>
        <div
          className={clsx("flex", "flex-col", "items-end", "justify-between")}
        >
          <div className={clsx("text-sm")}>
            {dayjs(account.created_at).tz().local().format()}
          </div>
          <DeleteAccount id={account.id} />
        </div>
      </div>
      {isOpenDesc && (
        <div className={clsx("text-xs")}>
          <p className={clsx("text-left")}>{account.description}</p>
        </div>
      )}
    </div>
  );
};
export default AccountComponent;
