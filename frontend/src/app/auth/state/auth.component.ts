import { Component, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { authFeature } from ".";
import { AuthCommands } from "./actions";

@Component({
  selector: 'app-auth',
  standalone: true,
  template: ``,
})
export class AuthComponent implements OnInit {
  private readonly store = inject(Store);
  isAuthenticated = this.store.selectSignal(authFeature.selectIsAuthenticated);

  ngOnInit(): void {
    if (this.isAuthenticated() === false) {
      this.store.dispatch(AuthCommands.checkAuth());
    }
  }
}