import { FC } from "react";
import SelectCreatable from "react-select/creatable";
import { Genre, useGenreMutation } from "../generated/graphql";

type Props = {
  genreId: number;
  setGenreId: (id: number) => void;
  refetchGenres: () => Promise<void>;
  genres: Genre[];
};

type Option = {
  value: number;
  label: string;
};

const SelectGenre: FC<Props> = ({
  genres,
  genreId,
  setGenreId,
  refetchGenres,
}: Props) => {
  const [genreMutation] = useGenreMutation();

  const options = genres.map(
    (genre: Genre): Option => ({
      value: genre.id,
      label: genre.title,
    })
  );

  async function createGenre(title: string) {
    await genreMutation({
      variables: {
        newGenre: {
          title,
        },
      },
    });
    await refetchGenres();
  }

  return (
    <SelectCreatable
      options={options}
      onChange={(e) => {
        e && setGenreId(e.value);
      }}
      onCreateOption={(v) => createGenre(v)}
    />
  );
};

export default SelectGenre;
