import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginPageModule),
  },

  {
    path: 'registro',
    loadChildren: () =>
      import('./components/registro/registro.module').then(
        (m) => m.RegistroPageModule
      ),
  },
  
  {
    path: 'menu',
    loadChildren: () => import('./components/menu/menu.module').then( m => m.MenuPageModule)
  },

  {
    path: 'liquidations',
    loadChildren: () => import('./components/liquidations/liquidations.module').then
    ( m => m.LiquidationsPageModule),
  },
  
  {
    path: 'products',
    loadChildren: () => import('./components/products/products.module').then( m => m.ProductsPageModule)
  },

  {
    path: 'add-products',
    loadChildren: () => import('./components/add-products/add-products.module').then( m => m.AddProductsPageModule)
  },
  {
    path: 'product-detail/:id',
    loadChildren: () => import('./components/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
