import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";
import SocialLogin from "./SocialLogin";

const formSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.email(),
});

export default function LoginFrom() {
  const from = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "" },
  });
  const onSubmitHandler = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };
  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-balance">
            Login to your Tour Management account
          </p>
        </div>

        <Form {...from}>
          <form onSubmit={from.handleSubmit((data) => onSubmitHandler(data))}>
            <FormField
              control={from.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Type Your Name." />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" type="submit">
              Submit
            </Button>
          </form>
        </Form>
        <SocialLogin />
        <div className="text-center text-sm">
          Don&apos;t have an account?
          <Link to="/register" className="underline underline-offset-4">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
