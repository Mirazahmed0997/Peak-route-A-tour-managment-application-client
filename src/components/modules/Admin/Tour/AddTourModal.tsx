import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import {
  useCreateTourMutation,
  useTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import { useDivisionsQuery } from "@/redux/features/division/division.api";

const AddTourModal = () => {
  const [open, setOpen] = useState(false);

  const { data: divisionsData } = useDivisionsQuery(undefined);
  const { data: tourTypesData } = useTourTypesQuery(undefined);

  const divisions = divisionsData ?? [];
  const tourTypes = tourTypesData ?? [];

  const [createTour, { isLoading }] = useCreateTourMutation();

  const [form, setForm] = useState({
    title: "",
    location: "",
    costFrom: "",
    maxGuest: "",
    tourType: "",
    division: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.tourType || !form.division) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      await createTour({
        ...form,
        costFrom: Number(form.costFrom),
        maxGuest: Number(form.maxGuest),
      }).unwrap();

      toast.success("Tour created successfully");
      setOpen(false);
      setForm({
        title: "",
        location: "",
        costFrom: "",
        maxGuest: "",
        tourType: "",
        division: "",
      });
    } catch (error) {
      toast.error("Failed to create tour");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Tour
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Tour</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Title */}
          <div>
            <Label>Title *</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Tour title"
            />
          </div>

          {/* Location */}
          <div>
            <Label>Location</Label>
            <Input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
            />
          </div>

          {/* Cost & Max Guest */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Cost From</Label>
              <Input
                type="number"
                name="costFrom"
                value={form.costFrom}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Max Guests</Label>
              <Input
                type="number"
                name="maxGuest"
                value={form.maxGuest}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Tour Type Select */}
          <div>
            <Label>Tour Type *</Label>
            <Select
              value={form.tourType}
              onValueChange={(value) =>
                setForm({ ...form, tourType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select tour type" />
              </SelectTrigger>
              <SelectContent>
                {tourTypes.map((type: any) => (
                  <SelectItem key={type._id} value={type._id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Division Select */}
          <div>
            <Label>Division *</Label>
            <Select
              value={form.division}
              onValueChange={(value) =>
                setForm({ ...form, division: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select division" />
              </SelectTrigger>
              <SelectContent>
                {divisions.map((division: any) => (
                  <SelectItem key={division._id} value={division._id}>
                    {division.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Tour"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTourModal;
