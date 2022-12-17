import clsx from "clsx";
import { Genre } from "../../generated/graphql";
import { formatPrice } from "../../lib/format";

interface Props {
  genre: Genre;
  amount: number;
}

const TotalsByGenre = ({ genre, amount }: Props) => {
  return (
    <div className={clsx("flex", "font-bold", "justify-between")}>
      <div className={clsx("font-bold", "text-lg")}>{genre.title}</div>
      <div>¥ {formatPrice(amount)}</div>
    </div>
  );
};

export default TotalsByGenre;
