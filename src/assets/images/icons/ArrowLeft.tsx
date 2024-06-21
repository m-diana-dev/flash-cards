import { Ref, SVGProps, forwardRef } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={16}
    ref={ref}
    viewBox={'0 0 16 16'}
    width={16}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M9.22 12.666a.667.667 0 0 1-.52-.247l-3.22-4a.667.667 0 0 1 0-.846l3.333-4a.668.668 0 0 1 1.027.853L6.86 8l2.88 3.573a.666.666 0 0 1-.52 1.093Z'
      }
      fill={'#fff'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export default ForwardRef
