import { Ref, SVGProps, forwardRef } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={16}
    ref={ref}
    width={16}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M8 1.333a6.667 6.667 0 1 0 0 13.334A6.667 6.667 0 0 0 8 1.333Zm0 12A5.333 5.333 0 1 1 8 2.668a5.333 5.333 0 0 1 0 10.665Z'
      }
      fill={'#fff'}
    />
    <path
      d={
        'M8.227 4.967a1.133 1.133 0 0 0-1.234-.2 1.067 1.067 0 0 0-.666.986v4.494a1.067 1.067 0 0 0 .666.986c.145.066.302.1.46.1a1.16 1.16 0 0 0 .774-.3l2.44-2.246a1.068 1.068 0 0 0 0-1.574l-2.44-2.246Zm-.56 4.766V6.267L9.54 8 7.667 9.733Z'
      }
      fill={'#fff'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export default ForwardRef
