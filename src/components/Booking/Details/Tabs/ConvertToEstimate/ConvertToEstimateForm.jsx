"use client";

import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { Separator } from "@/components/ui/separator";

const ConvertToEstimateForm = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-white rounded-xl shadow space-y-4">
      <h2 className="font-semibold px-4 pt-2 text-sm lg:text-lg">Convert To Estimate</h2>
      <Separator className={"border"} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 py-4 text-sm">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs lg:text-sm">Title</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-gray-100 text-xs lg:text-sm" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="province"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs lg:text-sm">Province</FormLabel>
              <FormControl>
                <Input {...field} className="text-xs lg:text-sm" placeholder="Enter Province" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="postalCode"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs lg:text-sm">Postal/Zip Code</FormLabel>
              <FormControl>
                <Input {...field} className="text-xs lg:text-sm" placeholder="Enter Postal/Zip Code" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs lg:text-sm">Contact Number</FormLabel>
              <FormControl>
                <Input {...field} className="text-xs lg:text-sm" placeholder="Enter Contact Number" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="numberOfPayment"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs lg:text-sm">Number of Payments</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full text-xs lg:text-sm">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="autoDivide"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  {...field}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-xs lg:text-sm">Auto Divide</FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ConvertToEstimateForm;
