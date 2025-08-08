import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
import { ObservableTest } from '../services/observableTest.service';


@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.page.html',
  styleUrls: ['./contatos.page.scss'],
})
export class ContatosPage implements OnInit {
  userLogado: any
  users: any[]

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
    console.log('aaaa', this.userLogado.id, userFriend)
    this.chatService.createChat(this.userLogado.id, userFriend).then(async r => {
      console.log(r.data, 'aaaa', this.userLogado.id, userFriend)
      await this.router.navigate(['/amigos-chat'])
    })
  }

  // observableTest() {
  //   let a = 'a'
  //   console.log(a)
  //   this.observable.push(a)
  // }

  // getObservable() {
  //   let observable = new Observable((observer) => {
  //     console.log(observer, 'aaaa')
  //     observer.next(this.observable)
  //   })
  //   return observable;
  // }

  // async observableTest() {
  //   await (await this.observableTestService.createObservableTest({ author: 'a' })).subscribe(r => {
  //     console.log(r, "a")
  //     this.observable.push(r)
  //   }
  //   )
  // }

  // async getObservable() {
  //   const a = this.observableTestService.getObservableTest().then(async r => {

  //     for await (const a of r.data) {
  //       this.observable.push(a)
  //     }

  //   })
  // }



}
