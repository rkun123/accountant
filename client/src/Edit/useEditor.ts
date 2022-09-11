import { useCallback, useMemo, useState } from "react";
import { Genre, useAccountMutation } from "../generated/graphql";
import { refetchSignal } from "../lib";

export default function useEditor(genres: Genre[]) {
  const [amount, setAmount] = useState<number>();
  const [genreId, setGenreId] = useState<number>();
  const [description, setDescription] = useState("");
  const [accountMutation, { data }] = useAccountMutation();
  const refetch = refetchSignal.usePublish();

  const sendable =
    amount !== undefined &&
    genreId !== undefined &&
    amount !== 0 &&
    genreId > 0;

  function reset() {
    setAmount(0);
    setGenreId(0);
    setDescription("");
  }

  const send = useCallback(async () => {
    if (!sendable) return;
    await accountMutation({
      variables: {
        newAccount: {
          amount,
          genre_id: genreId,
          description,
        },
      },
    });
    refetch(null);
    reset();
  }, [amount, genreId]);

  return {
    setAmount,
    setGenreId,
    setDescription,
    send,
    amount,
    genreId,
    description,
    sendable,
  };
}
