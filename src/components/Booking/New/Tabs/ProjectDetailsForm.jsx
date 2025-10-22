import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ProjectImagesUpload from "./ProjectImageUpload";
import { Separator } from "@/components/ui/separator";

export default function ProjectDetailsForm({ projectRef }) {
  const form = useFormContext();

  return (
    <div ref={projectRef} className="space-y-4 border rounded-lg bg-white">
      <h2 className="text-sm lg:text-lg font-semibold px-4 pt-2">Project Details</h2>
      <Separator className="border" />
      <div className="px-4 pb-4 grid lg:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="project.title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs lg:text-sm">Project Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" className="text-xs lg:text-sm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="project.time"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs lg:text-sm">When do you want your project done?</FormLabel>
              <FormControl>
                <Select
                  value={field.value} 
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full text-xs lg:text-sm">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">ASAP</SelectItem>
                    <SelectItem value="less_than_1_week">
                      Less than 1 week
                    </SelectItem>
                    <SelectItem value="less_than_2_weeks">
                      Less than 2 weeks
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="project.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs lg:text-sm">Description</FormLabel>
              <FormControl>
                <Textarea className="text-xs lg:text-sm" placeholder="Enter project description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ProjectImagesUpload />
      </div>
    </div>
  );
}
