import { Loading } from "@/components/auth/loading";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { GroupCard } from "./group-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const GroupList = () => {
    const router = useRouter();
    const groups = useQuery(api.groups.listAll, {});

    const handleCreate = () => {
        router.push("/create");
    }

    if (groups === undefined) {
        return <Loading />;
    }

    if (groups.length === 0) {
        return (
            <div className="h-full flex items-center justify-center">
                <Button onClick={handleCreate}>Create a group</Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-10">
            {groups.map((group) => (
                <GroupCard key={group._id} group={group} />
            ))}
        </div>
    );
};
