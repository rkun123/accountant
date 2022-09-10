import { FC, useMemo } from "react";
import Select from "react-select";
import { Genre } from "../generated/graphql";

type Props = {
  setGenreId: (id: number) => void;
  genres: Genre[];
};

const SelectGenre: FC<Props> = ({ genres, setGenreId }: Props) => {
  const options = genres.map(
    (
      genre
    ): {
      value: number;
      label: string;
    } => ({
      value: genre.id,
      label: genre.title,
    })
  );
  return (
    <Select options={options} onChange={(v) => v && setGenreId(v.value)} />
  );
};

export default SelectGenre;
