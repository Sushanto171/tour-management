/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourModal } from "@/components/modules/admin/tour/AddTourModal";
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
  useDeleteTourMutation,
  useGetAllToursQuery,
} from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AddTour() {
  const { data } = useGetAllToursQuery(undefined);
  const [deleteTour] = useDeleteTourMutation();
  const deleteHandler = async (id: string) => {
    try {
      const res = await deleteTour(id).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="w-full max-w-7xl md:max-w-4xl mx-auto m-2">
      <div className="flex justify-between my-8">
        <h3 className="font-medium text-lg">/All Tours</h3>
        <AddTourModal />
      </div>
      <div className="border border-muted ">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="text-center font-medium text-md">
                Title
              </TableHead>
              <TableHead className="text-center font-medium text-md">
                Description
              </TableHead>
              <TableHead className="text-center font-medium text-md">
                Division
              </TableHead>
              <TableHead className="text-center font-medium text-md">
                Tour Type
              </TableHead>
              <TableHead className="text-center font-medium text-md">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((tour, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{tour.title}</TableCell>
                <TableCell className="font-medium truncate">
                  {tour.description}
                </TableCell>
                <TableCell className="font-medium">{tour.division}</TableCell>
                <TableCell className="font-medium">{tour.tourType}</TableCell>
                <TableCell className="flex justify-end">
                  <DeleteConfirmation onConfirm={() => deleteHandler(tour._id)}>
                    <Button className="bg-chart-5" size={"sm"}>
                      <Trash2 />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
