import Link from "next/link";
import * as React from "react"
import BrSvg from './br-svg'

export default function Logo({ size = 8, color = "text-logoPrimary" }) {
    return (
        <div>
            <Link href="/" >
                <div className={`cursor-pointer w-${size} h-${size} mx-auto`} >
                    <BrSvg color={color} />
                </div>
            </Link>
        </div>
    )
}




