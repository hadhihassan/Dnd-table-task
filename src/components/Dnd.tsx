"use client"
import React, { useState, useMemo, useEffect } from "react";
import { ClientTable } from "./ClientTable";
import { clients as initialClients } from "@/data/clients";
import { SortCriterion } from "@/Types/types";
import { multiSort } from "@/utils/sorting";

export default function Dnd() {

    const [sortCriteria, setSortCriteria] = useState<SortCriterion[]>(() => {
        const stored = localStorage.getItem("sortCriteria");
        return stored ? JSON.parse(stored) : [];
    });

    const sortedClients = useMemo(
        () => multiSort(initialClients, sortCriteria),
        [sortCriteria]
    );

    // Load from localStorage only on client
    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("sortCriteria");
            setSortCriteria(stored ? JSON.parse(stored) : []);
        }
    }, []);

    // Save to localStorage when sortCriteria changes
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("sortCriteria", JSON.stringify(sortCriteria));
        }
    }, [sortCriteria]);

    return (
        <main className="p-4 w-full">
            <h1 className="text-2xl font-bold mb-4">Client List</h1>
            <ClientTable clients={sortedClients} sortCriterias={sortCriteria} setSortCriteria={setSortCriteria} />
        </main>
    );
};