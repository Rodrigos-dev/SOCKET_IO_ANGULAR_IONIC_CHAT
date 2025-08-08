import { Component, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatsThatIAmJoinService } from '../services/ChatsThatIAmJoin.service';
import { UserService } from '../services/user.service';

import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-amigos-chat',
  templateUrl: './amigos-chat.page.html',
  styleUrls: ['./amigos-chat.page.scss'],
})
export class AmigosChatPage implements OnInit {
  chats: any[] = []
  dateFormated = ''
  userLogado: any

  statusDigitando: any = ''
  chatIdStatusDigitando: any = ''
  sendMessageStatus: boolean = false

  user: any = localStorage.getItem('user');

  constructor(
    private chatsThatIAmJoinService: ChatsThatIAmJoinService,
    private userService: UserService,
    private socket: Socket,
    private toastCtrl: ToastController,
    private router: Router) { }

  ngOnInit() {
    this.userLogado = localStorage.getItem('user')
    this.userLogado = JSON.parse(this.userLogado)

    this.socket.on('users-changed', (data: any) => {
      //console.log(2, data, 'recebe')
      const user = data['user'];
      if (data['event'] === 'left') {
        //console.log('User left: ' + user);
      } else {
        console.log('User joined: ' + user);
      }
    });
  }


  ionViewDidEnter() {
    this.getAllMyChatsFriends()
    this.listenStatus()
    this.updateLastMsgCardChat()
    this.updateStatusConected()
    this.listenMsgRead()
  }

  listenMsgRead() {
    this.socket.on('msgReadCards', async (message: any) => {
      this.getAllMyChatsFriends()
    })
  }


  async getAllMyChatsFriends(updateListChats?: boolean) {
    await this.chatsThatIAmJoinService.getAllMyChatsFriends(this.userLogado.id).then(r => {

      this.chats = []

      let listChats: any[] = r.data.chatsThatIAmJoin

      listChats.sort((a, b) => {//ordenando pela data a lista de chats

        if (a.lastMessageDate === undefined) {
          return -1;
        }
        if (b.lastMessageDate === undefined) {
          return -1;
        }
        if (a.lastMessageDate < b.lastMessageDate) {

          return 1;
        } else {
          return -1;
        }
      })

      listChats.forEach(r => {

        this.filterDateLastMsg(r.lastMessageDate)

        r.lastMessageDate = this.dateFormated

        this.chats.push(r)
      })

      if (!updateListChats) {
        this.joinChat(this.chats)
      }
    })
  }

  joinChat(chatsList: any[]) {
    chatsList.forEach(r => {
      const a = this.socket.connect();
      const b = this.socket.emit('set-nickname', r.chatId);
      const c = this.socket.emit('users-changed', r.chatId);
    })
  }

  async updateLastMsgCardChat() {
    console.log('aaaaa')
    this.socket.on('update-lastMsgChat', async (message: any) => {

      this.sendMessageStatus = true
      let updateListChats = true

      setTimeout(async () => {
        await this.getAllMyChatsFriends(updateListChats)
        this.sendMessageStatus = false
      }, 1000)

    })
  }

  listenStatus(): any {
    this.socket.on('getStatus-digitando', (message: any) => {

      if (this.sendMessageStatus) {
        return
      }

      this.statusDigitando = 'digitando...'
      this.chatIdStatusDigitando = message.chatId,

        //console.log(this.statusDigitando, 'getStatus-digitando')

        setTimeout(() => {
          this.statusDigitando = ''
          this.chatIdStatusDigitando = ''
        }, 5000)
    })
  }

  async naviteToBox(chat: any) {
    await this.router.navigate(['/chat-box'], { state: { chat: chat, userLogado: this.userLogado } })
  }


  desconected() {
    console.log('sai')

    let desconectStatus = {
      statusConected: 'offline'
    }

    this.userService.updateUser(this.userLogado.id, desconectStatus)

    this.userLogado.statusConected = desconectStatus.statusConected

    localStorage.setItem('user', JSON.stringify(this.userLogado));

    this.socket.disconnect();
    const b = this.socket.removeAllListeners()
  }


  async filterDateLastMsg(date: any) {
    let data = new Date(date),
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
      ano = data.getFullYear();
    //console.log(dia + "/" + mes + "/" + ano, 'formtdata')

    let dateFormatedBrasil = dia + "/" + mes + "/" + ano;

    let getMonthDayWeekOfDateFormated = new Date(date)

    if (new Date(date).getDate() === new Date(Date.now()).getDate()) {
      let hora = data.getHours().toString().padStart(2, '0')
      let min = data.getMinutes().toString().padStart(2, '0')

      //console.log(`${hora}:${min}`)

      this.dateFormated = `${hora}:${min}`

      return
    }

    else if (new Date(date).getDate() === new Date(Date.now()).getDate() - 1) {
      //console.log('ontem')

      this.dateFormated = 'ontem'

      return
    }

    else if (new Date(date).getDate() === new Date(Date.now()).getDate() - 2) {
      //console.log(getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' }))

      this.dateFormated = getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' })

      return
    }

    else if (new Date(date).getDate() === new Date(Date.now()).getDate() - 3) {
      //console.log(getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' }))

      this.dateFormated = getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' })

      return
    }

    else if (new Date(date).getDate() === new Date(Date.now()).getDate() - 4) {
      //console.log(getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' }))

      this.dateFormated = getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' })

      return
    }

    else if (new Date(date).getDate() === new Date(Date.now()).getDate() - 5) {
      //console.log(getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' }))

      this.dateFormated = getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' })

      return
    }

    else if (new Date(date).getDate() === new Date(Date.now()).getDate() - 6) {
      //console.log(getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' }))

      this.dateFormated = getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' })

      return
    }

    else {
      //console.log(dateFormatedBrasil);

      this.dateFormated = dateFormatedBrasil

      return
    }
  }


  updateStatusConected() {
    let StatusConnected = {
      statusConected: 'online'
    }
    this.userService.updateUser(this.userLogado.id, StatusConnected)

    this.userLogado.statusConected = StatusConnected.statusConected

    localStorage.setItem('user', JSON.stringify(this.userLogado));
  }

}
