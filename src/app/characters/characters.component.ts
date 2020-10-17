import {Component, OnDestroy, OnInit} from '@angular/core';
import {BunnyCharacter} from './character.model';
import {CharactersService} from './characters.service';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit, OnDestroy {
  characters: BunnyCharacter[] = [{id: -1, name: "Hello-World Macaw", bio: "Sqwalk! Bonjour! Kalimeda! Guten-tag! Namaste! Buongiorno!"}];
  characterSub: Subscription;
  lastQuery = '';

  onSearch(form: NgForm) {
    this.lastQuery = form.value.searchQuery;
    this.characters = this.charactersService.characters.filter(c => c.name.toLowerCase().includes(this.lastQuery.toLowerCase()));
  }

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
