import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, User, X } from "lucide-react";

import { Columns, SortCriterion } from "@/Types/types";
import { Badge } from "./ui/badge";
import { columns } from "./SortPanel";

export const SortItem = ({
    criterion,
    onUpdate,
    onRemove,
}: {
    criterion: SortCriterion;
    onUpdate: (val: SortCriterion) => void;
    onRemove: () => void;
}) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: criterion.id });

    const sortingOptions: Columns | undefined = columns?.find(col => col.title === criterion.id)

    return (
        <>
            <div className="mt-2 flex justify-between"
                ref={setNodeRef}
                style={{ transform: CSS.Transform.toString(transform), transition }}
            >
                <div className="flex items-center gap-1 w-1/3">
                    <GripVertical className="h-4 w-4 hover:cursor-cell" {...attributes} {...listeners} />
                    <User className="h-4 w-4" />
                    <h5 className="font-semibold text-sm capitalize">{criterion.id}</h5>
                </div>
                {/* Sorting Options */}
                <div className="flex justify-between gap-2 w-2/3">
                    <div className="flex gap-2 items-end justify-end ">
                        {sortingOptions?.sortOptions?.map((option, index) => {
                            const Icon = sortingOptions.icons?.[index];
                            const isActive =
                                (criterion.order === "asc" && (option === "A-Z" || option === "Oldest To Newest")) ||
                                (criterion.order === "desc" && (option === "Z-A" || option === "Newest To Oldest"));

                            return (
                                <Badge
                                    key={option}
                                    className={`border rounded flex items-center gap-1 ${isActive ? "bg-blue-200 text-blue-900" : "bg-transparent"
                                        }`}
                                    onClick={() => {
                                        if (!isActive) {
                                            onUpdate({
                                                ...criterion,
                                                order: criterion.order === "asc" ? "desc" : "asc",
                                            })
                                        }
                                    }
                                    }
                                    variant={'outline'}
                                >
                                    {Icon && <Icon className="h-3 w-3" />}
                                    {option}
                                </Badge>
                            );
                        })}
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={onRemove} className="text-sm text-red-500">
                            <X color="gray" className="w-4 h-4"/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
