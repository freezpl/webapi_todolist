import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', loadChildren: './modules/tasks/home.module#HomeModule', canActivate:[AuthGuard]},
  {path: 'account', loadChildren: './modules/account/account.module#AccountModule'},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// const appRoutes: Routes = [

//   //Site routes goes here 
//   { 
//       path: '', 
//       component: SiteLayoutComponent,
//       children: [
//         { path: '', component: HomeComponent, pathMatch: 'full'},
//         { path: 'about', component: AboutComponent }
//       ]
//   },

//   // App routes goes here here
//   { 
//       
//       component: AppLayoutComponent, 
//       children: [
//         { path: 'dashboard', component: DashboardComponent },
//         { path: 'profile', component: ProfileComponent }
//       ]
//   },

//   //no layout routes
//   { path: 'login', component: LoginComponent},
//   { path: 'register', component: RegisterComponent },
//   // otherwise redirect to home
//   { path: '**', redirectTo: '' }
// ];

// export const routing = RouterModule.forRoot(appRoutes);