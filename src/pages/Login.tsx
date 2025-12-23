// import TravelLogin from "@/assets/images/travel-login.jpg";
import { Link } from "react-router";

import { LoginForm } from "@/components/modules/Authentication/LoginForm";
import Logo from "@/assets/icons/Logo";

export default function Login() {
  return (
    <div className=" pt-4 max-w-6xl mx-auto grid md:grid-cols-2">
      <div className="flex flex-col gap-6 p-6 md:p-12 justify-center">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <Logo />
            <span className="hidden md:inline text-lg font-bold">Ride Management</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-bold">Welcome back</h2>
              <p className="text-sm text-muted-foreground">Sign in to continue to your dashboard</p>
            </div>

            <LoginForm />

            <div className="mt-4 text-center text-sm text-muted-foreground">
              <span>Don't have an account? </span>
              <Link to="/register" className="text-primary font-medium">Create one</Link>
            </div>
          </div>
        </div>

        <div className="hidden md:block text-center text-xs text-muted-foreground mt-4">
          By continuing you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
        </div>
      </div>

      <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-primary/8 to-accent/8 p-8">
        <div className="max-w-sm text-center">
          <img src="/ridesharing.jpg" alt="Ride illustration" className="mx-auto mb-6 rounded-md shadow-sm object-cover w-full h-48" />
          <h3 className="text-xl font-bold mb-2">Safe rides, every time</h3>
          <p className="text-muted-foreground">Fast matching, verified drivers, and 24/7 support to keep you moving.</p>
        </div>
      </div>
    </div>
  );
}
