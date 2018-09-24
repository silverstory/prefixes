import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidateTokenService } from '../validate-token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenValidator {

  constructor(
    public validateTokenService: ValidateTokenService,
  ) { }

  async ValidateToken(control: AbstractControl, profileid: String, distinction: String) {
    const valid = await this.validateTokenService.validateToken(profileid, distinction, control.value);
    // console.log(`'is token valid: ${valid}`);
    if (valid) {
      return { validToken: true };
    } else {
      return { validToken: false };
    }
  }
}
