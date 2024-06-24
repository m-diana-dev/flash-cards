import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Radio, RadioProps } from '@/components/ui/radio'

type Props<T extends FieldValues> = Omit<RadioProps, 'name' | 'onBlur' | 'onChange' | 'ref'> &
  UseControllerProps<T>
export const FormRadio = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...restProps
}: Props<T>) => {
  const { field: radioField } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return <Radio {...restProps} {...radioField} />
}
