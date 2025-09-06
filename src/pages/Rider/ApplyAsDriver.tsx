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
        <Button>Apply as Driver</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply as Driver</DialogTitle>
        </DialogHeader>

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

          <SingleImageUploader onChange={setDrivingLicense} />
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
