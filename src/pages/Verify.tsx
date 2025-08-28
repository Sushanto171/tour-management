import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Clock, Fingerprint, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";

export default function Verify() {
  const form = useForm();

  const onSubmit = async () => {};
  return (
    <div className="min-h-screen grid place-content-center ">
      <Card className="w-fit max-w-md border-muted-foreground/15 shadow-lg rounded-3xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <div className="p-2 rounded-2xl bg-primary/10">
                <Fingerprint className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Verify your OTP</CardTitle>
            </div>
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
          </div>
          <CardDescription>
            Enter the 6‑digit code sent to{" "}
            <span className="font-medium text-foreground">you@domain.com</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-center w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field} >
                        <InputOTPGroup className="flex gap-2 w-full">
                          <InputOTPSlot className="rounded-lg" index={0} />
                          <InputOTPSlot className="rounded-lg" index={1} />
                          <InputOTPSlot className="rounded-lg" index={2} />
                          <InputOTPSlot className="rounded-lg" index={3} />
                          <InputOTPSlot className="rounded-lg" index={4} />
                          <InputOTPSlot className="rounded-lg" index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Resend in 00:30</span>
            </div>
            <Button variant="ghost" size="sm" disabled>
              Resend OTP
            </Button>
          </div>

          <div className="grid gap-2">
            <Button className="h-11 rounded-2xl">Verify</Button>
            <Button variant="outline" className="h-11 rounded-2xl">
              Use another method
            </Button>
          </div>
        </CardContent>

        <CardFooter className="justify-center text-xs text-muted-foreground">
          Secure verification protected by modern encryption.
        </CardFooter>
      </Card>
    </div>
  );
}
