import { AddTourType } from "@/components/modules/admin/tourType/AddTourType";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAllDivisionQuery,
  useGetAllTourTypesQuery,
} from "@/redux/features/tour/api";
import { Trash2 } from "lucide-react";

export default function AddTour() {
  const { data: divisions, isLoading: isDivisionLading } =
    useGetAllDivisionQuery(undefined);
  const { data: tourTypes, isLoading: isTypesLoading } =
    useGetAllTourTypesQuery(undefined);
  if (isDivisionLading || isTypesLoading) {
    return <div>Loading...</div>;
  }
  console.log(divisions, tourTypes);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto  m-2">
        <div className="flex justify-between items-center my-8 ">
          <h3 className="text-lg font-semibold">/ TourTypes</h3>
          <AddTourType />
        </div>
        <div className="border border-muted ">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="text-center font-medium text-md">
                  Name
                </TableHead>
                <TableHead className="text-center font-medium text-md">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tourTypes?.map((type: { name: string }, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{type?.name}</TableCell>
                  <TableCell className="flex justify-end">
                    <Button className="bg-chart-5" size={"sm"}>
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
