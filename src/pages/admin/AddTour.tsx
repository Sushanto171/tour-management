/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourModal } from "@/components/modules/admin/tour/AddTourModal";
import Paginate from "@/components/Pagination";
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
import { useState } from "react";
import { toast } from "sonner";

export default function AddTour() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data } = useGetAllToursQuery({ page: currentPage, limit });
  const [deleteTour] = useDeleteTourMutation();
  const deleteHandler = async (id: string) => {
    try {
      const res = await deleteTour(id).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  const totalPage = data?.meta?.totalPages || 1;
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
            {data?.data?.map((tour, index: number) => (
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
      <Paginate
        currentPage={currentPage}
        onChange={setCurrentPage}
        totalPages={totalPage}
        limit={limit}
        onLimitChange={setLimit}
        total={data?.meta?.total || 1}
      />
    </div>
  );
}
