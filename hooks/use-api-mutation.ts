import { useMutation } from "convex/react";
import { MutationReference } from "convex/server";

export const useApiMutation = <T extends MutationReference>(
    mutationFunction: T
) => {
    const apiMutation = useMutation(mutationFunction);

    const mutate = async (payload: Parameters<T>[0]) => {
        try {
            const result = await apiMutation(payload);
            return result;
        } catch (error) {
            throw error;
        }
    };

    return {
        mutate,
        pending: apiMutation.loading
    }
};
