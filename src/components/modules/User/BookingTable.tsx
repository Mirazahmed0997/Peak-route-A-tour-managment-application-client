import { useUserBookingsQuery } from "@/redux/features/booking/booking.api";

const BookingTable = () => {

    const {data:bookingData}= useUserBookingsQuery(undefined)
    console.log("bookingData", bookingData)

    return (
        <div>
            
        </div>
    );
};

export default BookingTable;