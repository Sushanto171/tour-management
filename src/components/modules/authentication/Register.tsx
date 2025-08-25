import registerImage from "@/assets/image/register.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import RegisterFrom from "./RegisterFrom";
import TermsPolicy from "./TermsPolicy";

export function RegisterLayout({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              src={registerImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <RegisterFrom />
        </CardContent>
      </Card>
      <TermsPolicy />
    </div>
  );
}
