export interface ITourProps {
    _id:string
    title: string;
    slug?: string;
    description?: string;

    images?: string[];

    location?: string;
    costFrom?: number;

    depurtureLocation?: string;
    arivalLocationl?: string;

    startDate?: Date;
    endDate?: Date;

    amenities?: string[];
    included?: string[];
    exCluded?: string[];
    tourPlan?: string[];

    maxGuest?: number;
    minAge?: number;

    division: string;
    tourType: string;
}