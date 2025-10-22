import React, { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Image, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useFormContext, useWatch } from "react-hook-form";
import { projectImages } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";

const ServiceDetails = ({ control, name, remove, index, canRemove }) => {
  const service = useWatch({ control, name });
  const { setValue } = useFormContext();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const openImageModal = () => {
    setSelectedImages(service.images || []);
    setImageModalOpen(true);
  };

  const handleSaveImages = () => {
    setValue(`${name}.images`, selectedImages);
    setImageModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="p-4 flex justify-between">
        <h1 className="font-semibold text-sm lg:text-lg flex items-center">
          Service Details
        </h1>
        {canRemove && (
          <Button
            variant="link"
            size="sm"
            onClick={() => remove(index)}
            className="text-red-500"
          >
            Remove
          </Button>
        )}
      </div>

      <Separator className="border" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <FormField
          control={control}
          name={`${name}.serviceName`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs lg:text-sm">Service Name</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full text-xs lg:text-sm">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Service 1">Service 1</SelectItem>
                    <SelectItem value="Service 2">Service 2</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`${name}.amount`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs lg:text-sm">Amount</FormLabel>
              <FormControl>
                <Input {...field} className="text-xs lg:text-sm" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`${name}.registrationAmount`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs lg:text-sm">Registration Amount</FormLabel>
              <FormControl>
                <Input {...field} type="number" className="text-xs lg:text-sm" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`${name}.description`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs lg:text-sm">Description</FormLabel>
              <FormControl>
                <Textarea {...field} className="text-xs lg:text-sm" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`${name}.professionalDescription`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs lg:text-sm">Professional Description</FormLabel>
              <FormControl>
                <Textarea {...field} className="text-xs lg:text-sm" />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="space-y-1">
          <FormLabel className="text-xs lg:text-sm">Images</FormLabel>
          <div className="flex flex-wrap gap-2 items-center">
            {service.images?.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  alt="preview"
                  className="w-16 h-16 object-cover rounded-md border"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={() =>
                    setValue(
                      `${name}.images`,
                      service.images.filter((_, idx) => idx !== i)
                    )
                  }
                >
                  <X size={12} />
                </button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openImageModal}
              className="border border-black flex items-center gap-1 text-xs lg:text-sm"
            >
              <Image size={16} /> Choose Images
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="bg-white w-[500px] max-w-full">
          <DialogHeader>
            <DialogTitle className="text-sm lg:text-lg">Choose Images</DialogTitle>
          </DialogHeader>
          <Separator className="border" />

          <div className="grid grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 gap-2 p-2 max-h-[300px] overflow-y-auto">
            {projectImages.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  alt={`img-${i}`}
                  className="w-full h-20 object-cover rounded-md border"
                />
                <Checkbox
                  className="absolute top-1 right-1 w-4 h-4 bg-white"
                  checked={selectedImages.includes(img)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedImages((prev) => [...prev, img]);
                    } else {
                      setSelectedImages((prev) =>
                        prev.filter((x) => x !== img)
                      );
                    }
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setImageModalOpen(false)}
              className="text-xs lg:text-sm"
            >
              Cancel
            </Button>
            <Button type="button" className="text-xs lg:text-sm" onClick={handleSaveImages}>
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceDetails;
