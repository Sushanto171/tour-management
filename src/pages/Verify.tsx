import Remaining from "@/components/modules/authentication/Remaining";
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
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/api";
import { zodResolver } from "@hookform/resolvers/zod";

import { Clock, Fingerprint, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const otpSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const [confirmed, setConfirmed] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [seconds, setSeconds] = useState(120);
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    if (!state?.email) {
      navigate("/");
    }
  }, [navigate, state]);

  const handleConfirmed = async () => {
    try {
      await sendOtp({ email: state.email });
      setConfirmed(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (otp: z.infer<typeof otpSchema>) => {
    try {
      const result = await verifyOtp({
        email: state.email,
        otp: otp.otp,
      }).unwrap();
      console.log(result);
      toast.success(result.message);
      navigate("/login");
    } catch (error) {
      console.log("verification Error:", error);
    }
  };
  return (
    <div className="min-h-screen grid place-content-center ">
      {confirmed ? (
        <Card className="min-w-sx max-w-md border-muted-foreground/15 shadow-lg rounded-3xl">
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
              <span className="font-medium text-foreground">
                {state?.email}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Form {...form}>
              <form
                id="otp-verify"
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex justify-center w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
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
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <Remaining {...{ setSeconds, seconds }} />
              </div>
              <Button
                onClick={() => setSeconds(120)}
                disabled={seconds !== 0}
                variant="ghost"
                size="sm"
              >
                Resend OTP
              </Button>
            </div>

            <div className="grid gap-2">
              <Button form="otp-verify" className="h-11 rounded-2xl">
                Verify
              </Button>
              <Button variant="outline" className="h-11 rounded-2xl">
                Use another method
              </Button>
            </div>
          </CardContent>

          <CardFooter className="justify-center text-xs text-muted-foreground">
            Secure verification protected by modern encryption.
          </CardFooter>
        </Card>
      ) : (
        <Card className="min-w-xs max-w-md border-muted-foreground/15 shadow-lg rounded-3xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <CardTitle className="text-xl truncate">
                  Verify your Email Address
                </CardTitle>
              </div>
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
            </div>
            <CardDescription>
              We will send you an OTP at : <br />
              <span className="font-medium text-foreground">
                {state?.email}
              </span>
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center text-xs text-muted-foreground">
            <Button
              onClick={handleConfirmed}
              className="h-11 w-full rounded-2xl cursor-pointer"
            >
              Send OTP
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
