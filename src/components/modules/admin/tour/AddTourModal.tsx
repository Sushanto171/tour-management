/* eslint-disable @typescript-eslint/no-explicit-any */
import MultipleFileUploader from "@/components/MultipleFileUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { useGetAllDivisionQuery } from "@/redux/features/division/division.api";
import {
  useAddTourMutation,
  useGetAllTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import type { ITour } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  costFrom: z.string().min(1, "Cost is required"),
  startDate: z.date({ message: "Start date is required" }),
  endDate: z.date({ message: "End date is required" }),
  departureLocation: z.string().min(1, "Departure location is required"),
  arrivalLocation: z.string().min(1, "Arrival location is required"),
  included: z.array(z.object({ value: z.string() })),
  excluded: z.array(z.object({ value: z.string() })),
  amenities: z.array(z.object({ value: z.string() })),
  tourPlan: z.array(z.object({ value: z.string() })),
  maxGuest: z.string().min(1, "Max guest is required"),
  minAge: z.string().min(1, "Minimum age is required"),
  division: z.string().min(1, "Division is required"),
  tourType: z.string().min(1, "Tour type is required"),
});

export function AddTourModal() {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);

  const { data: divisionData, isLoading: isDivisionLading } =
    useGetAllDivisionQuery(undefined);
  const { data: tourTypesData, isLoading: isTypesLoading } =
    useGetAllTourTypesQuery(undefined);
  const [addTour] = useAddTourMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      division: "",
      tourType: "",
      amenities: [],
      costFrom: "",
      included: [],
      excluded: [],
      tourPlan: [],
      location: "",
      arrivalLocation: "",
      departureLocation: "",
      minAge: "",
      maxGuest: "",
      startDate: new Date(),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
  });

  const {
    fields: includedFields,
    append: appendIncluded,
    remove: removeIncluded,
  } = useFieldArray({ control: form.control, name: "included" });

  const {
    fields: excludedFields,
    append: appendExcluded,
    remove: removeExcluded,
  } = useFieldArray({ control: form.control, name: "excluded" });

  const {
    fields: amenitiesFields,
    append: appendAmenities,
    remove: removeAmenities,
  } = useFieldArray({ control: form.control, name: "amenities" });

  const {
    fields: tourPlanFields,
    append: appendTourPlan,
    remove: removeTourPlan,
  } = useFieldArray({ control: form.control, name: "tourPlan" });

  if (isDivisionLading || isTypesLoading) {
    return <div>Loading...</div>;
  }
  const divisions = divisionData?.map(
    (division: { _id: string; name: string }) => ({
      value: division._id,
      label: division.name,
    })
  );
  const tourTypes = tourTypesData?.map(
    (division: { _id: string; name: string }) => ({
      value: division._id,
      label: division.name,
    })
  );

  const submitHandler = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("File uploading...");

    if (images.length === 0) {
      toast.error("Please add some images.", { id: toastId });
      return;
    }

    const tourData: ITour = {
      ...data,
      costFrom: Number(data.costFrom),
      minAge: Number(data.minAge),
      maxGuest: Number(data.maxGuest),
      included:
        data.included[0]?.value === ""
          ? []
          : data.included?.map((item) => item.value),
      excluded:
        data.excluded[0]?.value === ""
          ? []
          : data.excluded?.map((item) => item.value),
      amenities:
        data.amenities[0]?.value === ""
          ? []
          : data.amenities?.map((item) => item.value),
      tourPlan:
        data.tourPlan[0]?.value === ""
          ? []
          : data.tourPlan?.map((item) => item.value),
    };
    if (
      isNaN(tourData.costFrom) ||
      isNaN(tourData.maxGuest) ||
      isNaN(tourData.minAge)
    ) {
      toast.error(
        `${
          (isNaN(tourData.costFrom) && "costFrom") ||
          (isNaN(tourData.maxGuest) && "maxGuest") ||
          (isNaN(tourData.minAge) && "minAge")
        } type must be integer.`,
        { id: toastId }
      );
      return;
    }
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(tourData));
      images.forEach((img) => {
        formData.append("files", img as File);
      });
      const res = await addTour(formData).unwrap();
      console.log({ res });
      toast.success(res.message, { id: toastId });
      setOpen(false);
      form.reset();
    } catch (error: any) {
      console.log({ error });
      toast.error(error.data.message, { id: toastId });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="cursor-pointer">
          Add Tour
        </Button>
      </DialogTrigger>
      <DialogDescription className="sr-only">Add Tour</DialogDescription>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tour</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="add-division"
            className="space-y-4"
            onSubmit={form.handleSubmit(submitHandler)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your tour type name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="costFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost Form</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your tour type name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="arrivalLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arrival Location</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your tour type name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departureLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure Location</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your tour type name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your tour type name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxGuest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Guest</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your tour type name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Age</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your tour type name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your tour type name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isDivisionLading}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {divisions?.map(
                        (division: { value: string; label: string }) => {
                          return (
                            <SelectItem
                              key={division.value}
                              value={division.value}
                            >
                              {division.label}
                            </SelectItem>
                          );
                        }
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tourType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isTypesLoading}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tourTypes?.map(
                        (type: { value: string; label: string }) => {
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          );
                        }
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <p className="font-semibold">Included</p>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => appendIncluded({ value: "" })}
              >
                <Plus />
              </Button>
            </div>
            <div className="space-y-4 mt-4">
              {includedFields.map((item, index) => (
                <div className="flex gap-2" key={item.id}>
                  <FormField
                    control={form.control}
                    name={`included.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    onClick={() => removeIncluded(index)}
                    variant="destructive"
                    className="!bg-red-700"
                    size="icon"
                    type="button"
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Excluded</p>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => appendExcluded({ value: "" })}
              >
                <Plus />
              </Button>
            </div>
            <div className="space-y-4 mt-4">
              {excludedFields.map((item, index) => (
                <div className="flex gap-2" key={item.id}>
                  <FormField
                    control={form.control}
                    name={`excluded.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="!bg-red-700"
                    variant={"outline"}
                    onClick={() => removeExcluded(index)}
                  >
                    <Trash />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Amenities</p>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => appendAmenities({ value: "" })}
              >
                <Plus />
              </Button>
            </div>
            <div className="space-y-4 mt-4">
              {amenitiesFields.map((item, index) => (
                <div className="flex gap-2" key={item.id}>
                  <FormField
                    control={form.control}
                    name={`amenities.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="!bg-red-700"
                    variant={"outline"}
                    onClick={() => removeAmenities(index)}
                  >
                    <Trash />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">TourPlan</p>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => appendTourPlan({ value: "" })}
              >
                <Plus />
              </Button>
            </div>
            <div className="space-y-4 mt-4">
              {tourPlanFields.map((item, index) => (
                <div className="flex gap-2" key={item.id}>
                  <FormField
                    control={form.control}
                    name={`tourPlan.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="!bg-red-700"
                    variant={"outline"}
                    onClick={() => removeTourPlan(index)}
                  >
                    <Trash />
                  </Button>
                </div>
              ))}
            </div>
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <
                          new Date(new Date().setDate(new Date().getDate() - 1))
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <
                          new Date(new Date().setDate(new Date().getDate() - 1))
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <MultipleFileUploader onChange={setImages} />
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button form="add-division" type="submit">
            Add Tour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
