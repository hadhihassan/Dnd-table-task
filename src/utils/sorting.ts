import { Client, SortCriterion } from "@/Types/types";

export function multiSort(data: Client[], criteria: SortCriterion[]) {
    return [...data].sort((a, b) => {
        for (const { id, order } of criteria) {
            const aVal = a[id as keyof Client];
            const bVal = b[id as keyof Client];

            if (aVal === bVal) continue;

            if (order === "asc") return aVal > bVal ? 1 : -1;
            else return aVal < bVal ? 1 : -1;
        }
        return 0;
    });
}
