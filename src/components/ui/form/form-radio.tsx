import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Radio, RadioProps } from '@/components/ui/radio'

type Props<T extends FieldValues> = Omit<
  RadioProps,
  'name' | 'onBlur' | 'onChange' | 'onValueChange' | 'ref'
> &
  UseControllerProps<T>
export const FormRadio = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...restProps
}: Props<T>) => {
  const {
    field: { onChange, ...radioField },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return <Radio {...restProps} onValueChange={onChange} {...radioField} />
}
