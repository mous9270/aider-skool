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
            <span className="text-red-500">p</span>
            <span className="text-blue-500">l</span>
            <span className="text-green-500">a</span>
            <span className="text-yellow-500">y</span>
            <span className="text-purple-500">t</span>
            <span className="text-purple-500">o</span>
        </div>
    );
}
