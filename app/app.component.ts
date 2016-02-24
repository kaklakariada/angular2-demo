import {Component} from 'angular2/core';
import {LoginFormComponent} from './login-form.component';

@Component({
  selector: 'my-app',
  template: '<login-form></login-form>',
  directives: [LoginFormComponent]
})
export class AppComponent { }
