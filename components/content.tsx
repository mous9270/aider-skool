"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useMutation } from "convex/react";
import { AlertOctagon } from "lucide-react";
import { toast } from "sonner";
import { useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

interface ContentProps {
    postId: Id<"posts">;
    initialContent?: string;
    editable: boolean;
    className?: string;
}

export const Content = ({
    postId,
    initialContent,
    editable,
    className
}: ContentProps) => {
    const update = useMutation(api.posts.updateContent);

    // Parse initial content only once
    const parsedInitialContent = useMemo(() => {
        if (!initialContent) return undefined;
        
        try {
            return JSON.parse(initialContent);
        } catch (error) {
            console.error("Failed to parse initial content:", error);
            return undefined;
        }
    }, [initialContent]);

    // Create editor instance
    const editor = useCreateBlockNote({
        initialContent: parsedInitialContent,
    });

    // Debounced change handler
    const handleChange = useCallback(async () => {
        if (!editor.document || !editable) return;

        try {
            const content = JSON.stringify(editor.document, null, 2);
            if (content.length >= 40000) {
                toast.error('Content is too long. Not saved.', {
                    duration: 2000,
                    icon: <AlertOctagon className="h-5 w-5" />,
                });
                return;
            }

            // Wrap in setTimeout to avoid state updates during render
            setTimeout(() => {
                update({
                    id: postId,
                    content: content,
                }).catch((error) => {
                    toast.error('Failed to save changes.', {
                        duration: 2000,
                        icon: <AlertOctagon className="h-5 w-5" />,
                    });
                    console.error("Update error:", error);
                });
            }, 0);
        } catch (error) {
            console.error("Handle change error:", error);
            toast.error('An error occurred while saving.', {
                duration: 2000,
                icon: <AlertOctagon className="h-5 w-5" />,
            });
        }
    }, [editor.document, editable, postId, update]);

    return (
        <div className={cn(
            "relative w-full min-h-[100px]",
            editable ? "cursor-text" : "cursor-default",
            className
        )}>
            <BlockNoteView
                editor={editor}
                editable={editable}
                theme="light"
                onChange={handleChange}
            />
        </div>
    );
};
