/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useAddTourTypeMutation } from "@/redux/features/tour/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddTourType() {
  const [open, setOpen] = useState(false);
  const form = useForm({ defaultValues: { name: "" } });
  const [addType] = useAddTourTypeMutation();
  const submitHandler = async (data: { name: string }) => {
    try {
      const res = await addType({ name: data.name }).unwrap();
      toast.success(res.message);
      setOpen(false);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  return (
    <Dialog open={open}>
      <form>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)} className="cursor-pointer">
            Add Tour Type
          </Button>
        </DialogTrigger>
        <DialogDescription className="sr-only">Add tour type</DialogDescription>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Tour Type</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              id="add-tour-type"
              onSubmit={form.handleSubmit(submitHandler)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="name"
                        placeholder="tour type name"
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your tour type name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => setOpen(false)} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button form="add-tour-type" type="submit">
              Add Type
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
