import { useCallback, useMemo, useState } from "react";
import { Genre, useAccountMutation } from "../generated/graphql";

export default function useEditor(genres: Genre[]) {
  const [amount, setAmount] = useState(0);
  const [genreId, setGenreId] = useState(0);
  const [description, setDescription] = useState("");
  const [accountMutation, { data }] = useAccountMutation();

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
  }, [amount, genreId]);

  return {
    setAmount,
    setGenreId,
    setDescription,
    send,
    sendable,
  };
}
