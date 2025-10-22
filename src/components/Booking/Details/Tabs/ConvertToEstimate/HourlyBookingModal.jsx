import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldDescription,
} from "@/components/ui/field";
import { toast } from "sonner";

const HourlyBookingModal = ({ booking }) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      title: booking?.title || "",
      email: booking?.customer?.email || "",
      customerName: booking?.customer?.name || "",
      service: "",
      minHour: "",
      minCharge: "",
      addHourCharge: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Hourly Booking Submitted:", data);
    toast("Hourly booking successful.");
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border border-black text-xs lg:text-sm">
          Hourly Booking
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-xl bg-white sm:min-w-[90vw] lg:min-w-[60vw] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-sm lg:text-xl font-semibold text-gray-900 border-b pb-4">
            Hourly Booking
          </DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs lg:text-sm">Title</FieldLabel>
                    <Input {...field} disabled className="bg-gray-100 text-xs lg:text-sm" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs lg:text-sm">Email</FieldLabel>
                    <Input {...field} disabled className="bg-gray-100 text-xs lg:text-sm" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="customerName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs lg:text-sm">Customer Name</FieldLabel>
                    <Input {...field} disabled className="bg-gray-100 text-xs lg:text-sm" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="service"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs lg:text-sm">Select Service</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="text-xs lg:text-sm">
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flooring">
                          Flooring and Tile Services
                        </SelectItem>
                        <SelectItem value="appliance">
                          Appliance Install
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="minHour"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs lg:text-sm">Minimum Hour</FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter Minimum Hour"
                      className="text-xs lg:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="minCharge"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs lg:text-sm">Charge for Minimum Hour ($)</FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter Charge"
                      className="text-xs lg:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="addHourCharge"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs lg:text-sm">Charge Additional Per Hour ($)</FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter Additional Charge"
                      className="text-xs lg:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs lg:text-sm">Description</FieldLabel>
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder="Enter Description"
                      className="resize-none text-xs lg:text-md"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="flex justify-end mt-4 gap-2">
              <Button type="submit" className="px-12 text-xs lg:text-sm">Book</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HourlyBookingModal;
