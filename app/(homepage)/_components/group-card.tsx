import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface GroupCardProps {
    group: Doc<"groups">;
}

export const GroupCard = ({ group }: GroupCardProps) => {
  const router = useRouter();
  const currentUser = useQuery(api.users.currentUser, {});
  const { mutate: deleteGroup } = useApiMutation(api.groups.deleteGroup);
  
  const handleClick = () => {
    router.push(`/${group._id}`);
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    try {
      await deleteGroup({ groupId: group._id });
      toast.success("Group deleted successfully");
    } catch (error) {
      toast.error("Failed to delete group");
    }
  }

  const isOwner = currentUser?._id === group.ownerId;

  const getDescription = () => {
    if (!group.description) {
      return group.name;
    }

    try {
      const descriptionData = JSON.parse(group.description);
      const firstParagraph = descriptionData[0];
      const firstContent = firstParagraph?.content?.[0];
      
      if (firstContent?.text) {
        return firstContent.text;
      }
      
      return group.name;
    } catch (error) {
      return group.name;
    }
  }

  return (
    <ScrollArea 
      onClick={handleClick} 
      className="bg-white rounded-lg shadow-lg p-4 w-80 max-h-[350px] overflow-auto cursor-pointer relative"
    >
      <h2 className="text-lg font-semibold">{group.name}</h2>
      <p>{getDescription()}</p>
      {isOwner && (
        <Button
          onClick={handleDelete}
          variant="destructive"
          size="sm"
          className="absolute top-2 right-2"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </ScrollArea>
  );
}
