/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Password from "@/components/ui/Password";
// import { useRegisterMutation } from "@/redux/features/auth/auth.api";
// import { toast } from "sonner";

// const registerSchema = z
//   .object({
//     name: z
//       .string()
//       .min(3, {
//         error: "Name is too short",
//       })
//       .max(50),
//     email: z.email(),
//     password: z.string().min(8, { error: "Password is too short" }),
//     confirmPassword: z
//       .string()
//       .min(8, { error: "Confirm Password is too short" }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Password do not match",
//     path: ["confirmPassword"],
//   });

// export function RegisterForm({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) {
//   const [register] = useRegisterMutation();
//   const navigate = useNavigate();

//   const form = useForm<z.infer<typeof registerSchema>>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const onSubmit = async (data: z.infer<typeof registerSchema>) => {
//     const userInfo = {
//       name: data.name,
//       email: data.email,
//       password: data.password,
//     };

//     try {
//       await register(userInfo).unwrap();

//       toast.success("User created successfully");
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl font-bold">Register your account</h1>
//         <p className="text-sm text-muted-foreground">
//           Enter your details to create an account
//         </p>
//       </div>

//       <div className="grid gap-6">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="John Doe" {...field} />
//                   </FormControl>
//                   <FormDescription className="sr-only">
//                     This is your public display name.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="john.doe@company.com"
//                       type="email"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormDescription className="sr-only">
//                     This is your public display name.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Password {...field} />
//                   </FormControl>
//                   <FormDescription className="sr-only">
//                     This is your public display name.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="confirmPassword"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Confirm Password</FormLabel>
//                   <FormControl>
//                     <Password {...field} />
//                   </FormControl>
//                   <FormDescription className="sr-only">
//                     This is your public display name.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit" className="w-full">
//               Submit
//             </Button>
//           </form>
//         </Form>

//         <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
//           <span className="relative z-10 bg-background px-2 text-muted-foreground">
//             Or continue with
//           </span>
//         </div>

//         <Button
//           type="button"
//           variant="outline"
//           className="w-full cursor-pointer"
//         >
//           Login with Google
//         </Button>
//       </div>

//       <div className="text-center text-sm">
//         Already have an account?{" "}
//         <Link to="/login" className="underline underline-offset-4">
//           Login
//         </Link>
//       </div>
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/Password";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

// ✅ Backend-compatible schema
const registerSchema = z
  .object({
    name: z.string().min(3, { message: "Name is too short" }).max(50),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password is too short" }),
    confirmPassword: z.string().min(8, { message: "Confirm Password is too short" }),
    role: z.enum(["RIDER", "DRIVER"], { required_error: "Role is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "RIDER", // Default role
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role, // Role compatible with backend enum
    };

    try {
      const res: any = await register(userInfo).unwrap();
      console.log(res)

      // Backend returns user object + JWT token
  const user = res?.data;
    if (!user) throw new Error("Invalid server response");
// const token = res?.token || res?.data?.token;
// if (!user || !token) throw new Error("Invalid server response");


      // Blocked user handling
    if (user.status === "BLOCKED" || user.status === "SUSPENDED") {
  navigate("/status", { state: { status: user.status } });
  return; // block further access
}


    toast.success("User registered successfully");

      navigate("/login"); // redirect based on role later
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to create an account
        </p>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@company.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ✅ Role Selection */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full rounded-md border p-2 bg-background text-foreground"
                    >
                      <option value="RIDER">Rider</option>
                      <option value="DRIVER">Driver</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button type="button" variant="outline" className="w-full cursor-pointer">
          Login with Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
