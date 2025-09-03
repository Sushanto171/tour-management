import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import type { JSX } from "react";
import { Link } from "react-router";

export default function PaymentCard(data: { [k: string]: string }) {
  const { status } = data;

  // status অনুযায়ী UI সেটাপ
  const statusConfig: Record<
    string,
    {
      icon: JSX.Element;
      color: string;
      text: string;
      buttonText: string;
      link: string;
    }
  > = {
    success: {
      icon: <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />,
      color: "text-green-600",
      text: "Your payment was processed successfully.",
      buttonText: "Go to Dashboard",
      link: "/user/bookings",
    },
    cancel: {
      icon: <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto" />,
      color: "text-yellow-600",
      text: "Your payment was cancelled.",
      buttonText: "Back to Home",
      link: "/",
    },
    failed: {
      icon: <XCircle className="w-16 h-16 text-red-500 mx-auto" />,
      color: "text-red-600",
      text: "Your payment failed. Please try again.",
      buttonText: "Try Again",
      link: "/checkout",
    },
  };

  // যদি status অন্য কিছু হয়
  const current = statusConfig[status] || statusConfig["failed"];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border border-muted shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
        {current.icon}
        <h2 className={`text-2xl font-semibold mt-4 ${current.color}`}>
          {data.message}
        </h2>
        <p className="mt-2">{current.text}</p>

        <div className="mt-6 space-y-2 text-left">
          <div className="flex justify-between">
            <span>Transaction ID:</span>
            <span className="font-medium">{data.transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount:</span>
            <span className="font-medium">৳ {data.amount}</span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className={`font-medium capitalize ${current.color}`}>
              {data.status}
            </span>
          </div>
        </div>

        <Button
          asChild
          className={`mt-6 w-full font-semibold py-2 border border-muted rounded-xl transition ${current.color.replace(
            "text-",
            "bg-"
          )} hover:opacity-90`}
        >
          <Link to={current.link}>{current.buttonText}</Link>
        </Button>
      </div>
    </div>
  );
}
