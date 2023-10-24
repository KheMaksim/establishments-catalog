import { Establishment } from '@/entities/establishment.entity';

const calculateAvg = (establishment: Establishment) => {
    establishment.avgFoodRate = Number(
        (establishment.reviews.reduce((total, item) => total + item.foodRate, 0) / establishment.reviews.length).toFixed(1),
    );

    establishment.avgServiceRate = Number(
        (establishment.reviews.reduce((total, item) => total + item.serviceRate, 0) / establishment.reviews.length).toFixed(1),
    );

    establishment.avgInteriorRate = Number(
        (establishment.reviews.reduce((total, item) => total + item.interiorRate, 0) / establishment.reviews.length).toFixed(1),
    );

    establishment.overallRate = Number(((establishment.avgFoodRate + establishment.avgServiceRate + establishment.avgInteriorRate) / 3).toFixed(1));
    return establishment;
};
export default calculateAvg;
