import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenService {

  constructor(private httpClient: HttpClient) { }

  async validateToken(profileid: String, distinction: String, token: String) {
     const data: any = await this.httpClient.post('/api/profile/verify', {
      profileid,
      distinction,
      token
     }, httpOptions).toPromise();
    return data.success;
  }

  async sendToken(profileid: String, distinction: String) {
    const data: any = await this.httpClient.post('/api/profile/prove', {
      profileid,
      distinction
     }, httpOptions).toPromise();
    return data;
  }

}
