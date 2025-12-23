import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { toast } from "sonner";
import { useDeleteDivisionMutation, useDivisionsQuery } from "@/redux/features/division/division.api";
import AddDivision from "@/components/modules/Admin/Division/AddDivision";

const DivisionTable = () => {


    const { data: divisions = [], isLoading } = useDivisionsQuery(undefined);

    const [deleteDivision] = useDeleteDivisionMutation();




    const handleRemoveDivision = async (divisionId: string) => {
        const toastId = toast.loading("Deleting")
        try {
            const res = await deleteDivision(divisionId).unwrap()
            console.log(res)
            if (res.success) {
                toast.success("Removed Successfully", { id: toastId })
            }
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="p-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Tours</CardTitle>

                    <AddDivision></AddDivision>
                </CardHeader>

                <CardContent>
                    {isLoading ? (
                        <p className="text-sm text-muted-foreground">Loading...</p>
                    ) : divisions.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            No tours found.
                        </p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead></TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Created At</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {divisions.map((division: any, index: number) => (
                                    <TableRow key={division._id}>
                                        <TableCell>{index + 1}</TableCell>


                                        <TableCell>
                                            <Avatar className="h-10 w-10 rounded-md">
                                                <AvatarImage
                                                    src={division.thumnail}
                                                    alt={division.name}
                                                    className="object-cover"
                                                />
                                                <AvatarFallback className="rounded-md">
                                                    {division.title?.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </TableCell>


                                        <TableCell className="font-medium">
                                            {division.name}
                                        </TableCell>

                                        <TableCell>
                                            {division.description}
                                        </TableCell>


                                        <TableCell>
                                            {new Date(division.createdAt).toLocaleDateString()}
                                        </TableCell>


                                   
                                        <TableCell className="">
                                            <DeleteConfirmation onConfirm={() => handleRemoveDivision(division._id)}>
                                                <Button size='sm'> <Trash></Trash></Button>
                                            </DeleteConfirmation>
                                        </TableCell>
                                        <TableCell className="">
                                            <Button> <Edit></Edit></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default DivisionTable;
