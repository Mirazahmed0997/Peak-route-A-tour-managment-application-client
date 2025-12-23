import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Minus, Plus, PlusIcon, Trash, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
    useCreateTourMutation,
    useTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import { useDivisionsQuery } from "@/redux/features/division/division.api";

interface TourFormValues {
    title: string;
    location?: string;
    costFrom?: number;
    maxGuest?: number;
    tourType: string;
    division: string;
    startDate?: string;
    endDate?: string;
    images?: File[];
    included?: { value: string }[];
    exCluded?: { value: string }[];
    tourPlan?: { value: string }[];
    amenities?: { value: string }[];
}

const AddTourModal = () => {
    const [open, setOpen] = useState(false);
    const { data: divisions = [] } = useDivisionsQuery(undefined);
    const { data: tourTypes = [] } = useTourTypesQuery(undefined);
    const [createTour, { isLoading }] = useCreateTourMutation();

    const form = useForm<TourFormValues>({
        defaultValues: {
            title: "",
            location: "",
            costFrom: undefined,
            maxGuest: undefined,
            tourType: "",
            division: "",
            startDate: "",
            endDate: "",
            images: [],
            included: [{ value: "" }],
            exCluded: [{ value: "" }],
            tourPlan: [{ value: "" }],
            amenities: [{ value: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "included",
    });

    // console.log(fields)

    const exCludedFields = useFieldArray({
        control: form.control,
        name: "exCluded",
    });

    const tourPlanFields = useFieldArray({
        control: form.control,
        name: "tourPlan",
    });

    const amenitiesFields = useFieldArray({
        control: form.control,
        name: "amenities",
    });

    const [images, setImages] = useState<File[]>([]);

    const onSubmit = async (values: TourFormValues) => {
        const formData = new FormData();

        const { images, ...rest } = values;

        // Convert array of objects to array of strings
        const payload = {
            ...rest,
            included: rest?.included?.map((item) => item.value),
            exCluded: rest?.exCluded?.map((item) => item.value),
            tourPlan: rest?.tourPlan?.map((item) => item.value),
            amenities: rest?.amenities?.map((item) => item.value),
        };

        formData.append("data", JSON.stringify(payload));

        images?.forEach((file) => {
            formData.append("files", file);
        });

        try {
            await createTour(formData).unwrap();
            toast.success("Tour created successfully");
            form.reset();
            setOpen(false);
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

            <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Tour</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            rules={{ required: "Title is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tour title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Location */}
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Cost & Guests */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="costFrom"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cost From</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="maxGuest"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max Guests</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">

                            {/* Tour Type */}
                            <FormField
                                control={form.control}
                                name="tourType"
                                rules={{ required: "Tour type is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tour Type *</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Division */}
                            <FormField
                                control={form.control}
                                name="division"
                                rules={{ required: "Division is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Division *</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} min={form.watch("startDate")} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Images */}
                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tour Images</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={(e) =>
                                                field.onChange(e.target.files ? Array.from(e.target.files) : [])
                                            }
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                        {/* Includes */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-700 dark:text-gray-200">Includes</span>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    className="flex items-center gap-1"
                                    onClick={() => append({ value: "" })}
                                >
                                    <PlusIcon className="h-4 w-4" /> Add
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {fields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <Controller
                                            name={`included.${index}.value`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    placeholder={`Include #${index + 1}`}
                                                    className="flex-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                                />
                                            )}
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => remove(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Excluded */}
                        <div className="space-y-3 mt-6">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    Excludes
                                </span>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    className="flex items-center gap-1"
                                    onClick={() => exCludedFields.append({ value: "" })}
                                >
                                    <PlusIcon className="h-4 w-4" /> Add
                                </Button>
                            </div>

                            {exCludedFields.fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="flex items-center gap-2 rounded-md border bg-gray-50 dark:bg-gray-800
                 border-gray-200 dark:border-gray-700 p-2
                 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <Controller
                                        name={`exCluded.${index}.value`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder={`Exclude #${index + 1}`}
                                                className="flex-1 bg-white dark:bg-gray-900
                       text-gray-900 dark:text-gray-100
                       border-gray-300 dark:border-gray-600"
                                            />
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => exCludedFields.remove(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>


                        {/* Tour Plan */}
                        <div className="space-y-3 mt-6">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    Tour Plan
                                </span>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    className="flex items-center gap-1"
                                    onClick={() => tourPlanFields.append({ value: "" })}
                                >
                                    <PlusIcon className="h-4 w-4" /> Add
                                </Button>
                            </div>

                            {tourPlanFields.fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="flex items-center gap-2 rounded-md border bg-gray-50 dark:bg-gray-800
                 border-gray-200 dark:border-gray-700 p-2
                 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <Controller
                                        name={`tourPlan.${index}.value`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder={`Plan #${index + 1}`}
                                                className="flex-1 bg-white dark:bg-gray-900
                       text-gray-900 dark:text-gray-100
                       border-gray-300 dark:border-gray-600"
                                            />
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => tourPlanFields.remove(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>


                        {/* Amenities */}
                        <div className="space-y-3 mt-6">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    Amenities
                                </span>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    className="flex items-center gap-1"
                                    onClick={() => amenitiesFields.append({ value: "" })}
                                >
                                    <PlusIcon className="h-4 w-4" /> Add
                                </Button>
                            </div>

                            {amenitiesFields.fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="flex items-center gap-2 rounded-md border bg-gray-50 dark:bg-gray-800
                 border-gray-200 dark:border-gray-700 p-2
                 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <Controller
                                        name={`amenities.${index}.value`}
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder={`Amenity #${index + 1}`}
                                                className="flex-1 bg-white dark:bg-gray-900
                       text-gray-900 dark:text-gray-100
                       border-gray-300 dark:border-gray-600"
                                            />
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => amenitiesFields.remove(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>








                        <DialogFooter>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Creating..." : "Create Tour"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddTourModal;
