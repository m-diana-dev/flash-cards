import { Ref, SVGProps, forwardRef } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={18}
    ref={ref}
    viewBox={'0 0 18 18'}
    width={18}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <circle cx={9} cy={9} r={8.5} stroke={'#fff'} />
    <g clipPath={'url(#a)'} fill={'#fff'}>
      <path
        d={
          'M9 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM9 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM9 13.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'
        }
      />
    </g>
    <defs>
      <clipPath id={'a'}>
        <path d={'M3 3h12v12H3z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export default ForwardRef
