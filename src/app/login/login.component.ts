import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../_models/user';
import {AuthentificationService} from "../_services/authentification.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  /** Composant de connexion d'un utilisateur
   * Formulaire de connexion
   **/

  form: any = {
    email: null,
    password: null
  };

  userName = this.authService.userValue.nom;
  userFirstName = this.authService.userValue.prenom;
  user: User | undefined;

  loading = false;
  fieldTextType: boolean | undefined;
  returnUrl: string | undefined;
  error = '';

  formulaire = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });


  constructor(private authService: AuthentificationService, private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get email(): AbstractControl  {
    return <AbstractControl>this.formulaire.get('email');
  }

  get password(): AbstractControl {
    return <AbstractControl>this.formulaire.get('password');
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  onSubmit(): void {
    console.log('Submit login');
    this.form = {...this.form, ...this.formulaire.value};
    this.loading = true;
    this.authService.login(this.form.email, this.form.password)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
          console.log("Bienvenue : ", this.authService.userValue.prenom, this.authService.userValue.nom)

        },
        error => {
          console.log('Erreur: ', error);
          // this.error = error.error.data.values[0];
          this.loading = false;
          console.log(error);

        }
      );
  }

}
