import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Upload, X } from "lucide-react";

export default function ProjectImagesUpload() {
  const [previews, setPreviews] = useState([]);
  const form = useFormContext();
  const fieldValue = form.watch("project.images") || [];

  useEffect(() => {
    if (!fieldValue || fieldValue.length === 0) {
      setPreviews([]);
    }
  }, [fieldValue]);

  return (
    <FormField
      control={form.control}
      name="project.images"
      render={({ field }) => {
        const handleImageUpload = (e) => {
          const files = Array.from(e.target.files);
          const urls = files.map((file) => URL.createObjectURL(file));
          setPreviews((prev) => [...prev, ...urls]);
          field.onChange([...(field.value || []), ...files]);
        };

        const handleImageRemove = (idx) => {
          setPreviews((prev) => prev.filter((_, i) => i !== idx));
          field.onChange(field.value.filter((_, i) => i !== idx));
        };

        return (
          <FormItem>
            <FormLabel className="text-xs lg:text-sm">Images</FormLabel>
            <FormControl>
              <div className="flex items-center gap-2 flex-wrap">
                {previews.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={img}
                      alt="preview"
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(idx)}
                      className="absolute -top-1 -right-1 cursor-pointer text-white bg-red-500 rounded-full flex items-center justify-center shadow"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}

                <label className="flex gap-1 border border-black items-center justify-center rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50">
                  <Upload size={16} />
                  <span className="text-xs lg:text-sm">Upload Images</span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
