import Image from 'next/image';
import AnalysisIcon from "@/components/icons/svgs/analysis-analytics-business-svgrepo-com.svg"
interface SVGProps {
    w: number,
    h: number
}

const Analysis = ( {w,h}:SVGProps) => {
    return <Image 
    src={AnalysisIcon} 
    alt='analysis icon'
    width={w}
    height={h}
    />
}

export {
    Analysis
}