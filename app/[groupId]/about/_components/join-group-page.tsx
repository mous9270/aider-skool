"use client";

import { AboutSide } from "@/components/about-side";
import { Loading } from "@/components/auth/loading";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { DescriptionEditor } from "../../edit/_components/description-editor";

interface JoinGroupPageProps {
    groupId: Id<"groups">;
};

export const About = ({
    groupId
}: JoinGroupPageProps) => {
    const group = useQuery(api.groups.get, { id: groupId });
    const currentUser = useQuery(api.users.currentUser, {});
    const members = useQuery(api.groups.getMembers, { id: groupId });
    const router = useRouter();

    if (group === undefined || members === undefined) {
        return <Loading />;
    }

    if (group === null) {
        router.push("/");
        return
    }

    const handleEdit = () => {
        router.push(`/${groupId}/edit`);
    }

    const membersCount = members.length;
    const membersText = membersCount === 1 ? "1 Member" : `${membersCount} Members`;

    return (
        <div className="flex items-start justify-center space-x-12 w-full">
            <div className="max-w-[650px] bg-card p-8 rounded-lg border space-y-10">
                <h1 className="font-bold text-2xl text-foreground">{group.name}</h1>
                {group.aboutUrl && (
                    <>
                        <iframe
                            width="560"
                            height="315"
                            src={group.aboutUrl}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            className="rounded-xl"
                        />
                    </>
                )}
                <DescriptionEditor
                    editable={false}
                    groupId={groupId}
                    className=""
                    initialContent={group.description}
                />
            </div>
            <AboutSide 
                group={group} 
                currentUser={currentUser} 
                handleEdit={handleEdit} 
                membersText={membersText} 
            />
        </div>
    );
}
