import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ChatsThatIAmJoinService } from '../services/ChatsThatIAmJoin.service';
import { MessageService } from '../services/message.service';
import { SocketService } from '../services/socket.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-friends-chat',
  templateUrl: './friends-chat.page.html',
  styleUrls: ['./friends-chat.page.scss'],
})
export class FriendsChatPage implements OnInit {

  constructor(
    private chatsThatIAmJoinService: ChatsThatIAmJoinService,
    private router: Router,
    private socketService: SocketService,
    private socket: Socket,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  chats: any[] = []
  userLogado: any

  dateFormated = ''

  sendMessageStatus: boolean = false
  statusDigitando: any = ''
  chatIdStatusDigitando: any = ''

  chatsClone: any[] = []
  firstEnterScreen: boolean = true

  ngOnInit() {
    this.userLogado = localStorage.getItem('user')
    this.userLogado = JSON.parse(this.userLogado)
    this.getAllMyChatsFriends()//add aki tirado do iondidview enter
  }


  async ionViewDidEnter() {
    this.conectChats()//add aki
    this.updateStatusConected('online')
    this.updateLastMsgCardChat()
    this.listenStatusDigitando()

    this.listenMsgRead()
  }


  async conectChats() {//add aki
    await this.chatsThatIAmJoinService.getAllMyChatsFriends(this.userLogado.id).then(async r => {
      let b: any[] = r.data.chatsThatIAmJoin
      this.chats = b
      await this.joinAllChatFrindsPrivates(b).then(a => console.log(a, 'all cards users conecteds'))

      await this.updateForBadgeChat(this.firstEnterScreen)
    })
  }


  async getAllMyChatsFriends(updateListChats?: boolean) {
    await this.chatsThatIAmJoinService.getAllMyChatsFriends(this.userLogado.id).then(async r => {

      this.chats = []

      let listChats: any[] = r.data.chatsThatIAmJoin

      const chatListReorderByLastDate = await this.orderByLastDateUpon(listChats)//2 linhas para ordenar cards//add uma funcao para ordenar etirado daki

      listChats = chatListReorderByLastDate//add o retorno da ordenacao na list chats

      listChats.forEach(r => {

        this.filterAndFormatDateLastMsg(r.lastMessageDate)

        r.dateForCardLastMessage = this.dateFormated

        this.chats.push(r)
      })
    })

    if (!updateListChats) {
      //await this.joinAllChatFrindsPrivates(this.chats) => tirei para chamar separao acima
      this.chatsClone = [...this.chats] //=> passando valor do chats que carregamos para um clone e renderizar o clone

      this.updateForBadgeChat()   //=> atualizando a qtd de msgs nao lidas pelo user logado e passando essa propriedade foi criada no backend sio para carrgar agoar aki sem salvar lah

      this.firstEnterScreen = false //passando false para esa property indicando que jah entrou uma vez na tela e agora nao eh mais 1 vez
    }

    console.log(this.chats, 'sss')
  }


  async updateForBadgeChat(firstEnterScreen?: boolean, chatId?: number) {// add aki se receber um chat id atualiza apenas um card os badges se nao atualzia a lista toda de cards
    console.log(firstEnterScreen, 'firstEnterScreen')
    if (firstEnterScreen === true) {//para nao entrar nesse metodo quando entrar na tela depois do login
      return
    }

    if (chatId) {//chama quando alguem enviar msg e estiver na tela de cards chama uma vez soh
      await this.chatsThatIAmJoinService.getAllMyChatsFriends(this.userLogado.id).then(async r => {
        let listChat: any[] = r.data.chatsThatIAmJoin

        const chat: any = listChat.filter(chat => chat.chatId === chatId)

        this.filterAndFormatDateLastMsg(chat[0].lastMessageDate)

        chat[0].dateForCardLastMessage = this.dateFormated

        const b = await this.getMessagesUnreadByChatId(chat[0].chatId)

        if (b) {
          chat[0].msgsUnreadQtd = b.qtdMsgsUnread

          this.chatsClone = this.chatsClone.filter(t => t.chatId !== chatId)

          this.chatsClone.push(chat[0])

          const chatListReorderByLastDate = await this.orderByLastDateUpon(this.chatsClone)

          this.chatsClone = chatListReorderByLastDate
        }

      })
    } else {//chama aki quando entra na tela e lista todos ochats no clone aki passamos a qtd de msgs nao lidas

      this.chatsClone.forEach(async cloneChat => {
        await this.chats.forEach(async (chat) => {
          const r = await this.getMessagesUnreadByChatId(chat.chatId).then(async (r: any) => {

            if (cloneChat.chatId === chat.chatId) {
              cloneChat.dateForCardLastMessage === chat.dateForCardLastMessage
              cloneChat.lastMessage = chat.lastMessage
              cloneChat.lastMessageDate = chat.lastMessageDate
              cloneChat.msgsUnreadQtd = r.qtdMsgsUnread
              cloneChat.lastMsgRead = chat.lastMsgRead
            }

            const chatListReorderByLastDate = await this.orderByLastDateUpon(this.chatsClone)

            this.chatsClone = chatListReorderByLastDate
          })
        })
      })
    }

  }


  async getMessagesUnreadByChatId(chatId: any) {//buscando na funcao feita no end poinnt que retorna o id e a qtd de msgs nao lidas de um usuario no caso o logado
    console.log('getMessagesUnreadByChatId')

    const objectWithQtd = await this.messageService.getMessagesUnreadByChatId(chatId, this.userLogado.name)

    return objectWithQtd.data
  }


  async joinAllChatFrindsPrivates(chatsList: any[]) {
    chatsList.forEach(async r => {
      const a = await this.socketService.joinSocket(r.chatId)
      const b = await this.socketService.createPrivateRoom(r.chatId);
      const c = await this.socketService.msgWhenUserConect(r.chatId)
    })
    return true
  }


  async filterAndFormatDateLastMsg(date: any) {

    //para formatacao de data formato brasil
    let data = new Date(date),
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
      ano = data.getFullYear();

    let dateFormatedBrasil = dia + "/" + mes + "/" + ano;

    let getMonthDayWeekOfDateFormated = new Date(date)

    //data atual reformatando, para comprar entra data e nao dias igual estava antes
    let a = new Date().toISOString();

    let dataCut = a.split('T').shift();

    const [day, month, year] = dataCut!.split('-');

    let now = [day, month, year].join('-');

    let b = new Date(date).toISOString();

    let dataCut2 = b.split('T').shift();

    const [day2, month2, year2] = dataCut2!.split('-');

    let dateReformated = [day2, month2, year2].join('-');

    const diffInMs = new Date(now).getTime() - new Date(dateReformated).getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    //console.log(diffInDays, 'diff')//diferenca de dias indica quantods dis de diferenaca entre uma data e outra

    if (new Date(date).getDate() === new Date(Date.now()).getDate()) {
      let hora = new Date(date).getHours().toString().padStart(2, '0')
      let min = new Date(date).getMinutes().toString().padStart(2, '0')

      this.dateFormated = `${hora}:${min}`

      return
    }

    else if (diffInDays === 1) {
      console.log('ontem')

      this.dateFormated = 'ontem'

      return
    }

    else if (diffInDays === 2) {

      this.dateFormated = getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' })

      return
    }

    else if (diffInDays === 3) {
      //console.log(getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' }))

      this.dateFormated = getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' })

      return
    }

    else if (diffInDays === 4) {
      //console.log(getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' }))

      this.dateFormated = getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' })

      return
    }

    else if (diffInDays === 5) {
      //console.log(getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' }))

      this.dateFormated = getMonthDayWeekOfDateFormated.toLocaleString('default', { weekday: 'long' })

      return
    }

    else if (diffInDays === 6) {
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


  async naviteToBox(chat: any) {
    this.socketService.desconectSocket()
    await this.router.navigate(['/message-box'], { state: { chat: chat, userLogado: this.userLogado } })
  }


  desconected() {
    console.log('sai')
    this.updateStatusConected('offline')
    this.socketService.desconectSocket()
    this.socketService.removeAllListenrs()
  }


  updateStatusConected(status: string) {
    let StatusConnected = {
      statusConected: status
    }
    this.userService.updateUserAxios(this.userLogado.id, StatusConnected)

    this.userLogado.statusConected = StatusConnected.statusConected

    if (status === 'online') {
      localStorage.setItem('user', JSON.stringify(this.userLogado));
    } else {
      localStorage.removeItem('user');
    }
  }


  async updateLastMsgCardChat() {

    this.socket.on('update-lastMsgChat', async (message: any) => {
      //console.log('update-lastMsgChat', message)
      this.sendMessageStatus = true
      this.firstEnterScreen = false

      setTimeout(async () => {
        await this.getAllMyChatsFriends(this.sendMessageStatus).then(async () => {//add o .then chamando a de upodate badge daki passo o chat id para apenas atualizar 1 card
          await this.updateForBadgeChat(this.firstEnterScreen, message.chatId)
        })
        this.statusDigitando = ''
        this.chatIdStatusDigitando = ''
        this.sendMessageStatus = false
      }, 1000)

    })
  }


  listenStatusDigitando(): any {
    this.socket.on('getStatus-digitando', (message: any) => {

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


  listenMsgRead() {
    this.socket.on('msgReadCards', async (message: any) => {
      //console.log(message, 'qqqqqqqq')
      let updateListChats = true
      this.getAllMyChatsFriends(updateListChats).then(async () => {//add o .then para atualizar  os badge  indicando que todas as msgs foram lidas
        await this.updateForBadgeChat(this.firstEnterScreen = false, message.chatId)
      })
    })
  }


  async orderByLastDateUpon(chatList: any) {//funcao para ordenar pela data mais recente em cima nos cards

    return await chatList.sort((a: any, b: any) => {//ordenando pela data a lista de chats

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
  }


}



