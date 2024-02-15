import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { CreateEventComponent } from './Pages/create-event/create-event.component';
import { EditEventComponent } from './Pages/edit-event/edit-event.component';
import { EventDetailsComponent } from './Pages/event-details/event-details.component';
import { GetAllEventComponent } from './Pages/get-all-event/get-all-event.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { UserDashboardComponent } from './User/user-dashboard/user-dashboard.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        children: [
          {path:'getallevent',component:GetAllEventComponent},
          {path:'eventdetails',component:EventDetailsComponent},
          {path:'addevent',component:CreateEventComponent},
          {path:'editevent/:rid',component:EditEventComponent}
    
        ],
      },
      {
        path: 'user-dashboard',
        component: UserDashboardComponent,
        children: [
          {path:'getallevent',component:GetAllEventComponent},
          {path:'eventdetails',component:EventDetailsComponent},
         
    
        ],
      },
];
