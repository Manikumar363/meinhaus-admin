import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomerDetailsForm from "./Tabs/CustomerDetailsForm";
import ProjectDetailsForm from "./Tabs/ProjectDetailsForm";
import { toast } from "sonner";

export default function BookingForm({ customerRef, projectRef }) {
  const methods = useForm({
    defaultValues: {
      customer: {
        name: "",
        phone: "",
        email: "",
        address: "",
        coordinates: "",
      },
      project: {
        title: "",
        description: "",
        time: "",
        images: [],
      },
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log("Booking data:", data);
    toast("Booking successfully created.");
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 space-y-8 mb-4"
        >
          <CustomerDetailsForm customerRef={customerRef} />
          <ProjectDetailsForm projectRef={projectRef} />
          <div className="flex justify-end mr-4">
            <Button type="submit" className="cursor-pointer">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}
