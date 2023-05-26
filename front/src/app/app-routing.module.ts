import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./pages/product-list/product-list.module').then( m => m.ProductListPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'sale',
    loadChildren: () => import('./pages/sale/sale.module').then( m => m.SalePageModule)
  },
  {
    path: 'sale-list',
    loadChildren: () => import('./pages/sale-list/sale-list.module').then( m => m.SaleListPageModule)
  },
  {
    path: 'inventary',
    loadChildren: () => import('./pages/inventary/inventary.module').then( m => m.InventaryPageModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./pages/client/client.module').then( m => m.ClientPageModule)
  },
  {
    path: 'client-list',
    loadChildren: () => import('./pages/client-list/client-list.module').then( m => m.ClientListPageModule)
  },
  {
    path: 'sale-show',
    loadChildren: () => import('./pages/sale-show/sale-show.module').then( m => m.SaleShowPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
