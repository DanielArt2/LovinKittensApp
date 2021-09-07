import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './usuario/pages/home/home.component';
import { OwnersComponent } from './usuario/pages/owners/owners.component';
import { SearchComponent } from './usuario/pages/search/search.component';
import { ProComponent } from './usuario/pages/pro/pro.component';

const routes:Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path:'owners',
        component: OwnersComponent
    },
    {
        path:'search',
        component:SearchComponent
    },
    {
        path:'search/:nombre',
        component:SearchComponent
    },
    {
        path:'pro',
        component:ProComponent
    },
    {
        path: '**',
        redirectTo:''
    }
]


@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{}