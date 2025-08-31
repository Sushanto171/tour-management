import { AddTourType } from "@/components/modules/admin/tourType/AddTourType";
import { DeleteTypeAlert } from "@/components/modules/admin/tourType/DeleteAlert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllTourTypesQuery } from "@/redux/features/tour/api";

export default function AddTour() {
  const { data: tourTypes, isLoading: isTypesLoading } =
    useGetAllTourTypesQuery(undefined);

  if (isTypesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full max-w-7xl md:max-w-4xl mx-auto  m-2">
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
              {tourTypes?.map(
                (type: { name: string; _id: string }, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{type?.name}</TableCell>
                    <TableCell className="flex justify-end">
                      <DeleteTypeAlert id={type._id} />
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
