import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { useCreateDivisionMutation } from "@/redux/features/division/division.api";


// Zod schema
const divisionSchema = z.object({
  name: z.string().min(1, "Division name is required"),
  description: z.string().optional(),
  thumbnail: z.instanceof(File).optional(),
});

type DivisionFormValues = z.infer<typeof divisionSchema>;

const AddDivision = () => {
  const [open, setOpen] = useState(false);
  const [createDivision, { isLoading }] = useCreateDivisionMutation();

  const form = useForm<DivisionFormValues>({
    resolver: zodResolver(divisionSchema),
    defaultValues: {
      name: "",
      description: "",
      thumbnail: undefined,
    },
  });

  const onSubmit = async (values: DivisionFormValues) => {
    const formData = new FormData();
    const { thumbnail, ...rest } = values;

    formData.append("data", JSON.stringify(rest));
    if (thumbnail) {
      formData.append("file", thumbnail);
    }

    try {
      await createDivision(formData).unwrap();
      toast.success("Division created successfully");
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create division");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Division
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Division</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Division name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Short description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Thumbnail */}
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Division"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDivision;
