import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class UserIdService {
    private  userId = '';

    getUserId() {
        return this.userId;
    }

    setUserId(userId: string) {
        this.userId = userId;
    }
}