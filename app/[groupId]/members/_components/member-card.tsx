import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MemberCardProps {
    member: Doc<"users">;
    onDeleteMember: (memberId: string) => void;
    canDelete: boolean;
}

export const MemberCard = ({
    member,
    onDeleteMember,
    canDelete
}: MemberCardProps) => {
    const { groupId } = useParams();
    const group = useQuery(api.groups.get, { id: groupId as Id<"groups"> });

    const formattedDate = format(member._creationTime, 'MMM dd, yyyy');


    return (
        <div className="flex items-start gap-x-7 bg-neutral-50 dark:bg-zinc-900 px-96 py-10">
            <Avatar>
                <AvatarImage src={member.profileUrl} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-3">
                <div className="flex gap-x-2 items-center">
                    <p className="font-semibold">{member.name}</p>
                    {group?.ownerId === member._id && <span className="text-blue-600 text-sm font-medium">(Owner)</span>}
                </div>
                <p className="">{member.about}</p>
                <div className="flex space-x-3 items-center text-neutral-600">
                    <Calendar className="w-4 h-4" />
                    <span className=" text-sm">Joined {formattedDate}</span>
                </div>
                {canDelete && (
                    <Button 
                        onClick={() => onDeleteMember(member._id)}
                        variant="destructive"
                        size="sm"
                    >
                        Remove
                    </Button>
                )}
            </div>
        </div>
    );
};
