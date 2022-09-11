import { useCallback, useMemo, useState } from "react";
import { Genre, useAccountMutation } from "../generated/graphql";
import { refetchSignal } from "../lib";

export default function useEditor(genres: Genre[]) {
  const [amount, setAmount] = useState(0);
  const [genreId, setGenreId] = useState(0);
  const [description, setDescription] = useState("");
  const [accountMutation, { data }] = useAccountMutation();
  const refetch = refetchSignal.usePublish();

  const sendable = useMemo(
    () => amount !== 0 && genreId > 0,
    [amount, genreId]
  );

  const send = useCallback(async () => {
    if (amount === 0 || genreId < 1) return;
    await accountMutation({
      variables: {
        newAccount: {
          amount,
          genre_id: genreId,
          description,
        },
      },
    });
    setAmount(0);
    setGenreId(0);
    setDescription("");
    refetch(null);
  }, [amount, genreId]);

  return {
    setAmount,
    setGenreId,
    setDescription,
    send,
    genreId,
    sendable,
  };
}
