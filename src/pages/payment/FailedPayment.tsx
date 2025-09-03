/* eslint-disable @typescript-eslint/no-unused-vars */
import PaymentCard from "@/components/modules/payment/PaymentCard";
import { useSearchParams } from "react-router";

export default function FailedPayment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const allParams = Object.fromEntries(searchParams);
  console.log(Array.isArray(allParams));
  return (
    <div>
      <PaymentCard {...allParams} />
    </div>
  );
}
