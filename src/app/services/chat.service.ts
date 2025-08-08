import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

export interface User {
    name?: string
    email?: string
    password?: string
    avatar?: string
}

@Injectable()
export class ChatService {

    url_Api: string = environment.urlBase

    constructor(private http: HttpClient) { }

    async createChat(userLogadoId: number, userFriendId: number) {
        console.log(`${this.url_Api}/chats`)

        let data = {}

        return await axios
            .post(`${this.url_Api}/chats/${userLogadoId}/${userFriendId}`)
    }

    async getAllUsers() {
        return axios
            .get(`${this.url_Api}/users`)
    }


    async getUserByName(name: string) {
        return this.http
            .get(`${this.url_Api}/users/findOneByName/${name}`)
    }

    async deleteUser(id: number) {
        console.log(typeof (id), 'id delete')
        return this.http
            .delete(`${this.url_Api}/users/${id}`).subscribe()
    }
}