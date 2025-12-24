/* eslint-disable @typescript-eslint/no-explicit-any */
import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useApplyAsDriverMutation } from "@/redux/features/rideApi/rideApi";
import { useGetMeQuery } from "@/redux/features/userProfileApi/userApi";

interface IFormInputs {
  vehicleType: "Bike" | "Car";
  vehicleNumber: string;
}

export function ApplyAsDriver() {
  const [open, setOpen] = useState(false);
  const [drivingLicense, setDrivingLicense] = useState<File | null>(null);
  const [applyAsDriver] = useApplyAsDriverMutation();
  const { data: user } = useGetMeQuery(undefined);

  const form = useForm<IFormInputs>({
    defaultValues: {
      vehicleType: "Bike",
      vehicleNumber: "",
    },
  });

  const onSubmit = async (data: IFormInputs) => {
    if (!user?.data?._id) {
      toast.error("User not found. Please login again.");
      return;
    }

    if (!drivingLicense) {
      toast.error("Please upload your driving license.");
      return;
    }

    if (!data.vehicleNumber || !data.vehicleNumber.trim()) {
      toast.error("Vehicle number is required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", user.data._id);

      // objects need to be stringified for Multer + Zod
      formData.append(
        "data",
        JSON.stringify({
          vehicle: {
            vehicleType: data.vehicleType,
            vehicleNumber: data.vehicleNumber,
          },
          location: {
            type: "Point",
            coordinates: [0, 0],
          },
        })
      );

      // formData.append(
      //   "location",
      //   JSON.stringify({
      //     type: "Point",
      //     coordinates: [90.4237, 23.7768], // default coordinates
      //   })
      // );

      formData.append("file", drivingLicense);

      const response = await applyAsDriver(formData).unwrap();
      toast.success(response.message || "Application submitted successfully!");
      setOpen(false);
      form.reset();
      setDrivingLicense(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Apply as Driver</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply as Driver</DialogTitle>
        </DialogHeader>
        {/* User summary + instructions */}
        <div className="px-4">
          <p className="text-sm text-muted-foreground mb-2">Please provide your vehicle details and upload a clear copy of your driving license. Applications are reviewed within 48 hours.</p>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-semibold text-slate-700">
              {user?.data?.name ? user.data.name.split(' ').map((n: string) => n[0]).slice(0,2).join('') : 'U'}
            </div>
            <div className="text-sm">
              <div className="font-medium">{user?.data?.name || 'Unknown User'}</div>
              <div className="text-muted-foreground text-xs">{user?.data?.email || 'No email'}</div>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form
            className="space-y-5"
            id="apply-driver"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="vehicleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Type</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Vehicle Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bike">Bike</SelectItem>
                        <SelectItem value="Car">Car</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicleNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Vehicle Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <div className="mt-2">
            <SingleImageUploader onChange={setDrivingLicense} />

            {/* preview and info */}
            {drivingLicense && (
              <div className="mt-3 flex items-center gap-3">
                <div className="w-16 h-12 overflow-hidden rounded-md bg-gray-50 border flex items-center justify-center">
                  {/* preview if image */}
                  {drivingLicense.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(drivingLicense)} alt="license preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-xs text-muted-foreground px-2">{drivingLicense.name}</div>
                  )}
                </div>
                <div className="flex-1 text-sm">
                  <div className="font-medium">{drivingLicense.name}</div>
                  <div className="text-xs text-muted-foreground">{(drivingLicense.size / 1024).toFixed(1)} KB</div>
                </div>
                <div>
                  <Button variant="ghost" size="sm" onClick={() => setDrivingLicense(null)}>Remove</Button>
                </div>
              </div>
            )}
          </div>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={!drivingLicense} type="submit" form="apply-driver">
            Submit Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
