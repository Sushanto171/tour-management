import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllDivisionQuery } from "@/redux/features/division/division.api";
import {
  useGetAllToursQuery,
  useGetAllTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import { useState } from "react";

export default function TourFilters() {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDivision, setSelectedDivision] = useState<undefined | string>(
    undefined
  );
  const [selectedTourType, setSelectedTourType] = useState<undefined | string>(
    undefined
  );
  const { data: divisionData, isLoading: divisionIsLoading } =
    useGetAllDivisionQuery(undefined);

  const { data: tourTypeData, isLoading: tourTypeIsLoading } =
    useGetAllTourTypesQuery(undefined);
  const { data } = useGetAllToursQuery({
    division: selectedDivision,
    tourType: selectedTourType,
  });
  console.log(data?.length);

  const divisionOption = divisionData?.map(
    (item: { name: string; _id: string }) => ({
      label: item.name,
      value: item._id,
    })
  );
  const tourTypeOptions = tourTypeData?.map(
    (item: { name: string; _id: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  const handleDivisionChange = (data: string) => {
    setSelectedDivision(data);
  };
  const handleTourTypeChange = (data: string) => {
    setSelectedTourType(data);
  };

  const handleClearFilter = () => {
    setSelectedDivision(undefined);
    setSelectedTourType(undefined);
  };
  return (
    <div className="col-span-3 w-full h-[500px] border border-muted rounded-md p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h1>Filters</h1>
        <Button onClick={handleClearFilter} size="sm" variant="outline">
          Clear Filter
        </Button>
      </div>
      <div>
        <Label className="mb-2">Division to visit</Label>
        <Select
          onValueChange={(value) => handleDivisionChange(value)}
          value={selectedDivision ? selectedDivision : ""}
          disabled={divisionIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {divisionOption?.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2">Tour Type</Label>
        <Select
          onValueChange={handleTourTypeChange}
          value={selectedTourType ? selectedTourType : ""}
          disabled={tourTypeIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {tourTypeOptions?.map(
                (item: { value: string; label: string }) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
