import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class SocketService {

    constructor(private socket: Socket) { }

    async joinSocket(nickName: any) {
        const userConected = await this.socket.connect();
        return userConected
    }

    async udateLastMsgCards(messageForNoticeUpdateLastMessage: any) {
        return await this.socket.emit('update-lastMsg', messageForNoticeUpdateLastMessage)
    }

    async msgWhenUserConect(nickName: any) {
        await this.socket.emit('joinSocketConection', nickName);
    }

    async desconectSocket() {
        return await this.socket.disconnect();
    }

    async removeAllListenrs() {
        return await this.socket.removeAllListeners()
    }

    async sendMessage(newMessage: any) {
        return await this.socket.emit('private-message', newMessage)
    }

    async createPrivateRoom(chatId: number) {
        return await this.socket.emit('create-private-room', chatId);
    }

    async statusDigitando(message: any) {
        return await this.socket.emit('addStatus-digitando', message)
    }

    async noticeLastMsgReadCards(message: any) {
        return await this.socket.emit('lastMsgReadCards', message)
    }

    async messageForNoticeAllMessagesReads(messageForNoticeAllMessagesReads: any) {
        console.log('messageForNoticeAllMessagesReads')
        return await this.socket.emit('msgRead', messageForNoticeAllMessagesReads)
    }



}