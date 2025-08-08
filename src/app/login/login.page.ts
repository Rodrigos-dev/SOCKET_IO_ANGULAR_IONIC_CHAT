import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup
  userId: number

  constructor(private formulario: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.createForm()
  }

  private createForm(): void {
    this.authForm = this.formulario.group({
      name: ['', [Validators.required]],
      //email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    console.log('AuthForm: ', this.authForm.value.name, 1111);

    localStorage.setItem('user', JSON.stringify({}));

    await (await this.userService.getUserByName(this.authForm.value.name)).subscribe(async r => {

      await localStorage.setItem('user', JSON.stringify(r));

      await this.router.navigate(['/friends-chat'])

      //await this.router.navigate(['/scroll-test'])

      //veraso td ok amigos-chat a navegacao antiga
    })
  }

  get name(): FormControl {
    return this.authForm.get('name') as FormControl;
  }

  get password(): FormControl {
    return this.authForm.get('password') as FormControl;
  }

}
