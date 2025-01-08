"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { GroupList } from "./_components/group-list";
import { useAuth } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
import { Loading } from "@/components/auth/loading";

export default function Home() {
    const { isSignedIn, isLoaded } = useAuth();
    const store = useMutation(api.users.store);

    useEffect(() => {
        const storeUser = async () => {
            if (isLoaded && isSignedIn) {
                await store({});
            }
        }
        storeUser();
    }, [store, isLoaded, isSignedIn]);

    if (!isLoaded) {
        return <Loading />;
    }

    if (!isSignedIn) {
        return (
            <div className="flex items-center justify-center h-screen">
                <SignIn />
            </div>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <GroupList />
        </main>
    );
}
