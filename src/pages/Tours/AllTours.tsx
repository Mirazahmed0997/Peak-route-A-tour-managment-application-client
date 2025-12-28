import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

import { useToursQuery } from "@/redux/features/tour/tour.api";
import TourCard from "./TourCard";
import TourFilter from "./TourFilter";
import { useSearchParams } from "react-router";
import { useState } from "react";



const AllTours = () => {



    const [searchParams] = useSearchParams()
    const tourType = searchParams.get("tourType") || undefined
    const division = searchParams.get("division") || undefined

    const [currentPage, setCurrentPage] = useState(1)
    // const [limit, setLimit] = useState(6)

    const { data } = useToursQuery({ limit: 10, page: currentPage,tourType,division });
    const tours = data?.data ?? [];

    const totalPage = data?.meta?.totalPage






    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            {/* Filtering Bar */}
            <TourFilter></TourFilter>


            {/* Tours Grid */}
            {tours && tours.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {tours.map((tour: any) => (
                        <TourCard key={tour._id} tour={tour} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">No tours available at the moment.</p>
                </div>
            )}

            <div className="flex justify-end">
                <div>
                    {
                        totalPage > 1 &&
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

export default AllTours;


// import { useToursQuery } from "@/redux/features/tour/tour.api";
// import TourCard from "./TourCard";
// import TourFilter from "./TourFilter";
// import { useSearchParams } from "react-router";



// const AllTours = () => {



//     const[searchParams]=useSearchParams()

   

//     const { data: toursData } = useToursQuery({division,tourType});
//     const tours = toursData?.data || [];

  




//     return (
//         <div className="container mx-auto py-8 px-4 max-w-7xl">
//             {/* Filtering Bar */}
//             <TourFilter></TourFilter>
         

//             {/* Tours Grid */}
//             {tours && tours.length > 0 ? (
//                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
//                     {tours.map((tour: any) => (
//                         <TourCard key={tour._id} tour={tour} />
//                     ))}
//                 </div>
//             ) : (
//                 <div className="text-center py-16">
//                     <p className="text-gray-500 text-lg">No tours available at the moment.</p>
//                 </div>
//             )}
//         </div>

//     );
// };

// export default AllTours;
