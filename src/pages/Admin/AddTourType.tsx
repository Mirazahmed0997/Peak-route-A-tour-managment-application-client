import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
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
import { useState } from "react";

const AddTourType = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const { data, isLoading } = useTourTypesQuery({ page: currentPage, limit: limit });
  const tourTypes = data?.data ?? [];
  const [removeTourTypes] = useRemoveTourTypesMutation();

  const totalPage = data?.meta?.totalPage


  // console.log(currentPage)

  const handleReomveTourType = async (tourTypeId: string) => {
    const toastId = toast.loading("Deleting")
    try {
      const res = await removeTourTypes(tourTypeId).unwrap()
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

                      <DeleteConfirmation onConfirm={() => handleReomveTourType(item._id)}>
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

      <div className="flex justify-end">
        <div>
          {
            totalPage>1 &&
            <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-20" : "pointer-events-auto"}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (currentPage < (data?.meta?.totalPage || 1)) {
                      setCurrentPage((prev) => prev + 1);
                    }
                  }}
                  className={
                    currentPage >= (data?.meta?.totalPage || 1)
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                  aria-disabled={currentPage >= (data?.meta?.totalPage || 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          }
        </div>
      </div>
    </div>
  );
};

export default AddTourType;
