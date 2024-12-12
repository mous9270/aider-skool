"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { PostCard } from "../../_components/post-card";
import { CommentList } from "../../_components/comment-list";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface FullPostPageProps {
    params: {
        postId: Id<"posts">;
        groupId: Id<"groups">;
    }
}

const FullPostPage = ({ params }: FullPostPageProps) => {
    const router = useRouter();
    const post = useQuery(api.posts.get, { id: params.postId });
    
    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col w-full max-w-3xl mx-auto py-6 px-4 gap-6">
            <Button
                variant="ghost"
                className="w-fit"
                onClick={() => router.back()}
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to posts
            </Button>
            
            <div className="space-y-6">
                <PostCard 
                    post={post} 
                    className="cursor-default hover:border-neutral-200"
                />
                <div className="px-6">
                    <CommentList post={post} />
                </div>
            </div>
        </div>
    );
};

export default FullPostPage;
