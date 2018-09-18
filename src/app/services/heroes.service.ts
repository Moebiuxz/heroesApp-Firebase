import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HeroeInterface} from '../interfaces/heroe.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
    heroesURL = 'https://heroesapp-b49d0.firebaseio.com/heroes.json';
    heroeURL = 'https://heroesapp-b49d0.firebaseio.com/heroes';
  constructor(private http: HttpClient) {
  }
    nuevoHeroe(heroe: HeroeInterface) {
        const body = JSON.stringify(heroe);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post( this.heroesURL, body, { headers } );
    }

    actualizarHeroe(heroe: HeroeInterface, key$: string) {
        const body = JSON.stringify(heroe);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const url = `${this.heroeURL}/${key$}.json`;
        return this.http.put( url, body, { headers } );
    }

    getHeroe(key$: string) {
        const url = `${this.heroeURL}/${key$}.json`;
        return this.http.get(url);
    }

    getHeroes() {
        return this.http.get(this.heroesURL);
    }

    borrarHeroe(key$: string) {
      const url = `${this.heroeURL}/${key$}.json`;
      return this.http.delete(url);
    }
}
