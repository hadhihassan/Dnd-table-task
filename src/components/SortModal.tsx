import React, { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { SortPanel } from './SortPanel'
import { SortCriterion } from '@/Types/types'
import { Popover, PopoverTrigger } from './ui/popover'
import { PopoverContent } from '@radix-ui/react-popover'

export default function SortModal({
    sortCriterias, setSortCriteria
}: {
    sortCriterias: SortCriterion[],
    setSortCriteria: React.Dispatch<React.SetStateAction<SortCriterion[]>>
}) {

    const [open, setOpen] = useState<boolean>(false)

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <ArrowUpDown
                        size={18}
                        className="cursor-pointer"
                    />
                </PopoverTrigger>
                <PopoverContent className="w-[70rem] ml-[700px]" sideOffset={10} alignOffset={300}>
                    <SortPanel
                        sortCriteria={sortCriterias}
                        setSortCriteria={setSortCriteria}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
