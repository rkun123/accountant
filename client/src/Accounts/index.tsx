import { FC, useMemo } from "react";
import clsx from "clsx";
import { useAccountsQuery } from "../generated/graphql";
import Account from "./Account";
import { Dayjs } from "dayjs";
import { refetchSignal } from "../lib";

type Props = {
  month: Dayjs;
};

const AccountsComponent: FC<Props> = ({ month: _month }: Props) => {
  const month = _month.format("YYYY-MM-DDThh:mm:ssZ");
  const { data, refetch } = useAccountsQuery({
    variables: {
      month,
    },
  });

  const accounts = useMemo(() => data?.accounts, [data]);

  refetchSignal.useSubscription(() => refetch());

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
