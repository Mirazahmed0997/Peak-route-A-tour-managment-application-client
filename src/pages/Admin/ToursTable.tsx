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
import { useToursQuery } from "@/redux/features/tour/tour.api";
import { Edit, Trash } from "lucide-react";
import AddTourModal from "@/components/modules/Admin/Tour/AddTourModal";

const ToursTable = () => {
  const { data: tours = [], isLoading } = useToursQuery(undefined);

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
                      <Button size='sm'> <Trash></Trash></Button>
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
