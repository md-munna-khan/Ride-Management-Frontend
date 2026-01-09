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
        

            <LoginForm />

         
          </div>
        </div>

        <div className="hidden md:block text-center text-xs mt-4">
          By continuing you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
        </div>
      </div>

      <div className="relative hidden md:flex items-center justify-center  to-accent/8 p-8">
        <div className="max-w-sm text-center">
          <img src="/ridesharing.jpg" alt="Ride illustration" className="mx-auto mb-6 rounded-md shadow-sm object-cover w-full h-48" />
          <h3 className="text-xl font-bold mb-2">Safe rides, every time</h3>
          <p className="">Fast matching, verified drivers, and 24/7 support to keep you moving.</p>
        </div>
      </div>
    </div>
  );
}
