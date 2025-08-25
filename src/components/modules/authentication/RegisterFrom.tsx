import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

export default function RegisterFrom() {
  const [showPass, setShowPass] = useState(false);
  return (
    <div>
      <form className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Sing in now Free</h1>
            <p className="text-muted-foreground text-balance">
              Register for Tour Management account
            </p>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="name" placeholder="John Dhow" required />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>
          <div className="grid gap-3 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPass ? "text" : "password"}
              placeholder="******"
              required
            />
            <button
              className="absolute right-4 top-9"
              type="button"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
            </button>
          </div>

          <Button type="submit" className="w-full">
            Register
          </Button>

          <SocialLogin />
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
