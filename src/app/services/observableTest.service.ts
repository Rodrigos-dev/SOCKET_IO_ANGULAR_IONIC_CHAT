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
export class ObservableTest {

    url_Api: string = environment.urlBase

    constructor(private http: HttpClient) { }

    async createObservableTest(data: any) {
        console.log(data, `${this.url_Api}/obserbleteste`)

        return await this.http
            .post(`${this.url_Api}/obserbleteste`, data)
    }

    async getObservableTest() {
        console.log(`obserbleteste`)

        return await axios
            .get(`${this.url_Api}/obserbleteste`)
    }
}
