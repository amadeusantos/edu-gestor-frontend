import { Rule } from "antd/es/form";
import * as S from "./style";
import dayjs from "dayjs";

interface DateFormProps {
  label?: string;
  name?: string;
  rules?: Rule[];
  minDate?: dayjs.Dayjs;
  maxDate?: dayjs.Dayjs;
  disabled?: boolean;
}

export function DateForm({
  minDate,
  maxDate,
  disabled,
  ...props
}: DateFormProps) {
  return (
    <S.Container {...props}>
      <S.Content
        size="large"
        minDate={minDate}
        maxDate={maxDate}
        format="DD/MM/YYYY"
        disabled={disabled}
      />
    </S.Container>
  );
}
