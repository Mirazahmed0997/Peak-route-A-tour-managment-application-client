import { Link, useParams } from "react-router";
import { MapPin, Users, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToursQuery } from "@/redux/features/tour/tour.api";

/**
 * Replace this with your API hook
 * ex: useGetSingleTourQuery(id)
 */
// const useTour = (id) => {
//   // MOCK DATA (remove when API is connected)
//   return {
//     data: {
//       _id: id,
//       title: "Cox's Bazar Sea Tour",
//       description:
//         "Enjoy a wonderful sea tour with comfortable hotels, amazing food, and guided sightseeing.",
//       images: [
//         "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
//       ],
//       location: "Cox's Bazar",
//       costFrom: 250,
//       startDate: "2025-01-15",
//       endDate: "2025-01-18",
//       maxGuest: 12,
//       amenities: ["Hotel", "Guide", "Breakfast"],
//       included: ["Transport", "Meals", "Sightseeing"],
//       exCluded: ["Personal expenses", "Extra activities"],
//       tourPlan: [
//         "Day 1: Arrival & hotel check-in",
//         "Day 2: Beach & sightseeing",
//         "Day 3: Shopping & return",
//       ],
//     },
//     isLoading: false,
//   };
// };

const TourDetails = () => {
  const { id } = useParams();
  console.log(id)
  const { data, isLoading } = useToursQuery({ _id: id });

  const tour = data?.[0]

  if (isLoading) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Loading tour details...
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

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Image */}
      <Card className="overflow-hidden">
        <img
          src={tour.images?.[0]}
          alt={tour.title}
          className="w-full h-[420px] object-cover"
        />
      </Card>

      {/* Title & Price */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">{tour.title}</h1>

        {tour.costFrom && (
          <span className="rounded-full bg-primary px-5 py-2 text-lg font-semibold text-black">
            From ${tour.costFrom}
          </span>
        )}

        {/* CTA */}
        <Link to={`/booking/${tour._id}`}>
          <div className="flex justify-end">
            <Button size="lg">Book Now</Button>
          </div>
        </Link>
      </div>


      {/* Info */}
      <div className="flex flex-wrap gap-6 text-muted-foreground">
        {tour.location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {tour.location}
          </div>
        )}

        {tour.startDate && tour.endDate && (
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {new Date(tour.startDate).toLocaleDateString()} -{" "}
            {new Date(tour.endDate).toLocaleDateString()}
          </div>
        )}

        {tour.maxGuest && (
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Max {tour.maxGuest} Guests
          </div>
        )}
      </div>

      {/* Description */}
      {tour.description && (
        <Card>
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">About this tour</h2>
            <p className="text-muted-foreground leading-relaxed">
              {tour.description}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Included / Excluded */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Included */}
        <Card>
          <CardContent className="p-6 space-y-3">
            <h3 className="text-lg font-semibold">What’s Included</h3>
            <ul className="space-y-2">
              {tour.included?.map((item: any, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Excluded */}
        <Card>
          <CardContent className="p-6 space-y-3">
            <h3 className="text-lg font-semibold">What’s Excluded</h3>
            <ul className="space-y-2">
              {tour.exCluded?.map((item: any, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Tour Plan */}
      {tour.tourPlan?.length > 0 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">Tour Plan</h3>
            <ol className="space-y-2 list-decimal list-inside">
              {tour.tourPlan.map((plan: any, index: number) => (
                <li key={index} className="text-muted-foreground">
                  {plan}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}

      {/* CTA */}
      {/* <Link to={`/booking/${tour._id}`}>
        <div className="flex justify-end">
          <Button size="lg">Book Now</Button>
        </div>
      </Link> */}
    </div>
  );
};

export default TourDetails;
