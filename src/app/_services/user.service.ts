import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { userSignUpData } from "../_interfaces/userCredentialsData";


@Injectable({
    providedIn:'root'
})
export class UserServices{

    //An observable to store UserID
    private userIdSubject = new BehaviorSubject<string>('');
    public userId$ = this.userIdSubject.asObservable();
    storeUserId(userId:string){
        this.userIdSubject.next(userId);
    }

    //An observable to store userInfo
    private userInfoSubject = new BehaviorSubject<userSignUpData[]>([]);
    public userInfo$ = this.userInfoSubject.asObservable();
    storeUserInfo(userInfo:userSignUpData[]){
        this.userInfoSubject.next(userInfo);
    }
}