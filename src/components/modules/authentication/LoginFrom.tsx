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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";
import SocialLogin from "./SocialLogin";

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export default function LoginFrom() {
  const [showPass, setShowPass] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
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

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmitHandler)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john@company.com"
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public Email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="grid gap-3 relative">
                      <Input
                        {...field}
                        type={showPass ? "text" : "password"}
                        placeholder="******"
                      />
                      <button
                        className="absolute right-4 top-2"
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                      >
                        {showPass ? (
                          <EyeIcon size={16} />
                        ) : (
                          <EyeOffIcon size={16} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public Email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full cursor-pointer" type="submit">
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
