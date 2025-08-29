import Google from "@/assets/icons/Google";
import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { Facebook } from "lucide-react";

export default function SocialLogin() {
  return (
    <>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-card text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => window.open(`${config.baseUrl}/auth/google`)}
          variant="outline"
          type="button"
          className="w-full"
        >
          <Google />
          <span className="sr-only">Login with Apple</span>
        </Button>
        <Button variant="outline" type="button" className="w-full">
          <Facebook />
          <span className="sr-only">Login with Apple</span>
        </Button>
      </div>
    </>
  );
}
