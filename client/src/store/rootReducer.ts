import { combineReducers } from "@reduxjs/toolkit";
import { UserReducer } from "../features/user/UserSlice";
import { EstablishmentReducer } from "@/features/establishment/EstablishmentSlice";
import { ReviewReducer } from "@/features/review/ReviewSlice";
import { PictureReducer } from "@/features/picture/PictureSlice";

const rootReducer = combineReducers({
    establishment: EstablishmentReducer,
    picture: PictureReducer,
    review: ReviewReducer,
    user: UserReducer,
});

export default rootReducer;
