import { IUser } from "./IUser";

export default interface IReview {
    id: number;
    text: string;
    datetime: string;
    serviceRate: number;
    interiorRate: number;
    foodRate: number;
    establishmentId: number;
    user: IUser;
}
