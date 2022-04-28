import {Component, NgZone, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {first} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../_services/user.service";
import {AuthentificationService} from "../_services/authentification.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formulaireUser: FormGroup;
  user: any = {
    username: null,
    email: null,
    password: null
  };

  returnUrl: string | undefined;
  error = '';

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  loading: boolean | undefined;
  fieldTextType: boolean | undefined;

  constructor(private messageService: MessageService, private router: Router, private route: ActivatedRoute,
              private modalService: NgbModal, private userService: UserService,
              private authService: AuthentificationService) {
    this.formulaireUser = new FormGroup(
      {
        username: new FormControl('titi', [Validators.required]),
        email: new FormControl('toto.titi@foo.fr', [Validators.required]),
        password: new FormControl('testlog', [Validators.required]),
      },
    );
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get username(): AbstractControl {
    return <AbstractControl>this.formulaireUser.get('username');
  }
    get email(): AbstractControl {
    return <AbstractControl>this.formulaireUser.get('email');
  }

  get password(): AbstractControl {
    return <AbstractControl>this.formulaireUser.get('password');
  }


  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  onSubmit(): void {
    /*this.user = {...this.user, ...this.formulaireUser.value};
    this.authentificationService.createUser(this.user.email,this.user.password)
      .subscribe(() => {
        console.log('Data added successfully!')
        this.router.navigate(['/home']).then(r => console.log(r));
      }, (err) => {
        console.log(err);
      });*/
    this.user = {...this.user, ...this.formulaireUser.value};
    this.authService.register(this.user.username,this.user.email, this.user.password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
    window.location.reload();
  }

}
