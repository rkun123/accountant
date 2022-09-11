import { FC } from "react";
import clsx from "clsx";

type Props = {
  emoji: string;
};

const Twemoji: FC<Props> = ({ emoji }: Props) => {
  const codepoint = emoji.codePointAt(0)?.toString(16);
  const url = `https://twemoji.maxcdn.com/v/latest/svg/${
    codepoint || "1F607"
  }.svg`;
  return (
    <div className={clsx("h-[1em]")}>
      <img className={clsx("h-full")} src={url} />
    </div>
  );
};

export default Twemoji;
