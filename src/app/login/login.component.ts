import {Component, NgZone, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../_models/user';
import {UserService} from "../_services/user.service";
import {AuthentificationService} from "../_services/authentification.service";
import { TokenStorageService } from '../_services/token-storage.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  /** Composant de connexion d'un utilisateur
   * Formulaire de connexion
   **/
  formulaireUser: FormGroup;
  user: any = {
    email: null,
    password: null
  };



  loading = false;
  fieldTextType: boolean | undefined;
  returnUrl: string | undefined;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];


  constructor(private router: Router,
              private route: ActivatedRoute, private userService: UserService,
              private authService: AuthentificationService, private tokenStorage: TokenStorageService
              ) {
    this.formulaireUser = new FormGroup({
      email: new FormControl('toto.titi@foo.fr', [Validators.required]),
      password: new FormControl('testlog', [Validators.required])
    });
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  get email(): AbstractControl  {
    return <AbstractControl>this.formulaireUser.get('email');
  }

  get password(): AbstractControl {
    return <AbstractControl>this.formulaireUser.get('password');
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  onSubmit(): any {
    /*this.user = {...this.form, ...this.formulaireUser.value};
    this.loading = true;
    this.authService.login(this.form.email, this.form.password)
      .subscribe(() => {
        console.log('Data added successfully!')
        this.router.navigate(['/home']).then(r => console.log(r));
      }, (err) => {
        console.log(err);
      });*/
    this.user = {...this.user, ...this.formulaireUser.value};
    this.authService.login(this.user.email, this.user.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );

    window.location.reload();


  }


}
