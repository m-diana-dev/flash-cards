import { ComponentPropsWithoutRef } from 'react'

import { Typography } from '@/components/ui/typography'
import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type SliderType = ComponentPropsWithoutRef<typeof SliderRadix.Root>

export const Slider = (props: SliderType) => {
  const { value, ...rest } = props

  return (
    <div className={s.sliderContainer}>
      <Typography as={'div'} className={s.sliderValue}>
        {value?.[0]}
      </Typography>
      <SliderRadix.Root className={s.SliderRoot} value={value} {...rest}>
        <SliderRadix.Track className={s.SliderTrack}>
          <SliderRadix.Range className={s.SliderRange} />
        </SliderRadix.Track>
        <SliderRadix.Thumb aria-label={'Lower value'} className={s.SliderThumb} />
        <SliderRadix.Thumb aria-label={'Higher value'} className={s.SliderThumb} />
      </SliderRadix.Root>
      <Typography as={'div'} className={s.sliderValue}>
        {value?.[1]}
      </Typography>
    </div>
  )
}
