import { createAction, props } from "@ngrx/store";
import { userSignUpData } from "src/app/_interfaces/userCredentialsData";


export const updateUserData = createAction(
    'updateUserData', 
    props<{newData:userSignUpData[]}>()
    )