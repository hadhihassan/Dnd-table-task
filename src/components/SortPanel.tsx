import React, { useEffect, useState } from "react";
import { Client, Columns, SortCriterion } from "@/Types/types";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortItem } from "./SortItem";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { GripVertical, MoveDown, MoveUp, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const stringSortingOtpions = ['A-Z', 'Z-A']
const sortingOtpionsIcons = [MoveUp, MoveDown]
const dateSortingOtpions = ['Oldest To Newest', 'Newest To Oldest']

export const columns: Columns[] = [
    {
        title: "name",
        sortOptions: stringSortingOtpions,
        icons: sortingOtpionsIcons
    },
    {
        title: "email",
        sortOptions: stringSortingOtpions,
        icons: sortingOtpionsIcons
    },
    {
        title: "createdAt",
        sortOptions: dateSortingOtpions,
        icons: sortingOtpionsIcons
    },
    {
        title: "updatedAt",
        sortOptions: dateSortingOtpions,
        icons: sortingOtpionsIcons
    },
    {
        title: "status",
    },
];

export const SortPanel = ({
    sortCriteria,
    setSortCriteria,
}: {
    sortCriteria: SortCriterion[];
    setSortCriteria: (val: SortCriterion[]) => void;
}) => {
    const [pendingSortCriteria, setPendingSortCriteria] = useState<SortCriterion[]>([]);

    useEffect(() => {
        // Sync pending state when sortCriteria changes externally
        setPendingSortCriteria(sortCriteria);
    }, [sortCriteria]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = pendingSortCriteria.findIndex((c) => c.id === active.id);
            const newIndex = pendingSortCriteria.findIndex((c) => c.id === over?.id);
            setPendingSortCriteria(arrayMove(pendingSortCriteria, oldIndex, newIndex));
        }
    };

    const addSort = (id: string, order: string = "asc") => {
        if (!pendingSortCriteria.find((s) => s.id === id)) {
            setPendingSortCriteria([...pendingSortCriteria, { id: id as keyof Client, order: order as "asc" | "desc" }]);
        }
    };

    const sortedItems = pendingSortCriteria.map((criteria) => criteria.id);
    const newColumns = columns.filter((col) => !sortedItems.includes(col.title as keyof Client));

    return (
        <div className="w-full">
            <Card className="flex flex-col gap-2 items-start w-2/4">
                <CardHeader>
                    <CardTitle>Sort</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={pendingSortCriteria.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                            <div className="flex flex-col gap-2">
                                {pendingSortCriteria.map((criterion) => (
                                    <SortItem
                                        key={criterion.id}
                                        criterion={criterion}
                                        onUpdate={(newCriterion) => {
                                            setPendingSortCriteria(
                                                pendingSortCriteria.map((c) =>
                                                    c.id === criterion.id ? newCriterion : c
                                                )
                                            );
                                        }}
                                        onRemove={() =>
                                            setPendingSortCriteria(pendingSortCriteria.filter((c) => c.id !== criterion.id))
                                        }
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>

                    <Separator className="my-5" />

                    <div>
                        {newColumns
                            .filter((col) => col.title !== "status")
                            .map((col) => (
                                <div className="mt-2 flex justify-between" key={col.title}>
                                    <div className="flex items-center gap-1 w-1/3">
                                        <GripVertical className="h-4 w-4" />
                                        <User className="h-4 w-4" />
                                        <h5 className="font-semibold text-sm capitalize">{col.title}</h5>
                                    </div>
                                    <div className="flex gap-2 w-2/3">
                                        {col.sortOptions?.map((option, index) => {
                                            const Icon = col.icons?.[index];
                                            return (
                                                <Badge
                                                    onClick={() => {
                                                        const order =
                                                            option === "A-Z" || option === "Oldest To Newest" ? "asc" : "desc";
                                                        const isAlreadyActive = pendingSortCriteria.find(
                                                            (c) => c.id === col.title && c.order === order
                                                        );
                                                        if (!isAlreadyActive) {
                                                            addSort(col.title, order);
                                                        }
                                                    }}
                                                    variant={"outline"}
                                                    key={option}
                                                    className="cursor-pointer rounded flex items-center gap-1 bg-transparent border text-muted-foreground"
                                                >
                                                    {Icon && <Icon className="h-3 w-3" />}
                                                    {option}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                    </div>
                </CardContent>

                <Separator className="my-5 py-5" />

                <CardFooter className="flex justify-end gap-4 w-full">
                    <Button
                        className="text-sm"
                        variant={"ghost"}
                        onClick={() => setPendingSortCriteria([])}
                    >
                        Clear All
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() => {
                            setSortCriteria(pendingSortCriteria);
                        }}
                    >
                        Apply Sort
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};