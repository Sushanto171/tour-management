import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";
import SocialLogin from "./SocialLogin";
const formSchema = z
  .object({
    name: z.string().min(3, { error: "Name is too short" }),
    email: z.email(),
    password: z.string().min(8, { error: "Password is too short." }),
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm Password is too short." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Confirm Password does not match.",
    path: ["confirmPassword"],
  });

export default function RegisterFrom() {
  const [showPass, setShowPass] = useState({
    password: false,
    confirmPassword: false,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmitHandler = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };
  return (
    <>
      <div className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Sing in now Free</h1>
            <p className="text-muted-foreground text-balance">
              Register for Tour Management account
            </p>
          </div>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(onSubmitHandler)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPass.password ? "text" : "password"}
                          placeholder="********"
                        />
                        <button
                          className="absolute right-4 top-2"
                          type="button"
                          onClick={() => setShowPass((params)=>({...params, password: !params.password}))}
                        >
                          {showPass.password ? (
                            <EyeOffIcon size={16} />
                          ) : (
                            <EyeIcon size={16} />
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPass.confirmPassword ? "text" : "password"}
                          placeholder="********"
                        />
                        <button
                          className="absolute right-4 top-2"
                          type="button"
                          onClick={() =>
                            setShowPass((params) => ({
                              ...params,
                              confirmPassword: !params.confirmPassword,
                            }))
                          }
                        >
                          {showPass.confirmPassword ? (
                            <EyeOffIcon size={16} />
                          ) : (
                            <EyeIcon size={16} />
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

              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </Form>

          <SocialLogin />
          <div className="text-center text-sm">
            Already have an account?
            <Link to="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
