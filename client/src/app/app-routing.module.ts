import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostRealityComponent } from './pages/post_reality_editor/post-reality.component';
//import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UserLoginComponent } from './ui/user-login/user-login.component';
//import { ItemsListComponent } from './items/items-list/items-list.component';

import { AuthGuard } from './core/auth.guard';
import { CoreModule } from './core/core.module';
import { FiledragdropComponent } from './dragdrop/dragdrop/dragdrop.component';


const appRoutes: Routes = [
  
  //{ path: 'items', component: ItemsListComponent, canActivate: [AuthGuard] },
  { path: 'uploads', loadChildren: './uploads/shared/upload.module#UploadModule', canActivate: [AuthGuard] },

  {
    path: 'editor',
    component: PostRealityComponent,
    canActivate: [AuthGuard], // remove this when actively developing.
    data: { title: 'dummy title' }
  },
  {
    path:'dragdrop', component: FiledragdropComponent, canActivate:[AuthGuard]
  },
  { path: 'login', component: UserLoginComponent },
  //{ path: '**', component: PageNotFoundComponnt }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})
export class AppRoutingModule { }
