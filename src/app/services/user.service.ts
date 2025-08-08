import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { rejects } from 'assert';

export interface User {
    name?: string
    email?: string
    password?: string
    avatar?: string
    statusConected?: string
}

@Injectable()
export class UserService {

    url_Api: string = environment.urlBase

    constructor(private http: HttpClient) { }

    async createUser(data: User) {
        console.log(data, `${this.url_Api}/users`)

        return await this.http
            .post(`${this.url_Api}/users`, data)
    }

    async updateUser(userId: number, data: User) {
        console.log(data, `${this.url_Api}/users/${userId}`)

        return await this.http
            .patch(`${this.url_Api}/users/${userId}`, data).subscribe(r => console.log(r, 111))
    }

    async updateUserAxios(userId: number, data: User) {
        console.log(data, `${this.url_Api}/users/${userId}`)

        return await axios
            .patch(`${this.url_Api}/users/${userId}`, data).then(r => console.log(r, 111))
    }

    async getAllUsers() {
        return axios
            .get(`${this.url_Api}/users`)
    }


    async getUserById(id: number) {
        return this.http
            .get(`${this.url_Api}/users/findOneById/${id}`)
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


