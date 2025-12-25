import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Badge } from "@/components/ui/badge";
  import { useUserBookingsQuery } from "@/redux/features/booking/booking.api";
  import { format } from "date-fns"; // Make sure date-fns is installed
  
  const BookingTable = () => {
    const { data: bookingData, isLoading, isError } = useUserBookingsQuery(undefined);
  
    if (isLoading) {
      return <div className="text-center py-8">Loading bookings...</div>;
    }
  
    if (isError || !bookingData?.length) {
      return <div className="text-center py-8">No bookings found.</div>;
    }
  
    const bookings = bookingData;
  
    return (
      <div className="rounded-md border">
        <Table>
          <TableCaption>Your recent bookings</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tour Title</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Booking Status</TableHead>
              <TableHead>Payment Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking: any) => (
              <TableRow key={booking._id}>
                <TableCell className="font-medium">
                  {booking.tour?.title || "N/A"}
                </TableCell>
                <TableCell>{booking.user?.name || "N/A"}</TableCell>
                <TableCell>{booking.user?.email || "N/A"}</TableCell>
                <TableCell>{booking.user?.phone || "N/A"}</TableCell>
                <TableCell>{booking.guestCount}</TableCell>
                <TableCell>৳{booking.payment?.amount?.toLocaleString()}</TableCell>
                <TableCell>
                  {format(new Date(booking.createdAt), "dd MMM yyyy, hh:mm a")}
                </TableCell>
                <TableCell>
                  <Badge variant={booking.status === "PENDING" ? "secondary" : "default"}>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      booking.payment?.status === "UNPAID"
                        ? "destructive"
                        : booking.payment?.status === "PAID"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {booking.payment?.status || "N/A"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default BookingTable;