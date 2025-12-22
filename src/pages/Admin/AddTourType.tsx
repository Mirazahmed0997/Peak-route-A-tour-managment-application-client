import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Edit, Trash } from "lucide-react";

import {
  useTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import AddTourTypeModal from "@/components/modules/Admin/TourType/AddTourTypeModal";

const AddTourType = () => {
  const { data, isLoading } = useTourTypesQuery(undefined);
  console.log(data)
  const tourTypes = data ?? [];
 

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tour Types</CardTitle>

          {/* Add Tour Type Button */}
          <AddTourTypeModal/>
         
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : tourTypes.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No tour types found.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Type Name</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {tourTypes.map((item: any, index: number) => (
                  <TableRow key={item._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {item.name}
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

export default AddTourType;
