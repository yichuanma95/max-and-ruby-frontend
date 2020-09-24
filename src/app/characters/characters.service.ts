import {Injectable} from '@angular/core';
import {BunnyCharacter} from './character.model';
import {CharacterServiceClient} from '../services/CharacterServiceClient';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CharactersService {
  characters: BunnyCharacter[] = [];
  charactersChanged = new Subject<BunnyCharacter[]>();
  selectedCharacter: BunnyCharacter = {id: 0, name: 'Robot', bio: 'I am a robot'};
  selectionChanged = new Subject<BunnyCharacter>();

  fetchCharacters() {
    this.characterServiceClient.findAllCharacters().then((characters: BunnyCharacter[]) => {
      this.characters = characters;
      this.charactersChanged.next(this.characters.slice());
    });
  }

  fetchCharacter(name: string) {
    this.characterServiceClient.findCharacterByName(name).then((character: BunnyCharacter) => {
      this.selectedCharacter = character;
      this.selectionChanged.next(this.selectedCharacter);
    });
  }

  addCharactersToEpisode(eid, mwids) {
    return this.characterServiceClient.addCharactersToEpisode(eid, mwids);
  }

  updateCharacter(cid, character) {
    return this.characterServiceClient.updateCharacter(cid, character);
  }

  constructor(private characterServiceClient: CharacterServiceClient) { }
}
