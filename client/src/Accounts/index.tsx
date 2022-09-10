import { FC, useMemo } from "react";
import clsx from "clsx";
import { useAccountsQuery } from "../generated/graphql";
import Account from "./Account";

const AccountsComponent: FC = () => {
  const { data } = useAccountsQuery();
  const accounts = useMemo(() => data?.accounts, [data]);
  return (
    <div className={clsx("grid", "grid-cols-1", "divide-y")}>
      {accounts &&
        accounts.map(
          (account) => account && <Account key={account.id} account={account} />
        )}
    </div>
  );
};

export default AccountsComponent;
