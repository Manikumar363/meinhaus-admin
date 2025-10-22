import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customers } from "@/constants";

export default function CustomerDetailsForm({ customerRef }) {
  const form = useFormContext();

  const [isNewCustomer, setIsNewCustomer] = useState(true);
  const [isAddNewAddress, setIsAddNewAddress] = useState(true);

  return (
    <div
      ref={customerRef}
      className="space-y-4 border rounded-lg bg-white shadow-sm"
    >
      <h2 className="text-sm lg:text-lg font-semibold px-4 pt-3">
        Customer Details
      </h2>
      <Separator />

      <div className="px-4 pb-4 space-y-6 font-medium">
        <div className="flex gap-8">
          <Label className="flex items-center gap-2 cursor-pointer text-xs lg:text-sm">
            <Checkbox
              className="data-[state=checked]:bg-gray-400 data-[state=checked]:border-none cursor-pointer"
              checked={isNewCustomer}
              onCheckedChange={() => setIsNewCustomer(true)}
            />
            Create New Customer
          </Label>
          <Label className="flex items-center gap-2 cursor-pointer text-xs lg:text-sm">
            <Checkbox
              className="data-[state=checked]:bg-gray-400 data-[state=checked]:border-none cursor-pointer"
              checked={!isNewCustomer}
              onCheckedChange={() => setIsNewCustomer(false)}
            />
            Existing Customer
          </Label>
        </div>

        {!isNewCustomer && (
          <FormField
            control={form.control}
            name="customer.existingCustomer"
            render={({ field }) => (
              <div className="space-y-1">
                <Label className="text-xs lg:text-sm">Existing Customer</Label>
                <Select
                  value={field.value || ""}
                  onValueChange={(val) => {
                    const customer = customers.find((c) => c.id === val);
                    if (customer) {
                      form.setValue("customer.name", customer.name);
                      form.setValue("customer.phone", customer.phone);
                      form.setValue("customer.email", customer.email);
                      form.setValue("customer.address", customer.address);
                      form.setValue(
                        "customer.coordinates",
                        customer.coordinates
                      );
                    }
                    field.onChange(val);
                  }}
                >
                  <SelectTrigger className="w-full text-xs lg:text-sm">
                    <SelectValue placeholder="Select Customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        )}

        <div className="grid lg:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="customer.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs lg:text-sm">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter customer name"
                    className="text-xs lg:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs lg:text-sm">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+91 | Enter phone number"
                    className="text-xs lg:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs lg:text-sm">Email ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email (optional)"
                    className="text-xs lg:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-8">
          <Label className="flex items-center gap-2 cursor-pointer text-xs lg:text-sm">
            <Checkbox
              className="data-[state=checked]:bg-gray-400 data-[state=checked]:border-none cursor-pointer"
              checked={isAddNewAddress}
              onCheckedChange={() => setIsAddNewAddress(true)}
            />
            Add New Address
          </Label>
          <Label className="flex items-center gap-2 cursor-pointer text-xs lg:text-sm">
            <Checkbox
              className="data-[state=checked]:bg-gray-400 data-[state=checked]:border-none cursor-pointer"
              checked={!isAddNewAddress}
              onCheckedChange={() => setIsAddNewAddress(false)}
            />
            Choose Existing Address
          </Label>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          {isAddNewAddress ? (
            <FormField
              control={form.control}
              name="customer.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs lg:text-sm">Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a location (Restricted to Canada)"
                      className="text-xs lg:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="customer.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs lg:text-sm">
                    Select Existing Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Search or choose from saved addresses"
                      className="text-xs lg:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="customer.coordinates"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs lg:text-sm">
                  Coordinates
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="--,--"
                    className="text-xs lg:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
