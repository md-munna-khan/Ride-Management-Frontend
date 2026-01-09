
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


            <RegisterForm />

            
          </div>
        </div>
      </div>

      <div className="relative hidden md:flex items-center justify-center  p-8">
        <div className="max-w-sm text-center">
          <img src="/drive.jpg" alt="Register illustration" className="mx-auto mb-6 rounded-md shadow-sm object-cover w-full h-48" />
          <h3 className="text-xl font-bold mb-2">Get moving with confidence</h3>
          <p className="">Simple signup, verified drivers, and flexible ride options for every need.</p>
        </div>
      </div>
    </div>
  );
}
