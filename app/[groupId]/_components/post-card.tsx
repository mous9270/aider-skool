import React from 'react';
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, PenBox, ThumbsUp, Trash2 } from "lucide-react";
import { Content } from "../../../components/content";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

interface PostCardProps {
    post: Doc<"posts"> & {
        likes: Doc<"likes">[];
        comments: Doc<"comments">[];
        author: Doc<"users">;
    };
    className?: string;
    isPreview?: boolean;
}

export const PostCard = ({
    post,
    className,
    isPreview = true,
}: PostCardProps) => {
    const router = useRouter();
    const currentUser = useQuery(api.users.currentUser, {});
    const timeAgo = formatDistanceToNow(post._creationTime);
    const likeCount = post.likes.length;
    const commentCount = post.comments.length;
    const { mutate: like } = useApiMutation(api.likes.add);
    const { mutate: remove } = useApiMutation(api.posts.remove);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        like({ postId: post._id });
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        remove({ id: post._id });
        if (!isPreview) {
            router.back();
        }
    };

    const handlePostClick = () => {
        if (isPreview) {
            router.push(`/${post.groupId}/post/${post._id}`);
        }
    };

    const isOwner = post.author._id === currentUser?._id;

    return (
        <div
            onClick={handlePostClick}
            className={cn(
                "bg-white rounded-lg border border-neutral-200",
                isPreview && "cursor-pointer hover:border-neutral-300",
                "transition-colors",
                className
            )}
        >
            {/* Author Information */}
            <div className="px-6 pt-6 pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-neutral-900">
                            {post.author.name}
                        </p>
                        <p className="text-xs text-neutral-500">{timeAgo} ago</p>
                    </div>
                    {isOwner && (
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                                <PenBox className="w-5 h-5 text-neutral-600" />
                            </button>
                            <button 
                                onClick={handleRemove}
                                className="p-2 hover:bg-red-50 rounded-full transition-colors"
                            >
                                <Trash2 className="w-5 h-5 text-red-500" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Post Content */}
            <div className="px-6 pb-4">
                <h2 className="text-lg font-semibold text-neutral-900 mb-2">
                    {post.title}
                </h2>
                <ScrollArea className={cn("max-h-[280px]", isPreview && "max-h-[120px]")}>
                    <Content
                        postId={post._id}
                        initialContent={post.content}
                        editable={isOwner}
                        className="text-neutral-700 text-sm"
                    />
                </ScrollArea>
            </div>

            <Separator />

            {/* Actions */}
            <div className="px-6 py-3 flex items-center gap-6" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={handleLike}
                    className="flex items-center gap-2 hover:text-blue-600 text-neutral-600 transition-colors"
                >
                    <ThumbsUp className="w-5 h-5" />
                    <span className="text-sm font-medium">{likeCount}</span>
                </button>
                <div className="flex items-center gap-2 text-neutral-600">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-sm font-medium">{commentCount}</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
