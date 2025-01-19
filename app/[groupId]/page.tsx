"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { CreatePostModal } from "./_components/create-post-modal";
import { AboutSide } from "@/components/about-side";
import { PostCard } from "./_components/post-card";

interface ChatPageProps {
    params: {
        groupId: Id<"groups">;
    }
}

const Community = ({ params }: ChatPageProps) => {
    const group = useQuery(api.groups.get, { id: params.groupId });
    const currentUser = useQuery(api.users.currentUser, {});
    const router = useRouter();
    const posts = useQuery(api.posts.list, { groupId: params.groupId });
    const members = useQuery(api.groups.getMembers, { id: params.groupId });

    const isAuthorized = members?.some(member => member._id === currentUser?._id);

    if (!isAuthorized) {
        return <div>You do not have access to this group.</div>;
    }

    if (group === undefined || posts === undefined) {
        return <div>Loading...</div>;
    }

    if (group === null) {
        router.push("/");
        return null;
    }

    const handleEdit = () => {
        router.push(`/${params.groupId}/edit`);
    }

    const membersText = group.memberNumber === 1 ? "Member" : "Members";

    return (
        <div className="flex w-full h-full py-12 px-4 gap-8 bg-background">
            <div className="w-full space-y-6">
                <CreatePostModal groupId={params.groupId} />
                <div className="space-y-6 flex flex-col">
                    {posts && posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            </div>
            <AboutSide 
                handleEdit={handleEdit} 
                group={group} 
                membersText={membersText} 
                currentUser={currentUser} 
            />
        </div>
    );
}

export default Community;
