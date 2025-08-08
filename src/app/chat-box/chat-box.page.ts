import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { IonContent, ToastController } from '@ionic/angular';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.page.html',
  styleUrls: ['./chat-box.page.scss'],
})

export class ChatRoomPage implements OnInit, OnDestroy {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(Scroll) scroll: Scroll;

  messages: any[] = [];
  nickname = '';
  message: any = '';
  chat: any
  userLogado: any
  digitando: string = ''

  statusDigitando: any = ''
  chatIdStatusDigitando: any = ''
  sendMessageStatus: boolean = false

  msgHourFormated: string = ''

  statusConectedFriends: string = ''

  boxScreen: boolean = false

  arr: any[] = [];


  constructor(private activedRoute: ActivatedRoute,
    private router: Router,
    private socket: Socket,
    private toastCtrl: ToastController,
    private messageService: MessageService,
    private userService: UserService,
  ) {
    this.activedRoute.queryParams.subscribe(() => {
      this.chat = this.router.getCurrentNavigation()?.extras.state?.['chat']
      this.userLogado = this.router.getCurrentNavigation()?.extras.state?.['userLogado']
      this.nickname = this.userLogado.name
    });
  }

  ngOnInit() {
    this.listenMsg()
    this.listenUserLeftOrJoinRoom()
    this.getMessagesByChatId()
  }

  ionViewDidEnter() {
    this.joinChat()
    this.listenStatus()
    this.getStatusOnlineOfFriend()
    this.thisUpdateStatusConectedMyFriend()
    this.listenMsgRead()
    this.socket.connect()

    console.log(this.content, 'ion content')
  }

  async getMessagesByChatId() {
    await this.messageService.getAllMessageByChatId(this.chat.chatId).then(async r => {

      this.messages = r.data

      this.ScrollToBottom()


      this.messages.forEach(async msg => {

        //for await (const msg of this.messages) {

        if (msg.author !== this.userLogado.name && msg.read === false) {

          let msgUpdateRead = {
            read: true
          }
          await this.messageService.updateMessage(msg.id, msgUpdateRead)
        }
        //}
      })

      await this.socket.emit('lastMsgReadCards', { author: this.userLogado.name, boxScreen: this.boxScreen })

      this.ScrollToBottom()

    })
  }

  joinChat() {
    const a = this.socket.connect();
    const b = this.socket.emit('set-nickname', this.chat.chatId);
    console.log(a, 1, b, 2)
  }

  ScrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom()
    }, 20);
  }


  listenMsg(): any {
    const a = this.socket.on('message', async (message: any) => {
      console.log(message, 'message')
      this.messages.push(message)

      //this.getMessagesByChatId(message.author)

      setTimeout(() => {

        this.statusDigitando = ''
        this.chatIdStatusDigitando = ''

        console.log('secrolll')
        this.content.scrollToBottom();

      }, 50);

      if (!this.boxScreen) {
        return
      }

      if (message.author !== this.userLogado.name) {

        let msgUpdateRead = {
          read: true
        }

        const updateReadMsg = await this.messageService.updateMessage(message.msgId, msgUpdateRead)

        if (updateReadMsg) {
          this.socket.emit('msgRead', { author: this.userLogado.name, boxScreen: this.boxScreen, chat: this.chat.chatId })
        }
      }
    })
  }

  listenMsgRead() {
    console.log('msg lidas')
    const a = this.socket.on('msgReadListen', async (message: any) => {
      if (message.boxScreen === true) {
        if (message.author !== this.userLogado.name) {
          this.getMessagesByChatId()
        }
      }
    })
  }

  listenUserLeftOrJoinRoom() {
    this.socket.on('users-changed', (data: any) => {
      this.getStatusOnlineOfFriend()
      console.log(2, data, 'recebe')
      const user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }

  thisUpdateStatusConectedMyFriend() {
    console.log('a')
    this.socket.on('users-changed', async (data: any) => {
      await this.getStatusOnlineOfFriend()
      console.log(data, 111)
    })

    this.socket.on('roomCreated', async (data: any) => {
      await this.getStatusOnlineOfFriend()
      console.log(data, 111)
    })
  }

  sendMessage() {
    const msgHour = this.formatHourMgs()

    if (msgHour) {
      console.log(this.msgHourFormated)
      this.socket.emit('add-message', { text: this.message, author: this.userLogado.name, chatId: this.chat.chatId, msgHour: this.msgHourFormated })
      this.socket.emit('update-lastMsg', { text: this.message, author: this.userLogado.name, chatId: this.chat.chatId, msgHour: this.msgHourFormated })
      this.message = '';
    }
  }

  async showToast(msg: any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ngOnDestroy() {
    console.log('sai')
    this.socket.disconnect();
    this.boxScreen = false
  }


  buscaCep() {
    console.log('00099998887777', this.digitando)
    //(ionChange)="buscaCep()" [(ngModel)]="digitando" //=> colocar no input html

    if (this.digitando.length > 0) {
      this.socket.emit('addStatus-digitando', { text: this.message, author: this.userLogado.name, chatId: this.chat.chatId })

      console.log('addStatus-digitando', this.digitando)
      this.digitando = 'digitando'
    }
  }


  listenStatus(): any {
    this.socket.on('getStatus-digitando', (message: any) => {

      if (this.sendMessageStatus) {
        console.log('sendMessageStatus')
        return
      }

      this.statusDigitando = 'digitando...'
      this.chatIdStatusDigitando = message.chatId,

        console.log(this.statusDigitando, 'getStatus-digitando')

      setTimeout(() => {
        this.statusDigitando = ''
        this.chatIdStatusDigitando = '',

          console.log(this.statusDigitando, message, 'getStatus-digitando')
      }, 5000)
    })
  }

  formatHourMgs() {
    let hora = new Date(Date.now()).getHours().toString().padStart(2, '0')
    let min = new Date().getMinutes().toString().padStart(2, '0')

    let formatHour = `${hora}:${min}`

    this.msgHourFormated = formatHour

    console.log(hora, 'hora', new Date(Date.now()))

    return true
  }


  async getStatusOnlineOfFriend() {
    console.log(this.chat.chatWith, 111)
    await (await this.userService.getUserById(this.chat.chatWith)).subscribe((r: any) => {
      console.log(r, 111)
      this.statusConectedFriends = r.statusConected
    })
  }

}
