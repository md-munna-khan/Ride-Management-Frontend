import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router";



interface LocationState {
  status?: "BLOCKED" | "Suspended" | string;
  message?: string;
}

export default function AccountStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const status = state?.status || "BLOCKED";
  const message =
    state?.message ||
    "Your account is currently blocked. Please contact support to resolve this issue.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-background text-foreground">
      <div className="max-w-md w-full text-center p-10 rounded-2xl shadow-lg bg-white">
        <h1 className="text-3xl font-bold mb-4">
          {status === "BLOCKED"
            ? "Account Blocked"
            : status === "Suspended"
            ? "Account Suspended"
            : "Account Status"}
        </h1>
        <p className="text-sm text-muted-foreground mb-6">{message}</p>

        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/contact")}
            className="w-full"
          >
            Contact Support
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/login")}
            className="w-full"
          >
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  );
}



