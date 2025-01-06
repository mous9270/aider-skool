import { useMutation } from "convex/react";
import { FunctionReference, OptionalRestArgs } from "convex/server";
import { useState } from "react";

export const useApiMutation = <T extends FunctionReference<"mutation">>(
    mutationFunction: T
) => {
    const [pending, setPending] = useState(false);
    const apiMutation = useMutation(mutationFunction);

    const mutate = async (...args: OptionalRestArgs<T>) => {
        setPending(true);
        try {
            const result = await apiMutation(...args);
            return result;
        } catch (error) {
            throw error;
        } finally {
            setPending(false);
        }
    };

    return {
        mutate,
        pending
    }
};
