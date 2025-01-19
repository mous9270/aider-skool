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
            <span className="text-red-500 dark:text-red-400">p</span>
            <span className="text-blue-500 dark:text-blue-400">l</span>
            <span className="text-green-500 dark:text-green-400">a</span>
            <span className="text-yellow-500 dark:text-yellow-400">y</span>
            <span className="text-purple-500 dark:text-purple-400">t</span>
            <span className="text-pink-500 dark:text-pink-400">o</span>
        </div>
    );
}
