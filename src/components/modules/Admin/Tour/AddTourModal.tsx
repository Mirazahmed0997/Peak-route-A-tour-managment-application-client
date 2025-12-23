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
    const [images, setImages] = useState<File[]>([]);

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
        startDate: "",
        endDate: "",
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleSubmit = async () => {
        if (!form.title || !form.tourType || !form.division) {
            toast.error("Please fill required fields");
            return;
        }

        const formData = new FormData();

        formData.append(
            "data",
            JSON.stringify({
              title: form.title,
              location: form.location,
              costFrom: Number(form.costFrom),
              maxGuest: Number(form.maxGuest),
              tourType: form.tourType,
              division: form.division,
              startDate: form.startDate ? new Date(form.startDate) : undefined,
              endDate: form.endDate ? new Date(form.endDate) : undefined,
            })
          );
          

        //  images
        images.forEach((image) => {
            formData.append("files", image);
        });

        try {
            await createTour(formData).unwrap();
            toast.success("Tour created successfully");

            setOpen(false);
            setForm({
                title: "",
                location: "",
                costFrom: "",
                maxGuest: "",
                tourType: "",
                division: "",
                startDate: "",
                endDate: "",
            });
            setImages([]);
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
                    <div>
                        <Label>Title *</Label>
                        <Input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Tour title"
                        />
                    </div>

                    <div>
                        <Label>Location</Label>
                        <Input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                        />
                    </div>

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

                    {/* Tour Type */}
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

                    {/* Division */}
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
                                {divisions.map((div: any) => (
                                    <SelectItem key={div._id} value={div._id}>
                                        {div.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Images */}
                    <div>
                        <Label>Tour Images</Label>
                        <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label>Start Date</Label>
                            <Input
                                type="date"
                                name="startDate"
                                value={form.startDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>End Date</Label>
                            <Input
                                type="date"
                                name="endDate"
                                value={form.endDate}
                                onChange={handleChange}
                                min={form.startDate} // prevents invalid range
                            />
                        </div>
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
