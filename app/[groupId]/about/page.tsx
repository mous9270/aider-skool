"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { About } from "./_components/join-group-page";

interface ChatPageProps {
    params: {
        groupId: Id<"groups">;
    }
}

const Group = ({ params }: ChatPageProps) => {
    const currentUser = useQuery(api.users.currentUser, {});
    const members = useQuery(api.groups.getMembers, { id: params.groupId });

    const isAuthorized = members?.some(member => member._id === currentUser?._id);

    if (!isAuthorized) {
        return <div>You do not have access to this group.</div>;
    }
    return (
        <div className="w-full h-full bg-neutral-200 py-12">
            <About groupId={params.groupId} />
        </div>
    );
}

export default Group;
