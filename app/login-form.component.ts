import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import { Login }   from './login';

@Component({
  selector: 'login-form',
  templateUrl: 'app/login-form.component.html'
})
export class LoginFormComponent {
  model = new Login('', '');
  submitted = false;
  onSubmit() { this.submitted = true; }
  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
