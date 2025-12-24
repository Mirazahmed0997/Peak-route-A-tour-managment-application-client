
import TourCard from "./TourCard";
import { useToursQuery } from "@/redux/features/tour/tour.api";




const AllTours = () => {

    const { data: tours } = useToursQuery(undefined)

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-2">
            {tours?.map((tour: any) => (
                <TourCard key={tour._id} tour={tour} />
            ))}
        </div>

    );
};

export default AllTours;
