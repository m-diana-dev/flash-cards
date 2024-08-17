import Star from '@/assets/images/icons/Star'
import StarFull from '@/assets/images/icons/StarFull'

import s from './rating.module.scss'

type Props = {
  value: number
}
export const Rating = ({ value = 0 }: Props) => {
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < value ? <StarFull key={i} /> : <Star key={i} />
  )

  return <div className={s.Rating}>{stars}</div>
}
