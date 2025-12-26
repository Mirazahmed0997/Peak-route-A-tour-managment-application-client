import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDivisionsQuery } from "@/redux/features/division/division.api";
import { useTourTypesQuery } from "@/redux/features/tour/tour.api";
import { X } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";



const TourFilter = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    // console.log(searchParams)

    const selectedTourType = searchParams.get("tourType") || undefined
    const selectedDivision = searchParams.get("division") || undefined


    const { data: divisionData, isLoading: divisionLoading } = useDivisionsQuery(undefined);
    const divisions = divisionData || [];

    const { data: tourTypeData, isLoading: tourTypeLoading } = useTourTypesQuery({limit:1000,fields:"_id, name"});
    const tourTypes = tourTypeData || [];

    const handleDivisionChange = (value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("division", value)
        setSearchParams(params)
    }
    const handleTourTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("tourType", value)
        setSearchParams(params)
    }

    const handleClearFilters = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("division");
        params.delete("tourType");
        setSearchParams(params);
    };

    return (
        <div>
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                    <div>
                        <Button
                            variant="outline"
                            onClick={handleClearFilters}
                            className="flex items-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Clear Filters
                        </Button>
                    </div>
                    {/* Division Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Division
                        </label>
                        <Select
                            value={selectedDivision ? selectedDivision : ""}
                            onValueChange={handleDivisionChange}
                            disabled={divisionLoading}
                        >
                            <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="All Divisions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={undefined as any}>All Divisions</SelectItem>
                                    {divisions.map((division: any) => (
                                        <SelectItem key={division._id} value={division._id}>
                                            {division.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tour Type Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tour Type
                        </label>
                        <Select
                            value={selectedTourType ? selectedTourType : ""}
                            onValueChange={handleTourTypeChange}
                            disabled={tourTypeLoading}
                        >
                            <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="All Tour Types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={undefined as any}>All Tour Types</SelectItem>
                                    {tourTypes?.data?.map((type: any) => (
                                        <SelectItem key={type._id} value={type._id}>
                                            {type.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourFilter;