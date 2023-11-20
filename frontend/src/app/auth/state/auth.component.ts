import { Component, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { authFeature } from ".";
import { AuthCommands } from "./actions";

@Component({
  selector: 'app-auth',
  standalone: true,
  template: `
  <div>
  <button (click)="logout()" class="btn btn-warning">Log out {{ user() }}</button>
</div>`,
})
export class AuthComponent implements OnInit {
  private readonly store = inject(Store);
  isAuthenticated = this.store.selectSignal(authFeature.selectIsAuthenticated);
  user = this.store.selectSignal(authFeature.selectSub);

  ngOnInit(): void {
    if (this.isAuthenticated() === false) {
      this.store.dispatch(AuthCommands.checkAuth());
    }
  }

  logout() {
    this.store.dispatch(AuthCommands.logOut());
  }
}