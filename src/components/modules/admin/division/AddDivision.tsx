/* eslint-disable @typescript-eslint/no-explicit-any */
import SingleFileUploader from "@/components/SingleFileUploader";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import type { IDivision } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddDivisionModal() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const form = useForm({ defaultValues: { name: "", description: "" } });

  const submitHandler = async (data: Partial<IDivision>) => {
    try {
      console.log(data, image);
      toast.success("message");
      setOpen(false);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="cursor-pointer">
          Add Division
        </Button>
      </DialogTrigger>
      <DialogDescription className="sr-only">Add Division</DialogDescription>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Division</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="add-division"
            className="space-y-4"
            onSubmit={form.handleSubmit(submitHandler)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="division name" />
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
                    <Textarea {...field} placeholder="Description..." />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your tour type name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <SingleFileUploader onChange={setImage} />
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button form="add-division" type="submit">
            Add Division
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
