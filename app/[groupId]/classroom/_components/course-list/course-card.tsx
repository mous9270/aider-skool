import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CourseCardProps {
    title: string;
    description: string;
    thumbnailStorageId: string;
    groupId: Id<"groups">;
    courseId: Id<"courses">;
};

export const CourseCard = ({
    title,
    description,
    thumbnailStorageId,
    groupId,
    courseId
}: CourseCardProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/${groupId}/classroom/${courseId}`);
    }
    return (
        <div
            className="h-fit w-[360px] rounded-xl cursor-pointer bg-zinc-100 dark:bg-zinc-900 hover:shadow-[0_2px_2px_2px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_2px_2px_2px_rgba(255,255,255,0.1)]"
            onClick={handleClick}
        >
            <div className="h-[200px] relative">
                <Image src="/logo.png" fill alt={title} objectFit="cover" />
            </div>
            <div className="flex flex-col h-[140px] justify-start p-3">
                <h3 className="font-bold">{title}</h3>
                <p className="">{description}</p>
                <Button variant={"ghost"} className="w-full mt-auto">Open</Button>
            </div>
        </div>
    );
};
