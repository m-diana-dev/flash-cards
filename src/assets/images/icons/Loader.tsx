import { Ref, SVGProps, forwardRef } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg ref={ref} viewBox={'0 0 200 200'} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <circle cx={35} cy={100} fill={'#8C61FF'} r={15} stroke={'#8C61FF'} strokeWidth={15}>
      <animate
        attributeName={'cx'}
        begin={0}
        calcMode={'spline'}
        dur={2}
        keySplines={'0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1'}
        repeatCount={'indefinite'}
        values={'35;165;165;35;35'}
      />
    </circle>
    <circle
      cx={35}
      cy={100}
      fill={'#8C61FF'}
      opacity={0.8}
      r={15}
      stroke={'#8C61FF'}
      strokeWidth={15}
    >
      <animate
        attributeName={'cx'}
        begin={0.05}
        calcMode={'spline'}
        dur={2}
        keySplines={'0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1'}
        repeatCount={'indefinite'}
        values={'35;165;165;35;35'}
      />
    </circle>
    <circle
      cx={35}
      cy={100}
      fill={'#8C61FF'}
      opacity={0.6}
      r={15}
      stroke={'#8C61FF'}
      strokeWidth={15}
    >
      <animate
        attributeName={'cx'}
        begin={0.1}
        calcMode={'spline'}
        dur={2}
        keySplines={'0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1'}
        repeatCount={'indefinite'}
        values={'35;165;165;35;35'}
      />
    </circle>
    <circle
      cx={35}
      cy={100}
      fill={'#8C61FF'}
      opacity={0.4}
      r={15}
      stroke={'#8C61FF'}
      strokeWidth={15}
    >
      <animate
        attributeName={'cx'}
        begin={0.15}
        calcMode={'spline'}
        dur={2}
        keySplines={'0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1'}
        repeatCount={'indefinite'}
        values={'35;165;165;35;35'}
      />
    </circle>
    <circle
      cx={35}
      cy={100}
      fill={'#8C61FF'}
      opacity={0.2}
      r={15}
      stroke={'#8C61FF'}
      strokeWidth={15}
    >
      <animate
        attributeName={'cx'}
        begin={0.2}
        calcMode={'spline'}
        dur={2}
        keySplines={'0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1'}
        repeatCount={'indefinite'}
        values={'35;165;165;35;35'}
      />
    </circle>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export default ForwardRef
