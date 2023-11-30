import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthFeature } from "../../auth/state";
import { HttpClient } from "@angular/common/http";
import { UserIncident } from "./types";




@Injectable({
  providedIn: 'root'
})
export class UserIncidentService {
  store = inject(Store);
  


  createUserIncident( ) {
    return this.client.post<UserIncident>(`/api/users/incidents`, {  });
  }
  constructor(private readonly client: HttpClient) {}
}
