import { Rule } from "antd/es/form";
import * as S from "./style";
import { DefaultOptionType } from "antd/es/select";

interface SelectFormProps {
  label?: string;
  name?: string;
  rules?: Rule[];
  mode?: "multiple" | "tags";
  options?: DefaultOptionType[];
  disabled?: boolean;
  onSearch?: (value: string) => void;
}

export function SelectForm({
  mode,
  options,
  disabled,
  onSearch,
  ...props
}: SelectFormProps) {
  return (
    <S.Container {...props}>
      <S.Content
        size="large"
        filterOption={false}
        mode={mode}
        onSelect={onSearch ? () => onSearch(""): undefined}
        showSearch={!!onSearch}
        onSearch={onSearch}
        disabled={disabled}
        options={options}
      />
    </S.Container>
  );
}
