import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonGrid, IonList, IonRow } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { MessageService } from '../services/message.service';
import { SocketService } from '../services/socket.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.page.html',
  styleUrls: ['./message-box.page.scss'],
})
export class MessageBoxPage implements OnInit, OnDestroy {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonGrid, { read: ElementRef }) listMsgs: ElementRef;
  @ViewChild(IonList, { read: ElementRef }) list: ElementRef;


  messages: any[] = [];
  chat: any
  userLogado: any
  nickname = '';

  msgHourFormated: string = ''
  messageFromInput: any

  statusConectedFriends: any = ''

  statusDigitando: any = ''
  chatIdStatusDigitando: any = ''
  sendMessageStatus: boolean = false
  digitando: string = ''

  boxScreen: boolean = true//
  updateReadMsg: boolean = false


  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private socketService: SocketService,
    private socket: Socket,
    private userService: UserService,
    private messageService: MessageService,
  ) {
    this.activedRoute.queryParams.subscribe(() => {
      this.chat = this.router.getCurrentNavigation()?.extras.state?.['chat']
      this.userLogado = this.router.getCurrentNavigation()?.extras.state?.['userLogado']
      this.nickname = this.userLogado.name
    });
  }

  ngOnInit() {
    this.getMessagesByChatId()
    this.privateChatcreateJoin()
  }

  ionViewDidEnter() {
    this.listenMsg()
    this.getStatusOnlineOfFriend()
    this.thisUpdateStatusConectedMyFriend()
    this.listenStatusDigitando()
    this.listenMsgsRead()
  }

  async getMessagesByChatId() {
    await this.messageService.getAllMessageByChatId(this.chat.chatId).then(async r => {

      this.messages = r.data

      this.ScrollToBottom()

      for await (const msg of this.messages) {//

        if (msg.author !== this.userLogado.name && msg.read === false) {//

          let msgUpdateRead = {//
            read: true
          }
          const updateReadMsg = await this.messageService.updateMessage(msg.id, msgUpdateRead)//

          this.updateReadMsg = true
        }
      }

      if (this.updateReadMsg) {

        let messageToLasAllMessagesReads =
        {
          author: this.userLogado.name,
          boxScreen: this.boxScreen,
          chatId: this.chat.chatId
        }

        await this.socketService.noticeLastMsgReadCards(messageToLasAllMessagesReads)



        let messageForNoticeAllMessagesReads = {
          author: this.userLogado.name,
          boxScreen: this.boxScreen
        }

        await this.socketService.messageForNoticeAllMessagesReads(messageForNoticeAllMessagesReads)

      }

      this.messages = this.messages.slice(-15)

      //this.ScrollToBottom()

    })
  }

  joinChat() {//
    const a = this.socket.connect();
    const b = this.socket.emit('joinSocketConection', this.chat.chatId);
    console.log(a, 1, b, 2)
  }

  thisUpdateStatusConectedMyFriend() {
    console.log('a')
    this.socket.on('users-changed', async (data: any) => {
      //console.log('saido amigo')
      this.getStatusOnlineOfFriend()
    })
  }

  async privateChatcreateJoin() {
    await this.socketService.joinSocket(this.chat.chatId)
    this.socketService.createPrivateRoom(this.chat.chatId);
  }

  sendMessage() {

    const msgHour = this.formatHourMgs()

    let message = {
      text: this.messageFromInput,
      author: this.userLogado.name,
      chatId: this.chat.chatId,
      msgHour: this.msgHourFormated,
      timestampDateCreateFrontMsg: new Date(Date.now()).getTime().toString()
    }

    console.log(message, 'front socket')

    if (msgHour) {
      this.socketService.sendMessage(message)

      let messageForNoticeUpdateLastMessage = {
        chatId: this.chat.chatId
      }
      this.socketService.udateLastMsgCards(messageForNoticeUpdateLastMessage)

      this.messages.push(message)

      this.messageFromInput = '';
    }

    this.ScrollToBottom()
  }

  formatHourMgs() {
    let hora = new Date(Date.now()).getHours().toString().padStart(2, '0')
    let min = new Date().getMinutes().toString().padStart(2, '0')

    let formatHour = `${hora}:${min}`

    this.msgHourFormated = formatHour

    console.log(hora, 'hora', new Date(Date.now()))

    return true
  }

  ScrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom()
    }, 20);
  }


  listenMsg(): any {
    this.socket.on('private-msg-emit', async (message: any) => {
      this.messages.push(message)

      setTimeout(() => {
        this.statusDigitando = ''
        this.chatIdStatusDigitando = ''
        this.sendMessageStatus = false

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

          let messageForNoticeAllMessagesReads = {
            author: this.userLogado.name,
            boxScreen: this.boxScreen
          }

          await this.socketService.messageForNoticeAllMessagesReads(messageForNoticeAllMessagesReads)
        }

      }
    })
  }

  async ngOnDestroy() {
    console.log('sai')
    await this.socketService.desconectSocket()
    this.boxScreen = false
  }


  async getStatusOnlineOfFriend() {
    await (await this.userService.getUserById(this.chat.chatWith)).subscribe((r: any) => {
      this.statusConectedFriends = r.statusConected
    })
  }

  async noticeDigitMessage() {

    if (this.digitando.length > 0) {

      let message = { author: this.userLogado.name, chatId: this.chat.chatId }

      await this.socketService.statusDigitando(message)

      this.digitando = 'digitando'
    }
  }


  async listenStatusDigitando() {
    await this.socket.on('getStatus-digitando', (message: any) => {

      if (this.sendMessageStatus) {
        return
      }

      this.sendMessageStatus = true
      this.statusDigitando = 'digitando...'
      this.chatIdStatusDigitando = message.chatId,

        setTimeout(() => {
          this.statusDigitando = ''
          this.chatIdStatusDigitando = '',
            this.sendMessageStatus = false

        }, 5000)
    })
  }


  async listenMsgsRead() {
    await this.socket.on('msgReadListen', async (message: any) => {

      setTimeout(async () => {
        if (message.boxScreen === true && this.boxScreen === true) {
          if (message.author !== this.userLogado.name) {
            await this.receiveMsgReadFriendInTheBox()
          }
        }
      }, 500)
    })
  }


  async receiveMsgReadFriendInTheBox() {
    await this.messageService.getAllMessageByChatId(this.chat.chatId).then(async r => {

      let newListMsgsChat: any[] = []

      newListMsgsChat = r.data.slice(-15)

      newListMsgsChat.forEach((msgNewList: any) => {
        this.messages.forEach(messageOldList => {
          if (
            messageOldList.timestampDateCreateFrontMsg === msgNewList.timestampDateCreateFrontMsg
            &&
            messageOldList.read !== msgNewList.read
          ) { messageOldList.read = true }
        })
      });

    })
  }

}
