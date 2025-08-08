import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  authForm: FormGroup
  users: any

  constructor(private formulario: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.createForm()
    this.delete()
  }

  private createForm(): void {
    this.authForm = this.formulario.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {

    localStorage.setItem('user', JSON.stringify({}));

    await (await this.userService.createUser(this.authForm.value)).subscribe(async r => {

      await localStorage.setItem('user', JSON.stringify(r));

      await this.router.navigate(['/amigos-chat'])
    })
  }

  get name(): FormControl {
    return this.authForm.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.authForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.authForm.get('password') as FormControl;
  }

  async delete() {
    await this.userService.deleteUser(11)
  }

}
