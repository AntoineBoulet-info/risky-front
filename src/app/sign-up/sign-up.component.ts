import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthentificationService} from '../_services/authentification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {first} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: any = {
    civilite: null,
    nom: null,
    prenom: null,
    email: null,
    password: null
  };
  id = this.authService.userValue.id;


  formulaire = new FormGroup(
    {
      nom: new FormControl('Toto', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      prenom: new FormControl('Titi', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl('toto.titi@foo.fr', [Validators.required]),
      password: new FormControl('testlog', [Validators.required]),
      confirmPassword: new FormControl('testlog', [Validators.required]),
    },
  );
  returnUrl: string | undefined;
  error = '';

  loading: boolean | undefined;
  fieldTextType: boolean | undefined;

  constructor(private messageService: MessageService, private authService: AuthentificationService, private router: Router, private route: ActivatedRoute,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get nom(): AbstractControl {
    return <AbstractControl>this.formulaire.get('nom');
  }

  get prenom(): AbstractControl {
    return <AbstractControl>this.formulaire.get('prenom');
  }

  get civilite(): AbstractControl {
    return <AbstractControl>this.formulaire.get('civilite');
  }

  get email(): AbstractControl {
    return <AbstractControl>this.formulaire.get('email');
  }

  get password(): AbstractControl {
    return <AbstractControl>this.formulaire.get('password');
  }

  get confirmPassword(): AbstractControl {
    return <AbstractControl>this.formulaire.get('confirmPassword');
  }


  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  onSubmit(): void {
    this.user = {...this.user, ...this.formulaire.value};
    this.loading = true;
    this.authService.createUser(this.user.civilite, this.user.nom, this.user.prenom, this.user.email, this.user.password)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log('Erreur: ', error);
          //console.log(this.user);
          this.error = error.error.data.values[0];
          this.loading = false;
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Vous possèdez déjà un compte', key: 'main'});
        });


  }

}
