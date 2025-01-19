"use client";

import { Button } from "@/components/ui/button"
import { Id } from "@/convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";

export const GroupNavbar = () => {
    const router = useRouter();
    const { groupId } = useParams();

    if (groupId.length === 0 || groupId === undefined) {
        router.push("/");
    }

    return (
        <div className="flex w-full h-[50px] items-center justify-start border-b bg-background px-96">
            <Button 
                variant={"ghost"} 
                onClick={() => router.push(`/${groupId}`)}
                className="text-muted-foreground hover:text-foreground"
            >
                Group
            </Button>
            <Button 
                variant={"ghost"} 
                onClick={() => router.push(`/${groupId}/classroom`)}
                className="text-muted-foreground hover:text-foreground"
            >
                Classroom
            </Button>
            <Button 
                variant={"ghost"} 
                onClick={() => router.push(`/${groupId}/members`)}
                className="text-muted-foreground hover:text-foreground"
            >
                Members
            </Button>
            <Button 
                variant={"ghost"} 
                onClick={() => router.push(`/${groupId}/about`)}
                className="text-muted-foreground hover:text-foreground"
            >
                About
            </Button>
        </div>
    )
}
