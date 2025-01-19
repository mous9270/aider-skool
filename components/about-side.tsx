import { Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Doc } from "@/convex/_generated/dataModel";

interface AboutSideProps {
    group: Doc<"groups">;
    currentUser?: Doc<"users"> | null;
    handleEdit: () => void;
    membersText: string;
}

export const AboutSide = ({
    group,
    currentUser,
    handleEdit,
    membersText
}: AboutSideProps) => {
    return (
        <div className="max-w-[350px] w-full bg-card space-y-4 p-8 rounded-lg border">
            <h1 className="font-bold text-xl text-foreground">{group.name}</h1>
            <p className="flex font-light text-xs items-center text-muted-foreground gap-x-2"><Lock className="w-4 h-4" /> Private group</p>
            <p className="text-foreground">{group.shortDescription}</p>
            <p className="text-muted-foreground">{membersText}</p>
            {currentUser?._id !== group.ownerId && (
                <Button className="w-full">Join</Button>
            )}
            {currentUser?._id === group.ownerId && (
                <Button className="w-full" variant={"secondary"} onClick={handleEdit}>Edit</Button>
            )}

        </div>
    );
};
