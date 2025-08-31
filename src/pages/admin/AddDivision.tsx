/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddDivisionModal } from "@/components/modules/admin/division/AddDivision";
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
  useDeleteTourDivisionMutation,
  useGetAllDivisionQuery,
} from "@/redux/features/division/division.api";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AddDivision() {
  const { data: divisions, isLoading: isTypesLoading } =
    useGetAllDivisionQuery(undefined);
  const [deleteDivision] = useDeleteTourDivisionMutation();

  if (isTypesLoading) {
    return <div>Loading...</div>;
  }

  const deleteHandler = async (id: string) => {
    const toastId = toast.loading("Division deleting...");
    try {
      await deleteDivision(id).unwrap();
      toast.success("Deleted Successfully", { id: toastId });
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    }
  };

  return (
    <>
      <div className="w-full max-w-7xl md:max-w-4xl mx-auto  m-2">
        <div className="flex justify-between items-center my-8 ">
          <h3 className="text-lg font-semibold">/ Divisions</h3>
          <AddDivisionModal />
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
              {divisions?.map(
                (type: { name: string; _id: string }, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{type?.name}</TableCell>
                    <TableCell className="flex justify-end">
                      <DeleteConfirmation
                        onConfirm={() => deleteHandler(type._id)}
                      >
                        <Button className="bg-chart-5" size={"sm"}>
                          <Trash2 />
                        </Button>
                      </DeleteConfirmation>
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
