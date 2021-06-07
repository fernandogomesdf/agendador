import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../publico/login/login.component";

export const routes: Routes = [
    { path: 'publico/login', component: LoginComponent },
];

export const routing = RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' });