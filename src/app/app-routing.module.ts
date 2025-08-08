import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'contatos',
    loadChildren: () => import('./contatos/contatos.module').then(m => m.ContatosPageModule)
  },
  {
    path: 'amigos-chat',
    loadChildren: () => import('./amigos-chat/amigos-chat.module').then(m => m.AmigosChatPageModule)
  },
  {
    path: 'chat-box',
    loadChildren: () => import('./chat-box/chat-box.module').then(m => m.ChatBoxPageModule)
  },
  {
    path: 'register-user',
    loadChildren: () => import('./register-user/register-user.module').then( m => m.RegisterUserPageModule)
  },
  {
    path: 'allusers-chat',
    loadChildren: () => import('./allusers-chat/allusers-chat.module').then( m => m.AllusersChatPageModule)
  },
  {
    path: 'friends-chat',
    loadChildren: () => import('./friends-chat/friends-chat.module').then( m => m.FriendsChatPageModule)
  },
  {
    path: 'message-box',
    loadChildren: () => import('./message-box/message-box.module').then( m => m.MessageBoxPageModule)
  },
  {
    path: 'scroll-test',
    loadChildren: () => import('./scroll-test/scroll-test.module').then( m => m.ScrollTestPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
