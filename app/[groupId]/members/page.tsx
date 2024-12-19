"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useState, useEffect } from "react";
import { MemberCard } from "./_components/member-card";
import { AddMember } from "./_components/add-member";

interface MebersPageProps {
    params: {
        groupId: Id<"groups">;
    };
};

const MebersPage = ({
    params
}: MebersPageProps) => {
    const members = useQuery(api.groups.getMembers, { id: params.groupId });
    const currentUser = useQuery(api.users.currentUser, {});
    const group = useQuery(api.groups.get, { id: params.groupId });
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (members && currentUser) {
            const isMember = members.some(member => member._id === currentUser._id);
            setAuthorized(isMember);
        }
    }, [members, currentUser]);

    if (!authorized) {
        return <div>You do not have access to this group.</div>;
    }

    const isOwner = group?.ownerId === currentUser?._id;

    const handleAddMember = (newMemberId) => {
        // Logic to add a new member
    };

    const handleDeleteMember = (memberId) => {
        // Logic to delete a member
    };

    return (
        <div>
            {(isOwner &&
                <AddMember groupId={params.groupId} onAddMember={handleAddMember} />
            )}
            {members.map((member) => (
                <MemberCard key={member._id} member={member} onDeleteMember={handleDeleteMember} />
            ))}
        </div>
    )
}
export default MebersPage;
