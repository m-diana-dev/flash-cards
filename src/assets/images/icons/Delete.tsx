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
        'M14 4h-3.333V2.887A1.614 1.614 0 0 0 9 1.333H7a1.613 1.613 0 0 0-1.667 1.554V4H2a.667.667 0 1 0 0 1.333h.667v7.334a2 2 0 0 0 2 2h6.666a2 2 0 0 0 2-2V5.333H14A.667.667 0 1 0 14 4ZM6.667 2.887c0-.107.14-.22.333-.22h2c.193 0 .333.113.333.22V4H6.667V2.887ZM12 12.667a.666.666 0 0 1-.667.666H4.667A.667.667 0 0 1 4 12.667V5.333h8v7.334Z'
      }
      fill={'#fff'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export default ForwardRef
