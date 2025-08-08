import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

export interface User {
    name?: string
    email?: string
    password?: string
    avatar?: string
}

@Injectable()
export class ChatsThatIamJoin {

    url_Api: string = environment.urlBase

    constructor(private http: HttpClient) { }

    async create(data: User) {
        try {
            return await this.http
                .post(`${environment.urlBase}/`, { data })
        } catch (error) {
            return error;
        }
    }

    async getChatsThatIamJoin(userName: string) {
        try {
            return await this.http
                .get(`${this.url_Api}/chats-that-i-am-join/${userName}`)
        } catch (error) {
            return error;
        }
    }


    async createUser(data: User): Promise<any> {
        try {
            return await this.http
                .post(`${this.url_Api}/users/`, data)
        } catch (error) {
            return error;
        }
    }


}