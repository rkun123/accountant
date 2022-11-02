import { FC } from "react";
import SelectCreatable from "react-select/creatable";
import { Tag, useTagMutation } from "../generated/graphql";

type Props = {
  addTagId: (id: number) => void;
  removeTagId: (id: number) => void;
  tags: Tag[];
};

type Option = {
  value: number;
  label: string;
};

const SelectTags: FC<Props> = ({
  addTagId,
  removeTagId,
  tags,,
}: Props) => {
  const [tagMutation] = useTagMutation();

  const options = tags.map(
    (tag: Tag): Option => ({
      value: tag.id,
      label: tag.title,
    }),
  );

  async function createTag(title: string) {
    const res = await tagMutation({
      variables: {
        newTag: {
          title,
        },
      },
    });
    const createdTagId = res.data?.createTag.id;
    console.debug(res);
    createdTagId && addTagId(createdTagId);
  }

  return (
    <SelectCreatable
      options={options}
      isMulti
      onCreateOption={(v) => createTag(v)}
    />
  );
};

export default SelectTags;
