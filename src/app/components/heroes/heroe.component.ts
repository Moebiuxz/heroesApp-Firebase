import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeInterface } from '../../interfaces/heroe.interface';
import {HeroesService} from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {
    heroe: HeroeInterface = {
        nombre: '',
        bio: '',
        casa: 'Marvel'
    };
    nuevo = false;
    id: string;

    constructor(
        private _heroesService: HeroesService,
        private _router: Router,
        private _routes: ActivatedRoute
    ) {
        this._routes.params.subscribe(params => {
            console.log(params);
            this.id = params['id'];
            if (this.id !== 'nuevo') {
                // @ts-ignore
                this._heroesService.getHeroe(this.id).subscribe(data => this.heroe = data);
            }
        });
    }

  ngOnInit() {
  }
    guardar() {
        console.log(this.heroe);
        if (this.id == 'nuevo') {
            this._heroesService.nuevoHeroe(this.heroe).subscribe(
                data => {
                    this._router.navigate(['/heroe', data['name']]);
                },
                error => console.log(error)
            );
        } else {
            this._heroesService.actualizarHeroe(this.heroe, this.id).subscribe(
                data => {
                    console.log(data);
                    // this._router.navigate(['/heroe', data['name']]);
                },
                error => console.log(error)
            );
        }
    }

    agregarNuevo(forma: NgForm) {
        this._router.navigate(['heroe', 'nuevo']);
        forma.reset({
            casa: 'Marvel'
        });
    }
}
