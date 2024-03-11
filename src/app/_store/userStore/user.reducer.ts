import { createReducer, on } from "@ngrx/store";
import { userSignUpData } from "src/app/_interfaces/userCredentialsData";
import { updateUserData } from "./user.actions";



export let initialState!:userSignUpData[];

export const userReducer = createReducer(
    initialState, 
    on(updateUserData, (state,action)=>state = action.newData)
    )