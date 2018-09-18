import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import {HeroeInterface} from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {
    heroes: any;
    loading = true;

    constructor(private _heroesService: HeroesService) {
        this._heroesService.getHeroes().subscribe(data => {
            console.log(data);
            this.heroes = data;
            this.loading = false;
        });
    }

  ngOnInit() {
  }
    borrarHeroe( key$: string) {
        this._heroesService.borrarHeroe(key$).subscribe(
            respuesta => {
                console.log(respuesta);
                if (respuesta) {
                    console.error(respuesta);
                } else {
                    // todo bien cuando es distinto de null
                    delete this.heroes[key$];
                }
            }
        );
    }
}
