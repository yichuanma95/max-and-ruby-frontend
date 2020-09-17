import {Injectable} from '@angular/core';
import {BunnyCharacter} from './character.model';
import {CharacterServiceClient} from '../services/CharacterServiceClient';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CharactersService {
  characters: BunnyCharacter[] = [];
  charactersChanged = new Subject<BunnyCharacter[]>();
  selectedCharacter: BunnyCharacter = {id: 0, name: 'nobody', bio: 'i am nobody'};
  selectionChanged = new Subject<BunnyCharacter>();

  fetchCharacters() {
    this.characterServiceClient.findAllCharacters().then((characters: BunnyCharacter[]) => {
      this.characters = characters;
      this.charactersChanged.next(this.characters.slice());
    });
  }

  fetchCharacter(cid: number) {
    this.characterServiceClient.findCharacterById(cid).then((character: BunnyCharacter) => {
      this.selectedCharacter = character;
      this.selectionChanged.next(this.selectedCharacter);
    });
  }

  constructor(private characterServiceClient: CharacterServiceClient) { }
}
