import type { LucideIcon } from "lucide-react";

export type Client = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    status: "active" | "inactive";
};

export type SortCriterion = {
    id: keyof Client;
    order: "asc" | "desc";
};

export interface Columns {
    title: string;
    sortOptions?: string[];
    icons?: LucideIcon[];
}