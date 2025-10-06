import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: '', component: LoginComponent
    }, {
        path: 'login', component: LoginComponent
    },
    {
        path: 'info', component: UserInfoComponent
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],  // ✅ only here
    exports: [RouterModule]
})
export class AppRoutingModule { }
