import { useUserInfoQuery } from "@/redux/features/auth/api";
import type { TRole } from "@/types";
import { type ComponentType } from "react";
import { Navigate } from "react-router";

export default function withAuth(
  Component: ComponentType,
  requiredRole?: TRole
) {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    if(isLoading){
      return <div>Loading...</div>
    }
    if (!isLoading && data && !data.data.email) {
      return <Navigate to="/" />;
    }
    if (requiredRole && !isLoading && data?.data.role !== requiredRole) {
      return <Navigate to="/" />;
    }
    return <Component />;
  };
}
