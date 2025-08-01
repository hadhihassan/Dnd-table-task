import { Funnel, Plus, Search } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Client, SortCriterion } from "@/Types/types";
import SortModal from "./SortModal";

export const ClientTable = ({ clients, sortCriterias, setSortCriteria }: { clients: Client[], sortCriterias: SortCriterion[], setSortCriteria: React.Dispatch<React.SetStateAction<SortCriterion[]>> }) => {
    return (
        <div className="mt-6 overflow-x-auto">
            <div className='py-4 px-5 flex justify-between items-center'>
                <div></div>
                <div className="flex gap-4 items-center">
                    <Search size={'18px'} className="hover:cursor-pointer text-foreground" />
                    <SortModal sortCriterias={sortCriterias} setSortCriteria={setSortCriteria} />
                    <Funnel size={'18px'} className="hover:cursor-pointer text-foreground" />
                    <Button variant={'outline'}><Plus />  Add Client</Button>
                </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-border">
                <table className="w-full table-auto border-collapse">
                    <thead className="bg-background">
                        <tr className="border-b border-border">
                            <th className="p-3 text-left text-foreground font-medium">Name</th>
                            <th className="p-3 text-left text-foreground font-medium">Email</th>
                            <th className="p-3 text-left text-foreground font-medium">Created At</th>
                            <th className="p-3 text-left text-foreground font-medium">Updated At</th>
                            <th className="p-3 text-left text-foreground font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-card">
                        {clients.map((client) => (
                            <tr
                                key={client.id}
                                className="border-b border-border hover:bg-accent transition-colors"
                            >
                                <td className="p-3 text-foreground">{client.name}</td>
                                <td className="p-3 text-foreground">{client.email}</td>
                                <td className="p-3 text-foreground">{client.createdAt}</td>
                                <td className="p-3 text-foreground">{client.updatedAt}</td>
                                <td className="p-3 text-foreground capitalize">{client.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};