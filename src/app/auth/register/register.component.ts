import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {UserCredentials} from '../../model/user-credentials';
import {AuthService} from '../../services/auth/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  user: UserCredentials = new UserCredentials();
  errorMessage: string;

  constructor(private accountService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.accountService.createAccount(this.user).subscribe(data => {
        this.router.navigate(['/auth/login']).then();
      }, (err: HttpErrorResponse) => {
        console.log(err);

        switch (err.status) {
          case 0:
            this.errorMessage = 'Can\'t connect to server!';
            break;
          case 409:
            this.errorMessage = 'Username is already taken!';
            break;
          default:
            this.errorMessage = 'That\'s strange... ' + err.status;
        }
      }
    );
  }
}
