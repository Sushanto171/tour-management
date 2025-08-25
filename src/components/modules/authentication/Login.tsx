import loginImage from "@/assets/image/login.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import LoginFrom from "./LoginFrom";
import TermsPolicy from "./TermsPolicy";

export function LoginLayout({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <LoginFrom />
          <div className="bg-muted relative hidden md:block">
            <img
              src={loginImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <TermsPolicy />
    </div>
  );
}
