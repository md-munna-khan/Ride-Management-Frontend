/* eslint-disable @typescript-eslint/no-explicit-any */


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
import config from "@/config";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/Password";
import SingleImageUploader from "@/components/SingleImageUploader";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const passwordSchema = z
  .string( )
  .min(8, "Password must be at least 8 characters long")
  .regex(/(?=.*[A-Z])/, "Must contain at least 1 uppercase letter")
  .regex(/(?=.*\d)/, "Must contain at least 1 number")
  .regex(/(?=.*[!@#$%^&*])/, "Must contain at least 1 special character");

const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50),
    email: z.string().email({ message: "Invalid email address" }),
    password: passwordSchema,
    confirmPassword: z.string(),
    phone: z
      .string()
      .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message:
          "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
      })
      .optional(),
    role: z.enum(["RIDER", "DRIVER"]),
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
  const [picture, setPicture] = useState<File | null>(null);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      role: "RIDER", // Default role
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      // build FormData to send file + fields (backend expects multer single file)
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);
      if (data.phone) formData.append("phone", data.phone);
      if (picture) formData.append("file", picture);

      const res: any = await register(formData).unwrap();
      console.log(res)

      // Backend returns user object + JWT token
  const user = res?.data;
    if (!user) throw new Error("Invalid server response");


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
        <p className="text-sm">
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

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+8801XXXXXXXXX or 01XXXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            
            {/* Profile Photo */}
            <div>
              <FormLabel>Profile Photo (optional)</FormLabel>
              <SingleImageUploader onChange={(file) => setPicture(file)} />
              {picture && (
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div className="text-sm">{picture.name} • {(picture.size/1024).toFixed(1)} KB</div>
                  <Button variant="ghost" size="sm" onClick={() => setPicture(null)}>Remove</Button>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2">
            Or continue with
          </span>
        </div>

         <Button
          onClick={() => window.open(`${config.baseUrl}/auth/google`)}
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
        >
          Login with Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4   text-primary">
          Login
        </Link>
      </div>
    </div>
  );
}
