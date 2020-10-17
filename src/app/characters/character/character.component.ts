import {Component, OnDestroy, OnInit} from '@angular/core';
import {BunnyCharacter} from '../character.model';
import {CharactersService} from '../characters.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, OnDestroy {
  character: BunnyCharacter = {id: 0, name: 'Walkie-Talkie Bear', bio: 'I\'m a bear!'};
  characterSub: Subscription;
  paramSub: Subscription;
  loggedIn = localStorage.getItem('admin');

  constructor(private charactersService: CharactersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.characterSub = this.charactersService.selectionChanged.subscribe(character => {
      this.character = character;
    });
    this.paramSub = this.route.params.subscribe(params => {
      this.charactersService.fetchCharacter(params.name);
    });
  }

  ngOnDestroy() {
    this.characterSub.unsubscribe();
    this.paramSub.unsubscribe();
  }
}
