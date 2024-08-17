import { Ref, SVGProps, forwardRef } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={13}
    ref={ref}
    width={14}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M10.707 13a.666.666 0 0 1-.307-.073L7 11.147l-3.4 1.78a.666.666 0 0 1-.967-.707L3.3 8.467.553 5.8a.667.667 0 0 1-.166-.667.667.667 0 0 1 .54-.453l3.8-.553L6.4.707a.667.667 0 0 1 1.2 0L9.293 4.12l3.8.553a.667.667 0 0 1 .54.454.666.666 0 0 1-.166.666L10.72 8.46l.667 3.753a.666.666 0 0 1-.267.667.667.667 0 0 1-.413.12Z'
      }
      fill={'#E6AC39'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export default ForwardRef
