"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface LogoProps {
    className?: string;
}

export const Logo = ({
    className
}: LogoProps) => {
    return (
        <div className={cn("cursor-pointer ml-80 font-bold text-5xl" && className)}>
            <span className="text-black dark:text-white">P</span>
            <span className="text-black dark:text-white">l</span>
            <span className="text-black dark:text-white">a</span>
            <span className="text-black dark:text-white">y</span>
            <span className="text-black dark:text-white">t</span>
            <span className="text-black dark:text-white">o</span>
        </div>
    );
}
