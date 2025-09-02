import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourModal } from "@/components/modules/admin/tour/AddTour";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";

interface ITour {
  _id: string;
  title: string;
  description: string;
  images: string[];
  division: string;
  tourType: string;
  location: string;
  startDate: string;
  endDate: string;
  costFrom: number;
  tourPlan: string[];
  included: string[];
  excluded: string[];
  amenities: string[];
  maxGuest: number;
  minAge: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export default function AddTour() {
  const { data } = useGetAllToursQuery(undefined);
  console.log(data);
  const deleteHandler = async (data: string) => {console.log(data);};
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
            {data?.map((tour: ITour, index: number) => (
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
