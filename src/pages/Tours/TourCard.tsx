import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Calendar } from "lucide-react";
import { Link } from "react-router";
import { ITourProps } from "@/types/Tour.interface";


export interface TourCardProps {
    tour: ITourProps;
}


const TourCard = ({ tour }: TourCardProps) => {
    return (
        <div>
            <Card className="group overflow-hidden rounded-xl border bg-background hover:shadow-lg transition">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                    <img
                        src={tour.images?.[0]}
                        alt={tour.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Price badge */}
                    {tour.costFrom && (
                        <span className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-black">
                            From ${tour.costFrom}
                        </span>
                    )}
                </div>

                <CardContent className="p-4 space-y-3">
                    {/* Title */}
                    <h3 className="text-lg font-semibold line-clamp-1">
                        {tour.title}
                    </h3>

                    {/* Location */}
                    {tour.location && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {tour.location}
                        </div>
                    )}

                    {/* Info row */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {tour.startDate && tour.endDate
                                ? `${new Date(tour.startDate).toLocaleDateString()} - ${new Date(
                                    tour.endDate
                                ).toLocaleDateString()}`
                                : "Flexible"}
                        </div>

                        {tour.maxGuest && (
                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {tour.maxGuest} Guests
                            </div>
                        )}
                    </div>

                    {/* CTA */}

                    <Link to={`/tour/${tour._id}`}>
                        <Button className="w-full mt-2">
                            View Details
                        </Button>
                    </Link>
                    

                </CardContent>
            </Card>
        </div >
    );
};

export default TourCard;