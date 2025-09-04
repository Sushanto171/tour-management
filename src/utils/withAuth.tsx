import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import { type ComponentType } from "react";
import { Navigate } from "react-router";

export default function withAuth(
  Component: ComponentType,
  requiredRole?: TRole
) {
  return function AuthWrapper() {
    const { data, isLoading, isError } = useUserInfoQuery(undefined);
    if (isError) {
      return <Navigate to="/unauthorized" />;
    }
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (!isLoading && data && !data.data.email) {
      return <Navigate to="/unauthorized" />;
    }
    if (requiredRole && !isLoading && data?.data.role !== requiredRole) {
      return <Navigate to="/unauthorized" />;
    }
    return <Component />;
  };
}
