import { Typography } from '@/components/ui/typography'
import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type SliderType = {
  max?: number
  setValue?: (value: number[]) => void
  step?: number
  value: number[]
}

export const SliderApp = (props: SliderType) => {
  const { max = 99, setValue, step = 1, value } = props

  return (
    <div className={s.sliderContainer}>
      <Typography as={'div'} className={s.sliderValue}>
        {value[0]}
      </Typography>
      <Slider.Root
        className={s.SliderRoot}
        max={max}
        onValueChange={setValue}
        step={step}
        value={value}
      >
        <Slider.Track className={s.SliderTrack}>
          <Slider.Range className={s.SliderRange} />
        </Slider.Track>
        <Slider.Thumb aria-label={'Lower value'} className={s.SliderThumb} />
        <Slider.Thumb aria-label={'Higher value'} className={s.SliderThumb} />
      </Slider.Root>
      <Typography as={'div'} className={s.sliderValue}>
        {value[1]}
      </Typography>
    </div>
  )
}
