import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-allusers-chat',
  templateUrl: './allusers-chat.page.html',
  styleUrls: ['./allusers-chat.page.scss'],
})
export class AllusersChatPage implements OnInit {

  users: any[]
  userLogado: any

  constructor(
    private router: Router,
    private userService: UserService,
    private chatService: ChatService,
  ) { }

  async ngOnInit() {
    this.userLogado = localStorage.getItem('user')
    this.userLogado = JSON.parse(this.userLogado)
    await this.getAllUsers()
  }

  async getAllUsers() {
    console.log('123444')
    await this.userService.getAllUsers().then(r => {
      let allUserReceives: any[] = r.data
      this.users = allUserReceives.filter(r => r.id !== this.userLogado.id)
    })
  }


  async createChatContact(userFriend: any) {
    this.chatService.createChat(this.userLogado.id, userFriend).then(async r => {
      await this.router.navigate(['/friends-chat'])
    })
  }

}
