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
import { useRemoveTourMutation, useToursQuery } from "@/redux/features/tour/tour.api";
import { Edit, Trash } from "lucide-react";
import AddTourModal from "@/components/modules/Admin/Tour/AddTourModal";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { toast } from "sonner";

const ToursTable = () => {
  const { data: tours = [], isLoading } = useToursQuery(undefined);

  const[removeTour]= useRemoveTourMutation()



  const handleRemoveTour= async(tourId : string)=>
    {
      const toastId= toast.loading("Deleting")
      try {
        const res= await removeTour(tourId).unwrap()
        console.log(res)
        if(res.success)
          {
            toast.success("Removed Successfully",{id: toastId})
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

          <AddTourModal></AddTourModal>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : tours.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No tours found.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead></TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Cost From</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Max Guests</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {tours.map((tour: any, index: number) => (
                  <TableRow key={tour._id}>
                    <TableCell>{index + 1}</TableCell>


                    <TableCell>
                      <Avatar className="h-10 w-10 rounded-md">
                        <AvatarImage
                          src={tour.images?.[0]}
                          alt={tour.title}
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-md">
                          {tour.title?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>


                    <TableCell className="font-medium">
                      {tour.title}
                    </TableCell>

                    <TableCell>
                      {tour.location ?? "—"}
                    </TableCell>

                    <TableCell>
                      {tour.costFrom ? `$${tour.costFrom}` : "—"}
                    </TableCell>

                    <TableCell>
                      {tour.startDate && tour.endDate
                        ? `${new Date(tour.startDate).toLocaleDateString()} - ${new Date(
                          tour.endDate
                        ).toLocaleDateString()}`
                        : "—"}
                    </TableCell>

                    <TableCell>
                      {tour.maxGuest ?? "—"}
                    </TableCell>
                    <TableCell className="">
                      <DeleteConfirmation onConfirm={()=>handleRemoveTour(tour._id)}>
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

export default ToursTable;
