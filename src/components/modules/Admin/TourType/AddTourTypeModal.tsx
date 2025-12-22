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
import { useCreateTourTypeMutation } from "@/redux/features/tour/tour.api";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";




const AddTourTypeModal = () => {

    const [open, setOpen] = useState(false);
    const [createTourType, { isLoading: isCreating }] =
        useCreateTourTypeMutation();

    const [name, setName] = useState("");



    const handleCreate = async () => {
        if (!name.trim()) {
            toast.error("Tour type name is required");
            return;
        }

        try {
            await createTourType({ name }).unwrap();
            toast.success("Tour type added successfully");
            setName("");
            setOpen(false);
        } catch (error) {
            toast.error("Failed to add tour type");
            console.error(error);
        }
    };


    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Tour Type
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Tour Type</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-2">
                        <Label htmlFor="name">Tour Type Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Adventure"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            onClick={handleCreate}
                            disabled={isCreating}
                        >
                            {isCreating ? "Adding..." : "Add"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddTourTypeModal;