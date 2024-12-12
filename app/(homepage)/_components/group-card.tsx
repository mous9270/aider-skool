import { ScrollArea } from "@/components/ui/scroll-area";
import { Doc } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";

interface GroupCardProps {
    group: Doc<"groups">;
}

export const GroupCard = ({ group }: GroupCardProps) => {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/${group._id}`);
  }

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
      className="bg-white rounded-lg shadow-lg p-4 w-80 max-h-[350px] overflow-auto cursor-pointer"
    >
      <h2 className="text-lg font-semibold">{group.name}</h2>
      <p>{getDescription()}</p>
    </ScrollArea>
  );
}
