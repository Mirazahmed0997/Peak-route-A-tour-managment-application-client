import { useState } from "react";
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Users, MapPin } from "lucide-react";
import { useToursQuery } from "@/redux/features/tour/tour.api";
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";
import { toast } from "sonner";
// import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";

const Bookings = () => {
    const { id } = useParams();
    const { data, isLoading } = useToursQuery({ _id: id });



    const tour = data?.data?.[0]
    // console.log(tour?._id)


    const [guestCount, setGuestCount] = useState(1);

    const [createBooking] =
        useCreateBookingMutation();

    if (isLoading) {
        return (
            <div className="p-6 text-center text-muted-foreground">
                Loading booking details...
            </div>
        );
    }

    if (!tour) {
        return (
            <div className="p-6 text-center text-red-500">
                Tour not found
            </div>
        );
    }

    const totalPrice = tour.costFrom
        ? tour.costFrom * guestCount
        : 0;


    const handleBooking = async () => {
        const toastId = toast.loading("Creating Booking")
        const payload = {
            tour: tour._id,
            guestCount,
        };

        console.log("Booking payload:", payload);
        try {
            const res=await createBooking(payload).unwrap();
            console.log(res)
            toast.success("Booking is suucessfully Complete", { id: toastId })
            window.open(res.data.paymentUrl)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-3 gap-6">
            {/* LEFT — TOUR INFO */}
            <div className="md:col-span-2 space-y-6">
                {/* Image */}
                <Card className="overflow-hidden">
                    <img
                        src={tour.images?.[0]}
                        alt={tour.title}
                        className="h-[400px] w-full object-cover"
                    />
                </Card>

                {/* Tour Info */}
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <h1 className="text-2xl font-bold">{tour.title}</h1>

                        {tour.location && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                {tour.location}
                            </div>
                        )}

                        {tour.startDate && tour.endDate && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                {new Date(tour.startDate).toLocaleDateString()} -{" "}
                                {new Date(tour.endDate).toLocaleDateString()}
                            </div>
                        )}

                        {tour.description && (
                            <p className="text-muted-foreground leading-relaxed">
                                {tour.description}
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* RIGHT — BOOKING SUMMARY */}
            <div className="space-y-6">
                <Card className="sticky top-24">
                    <CardHeader>
                        <CardTitle>Booking Summary</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {/* Price */}
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Price per guest</span>
                            <span className="font-semibold">
                                ${tour.costFrom}
                            </span>
                        </div>

                        {/* Guest Count */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Number of Guests
                            </label>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    min={1}
                                    max={tour.maxGuest}
                                    value={guestCount}
                                    onChange={(e) =>
                                        setGuestCount(Number(e.target.value))
                                    }
                                />
                            </div>
                            {tour.maxGuest && (
                                <p className="text-xs text-muted-foreground">
                                    Max {tour.maxGuest} guests allowed
                                </p>
                            )}
                        </div>

                        <hr className="border-border" />

                        {/* Total */}
                        <div className="flex items-center justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>${totalPrice}</span>
                        </div>

                        {/* CTA */}
                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleBooking}
                        >
                            Confirm Booking
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                            You won’t be charged yet
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Bookings;
