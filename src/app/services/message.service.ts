import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
//import { Observable } from 'rxjs-compat';

import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {

    url_Api: string = environment.urlBase

    constructor(private http: HttpClient) { }

    async getAllMessageByChatId(chatId: any) {

        return await axios
            .get(`${this.url_Api}/messages/${chatId}`)
    }



    async getMessagesUnreadByChatId(chatId: any, userLogadoName: string) {

        return await axios
            .get(`${this.url_Api}/messages/getMessagesUnreadByChatId/${chatId}/${userLogadoName}`)
    }




    async updateMessage(msgId: any, data: any) {

        return await axios.patch(`${this.url_Api}/messages/${msgId}`, data).then()
    }

}