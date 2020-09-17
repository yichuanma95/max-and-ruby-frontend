import {Component, OnDestroy, OnInit} from '@angular/core';
import {BunnyCharacter} from './character.model';
import {CharactersService} from './characters.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit, OnDestroy {
  characters: BunnyCharacter[] = [];
  characterSub: Subscription;

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.characterSub = this.charactersService.charactersChanged.subscribe(characters => {
      this.characters = characters;
    });
    this.charactersService.fetchCharacters();
  }

  ngOnDestroy() {
    this.characterSub.unsubscribe();
  }
}
