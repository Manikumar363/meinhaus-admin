import React from "react";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import ConvertToEstimateForm from "./ConvertToEstimateForm";
import ServiceDetails from "./ServiceDetails";
import HourlyBookingModal from "./HourlyBookingModal";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const ConvertToEstimateTab = ({ booking }) => {
  const methods = useForm({
    defaultValues: {
      title: booking?.title || "",
      province: "",
      postalCode: "",
      contactNumber: "",
      numberOfPayment: "",
      autoDivide: false,
      services: [
        {
          serviceName: "",
          amount: "",
          registrationAmount: "",
          description: "",
          professionalDescription: "",
          images: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "services",
  });

  const onSubmit = (data) => {
    console.log("Final estimate data:", data);
    toast("Estimated Created Successfully.");
    methods.reset();
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form
          id="form-estimate"
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <ConvertToEstimateForm />

          <div className="flex flex-col gap-6">
            {fields.map((field, index) => (
              <ServiceDetails
                key={field.id}
                control={methods.control}
                name={`services.${index}`}
                index={index}
                remove={remove}
                canRemove={fields.length > 1}
              />
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  serviceName: "",
                  amount: "",
                  registrationAmount: "",
                  description: "",
                  professionalDescription: "",
                  images: [],
                })
              }
              className="bg-transparent border border-black w-fit text-xs lg:text-sm"
            >
              <Plus size={16} /> Add Service
            </Button>
          </div>
        </form>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            type="submit"
            size="sm"
            form="form-estimate"
            className="bg-black text-white text-xs lg:text-sm"
          >
            Convert to Estimate
          </Button>
          <HourlyBookingModal booking={booking} />
        </div>
      </FormProvider>
    </div>
  );
};

export default ConvertToEstimateTab;
