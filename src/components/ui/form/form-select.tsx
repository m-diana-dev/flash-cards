import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Select, SelectProps } from '@/components/ui/select'

type Props<T extends FieldValues> = Omit<SelectProps, 'name' | 'onBlur' | 'onChange' | 'ref'> &
  UseControllerProps<T>
export const FormSelect = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...restProps
}: Props<T>) => {
  const { field: selectField } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return <Select {...restProps} {...selectField} />
}
