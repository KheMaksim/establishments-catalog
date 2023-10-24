import IPicture from "./IPicture";
import IReview from "./IReview";

export interface IEstablishment {
    id: number;
    name: string;
    description: string;
    image: string;
    overallRate: number;
    avgFoodRate: number;
    avgInteriorRate: number;
    avgServiceRate: number;
    picturesQty: number;
    reviewsQty: number;
    reviews: IReview[];
    pictures: IPicture[];
}
