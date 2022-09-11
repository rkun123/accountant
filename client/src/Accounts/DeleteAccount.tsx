import clsx from "clsx";
import { FC } from "react";
import { useDeleteAccountMutation } from "../generated/graphql";
import { refetchSignal } from "../lib";
import Twemoji from "../lib/Twemoji";

type Props = {
  id: number;
};

const DeleteAccount: FC<Props> = ({ id }: Props) => {
  const [deleteAccountMutation] = useDeleteAccountMutation();
  const refetch = refetchSignal.usePublish();

  async function deleteAccount() {
    await deleteAccountMutation({
      variables: {
        id,
      },
    });
    refetch(null);
  }

  return (
    <div
      onClick={() => deleteAccount()}
      className={clsx("cursor-pointer", "text-sm")}
    >
      <Twemoji emoji="🗑️" />
    </div>
  );
};

export default DeleteAccount;
