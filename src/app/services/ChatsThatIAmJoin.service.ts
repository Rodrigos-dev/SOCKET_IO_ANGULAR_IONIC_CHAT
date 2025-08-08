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
export class ChatsThatIAmJoinService {

    url_Api: string = environment.urlBase

    constructor() { }

    async getAllMyChatsFriends(userId: number) {
        return axios
            .get(`${this.url_Api}/users/findOneById/${userId}`)
    }
}