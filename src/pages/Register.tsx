
import { Link } from "react-router";

import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";
import Logo from "@/assets/icons/Logo";

export default function Register() {
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
              <h2 className="text-2xl font-bold">Create your account</h2>
              <p className="text-sm text-muted-foreground">Join as a rider or driver and start using the app.</p>
            </div>

            <RegisterForm />

            <div className="mt-4 text-center text-sm text-muted-foreground">
              <span>Already have an account? </span>
              <Link to="/login" className="text-primary font-medium">Sign in</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden md:flex items-center justify-center bg-muted/10 p-8">
        <div className="max-w-sm text-center">
          <img src="/drive.jpg" alt="Register illustration" className="mx-auto mb-6 rounded-md shadow-sm object-cover w-full h-48" />
          <h3 className="text-xl font-bold mb-2">Get moving with confidence</h3>
          <p className="text-muted-foreground">Simple signup, verified drivers, and flexible ride options for every need.</p>
        </div>
      </div>
    </div>
  );
}
