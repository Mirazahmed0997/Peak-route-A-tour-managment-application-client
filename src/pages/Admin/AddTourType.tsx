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
  useRemoveTourTypesMutation,
  useTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import AddTourTypeModal from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { toast } from "sonner";

const AddTourType = () => {
  const { data, isLoading } = useTourTypesQuery(undefined);
  console.log(data)
  const tourTypes = data ?? [];
  const [removeTourTypes]=useRemoveTourTypesMutation();

  const handleReomveTourType = async(tourTypeId : string)=>
    {
      const toastId= toast.loading("Deleting")
      try {
        const res= await removeTourTypes(tourTypeId).unwrap()
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
          <CardTitle>Tour Types</CardTitle>

          {/* Add Tour Type Button */}
          <AddTourTypeModal />

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
                  <TableHead></TableHead>
                  <TableHead></TableHead>
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

                      <DeleteConfirmation onConfirm={()=>handleReomveTourType(item._id)}>
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

export default AddTourType;
