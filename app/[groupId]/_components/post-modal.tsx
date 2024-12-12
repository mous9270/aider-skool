import { Doc } from "@/convex/_generated/dataModel";
import { PostCard } from "./post-card";
import { CommentList } from "./comment-list";


interface PostProps {
    post: Doc<"posts"> & {
        likes: Doc<"likes">[];
        comments: Doc<"comments">[];
        author: Doc<"users">;
    };
};

export const Post = ({ post }: PostProps) => {
    return (
        <div className="space-y-4">
            <PostCard 
                post={post} 
                className="hover:bg-white"
            />
            <div className="px-6">
                <CommentList post={post} />
            </div>
        </div>
    );
};

