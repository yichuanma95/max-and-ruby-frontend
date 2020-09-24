import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BunnyCharacter} from '../character.model';
import {Subscription} from 'rxjs';
import {CharactersService} from '../characters.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.css']
})
export class CharacterEditComponent implements OnInit, OnDestroy {
  editCharacterForm: FormGroup;
  character: BunnyCharacter = {id: 0, name: 'Ear-splitter Space Cadet', bio: 'RED ALERT! RED ALERT! DANGER! DANGER!'};
  characterSub: Subscription;
  paramSub: Subscription;

  onCancel() {
    this.authService.cancelEdit();
  }

  onSubmit() {
    if (this.authService.navigateToLogin())
      return;
    let updatedCharacter: BunnyCharacter = {
      id: this.character.id,
      name: this.editCharacterForm.value.name,
      bio: this.editCharacterForm.value.bio
    }
    this.charactersService.updateCharacter(this.character.id, updatedCharacter).then(response => {
      if (response === 0) {
        localStorage.removeItem("admin");
        this.authService.navigateToLogin();
      }
      this.authService.showAlert('bunny-saved');
    });
  }

  onCloseAlert() {
    this.authService.closeAlert('bunny-saved');
  }

  private initForm() {
    this.editCharacterForm = new FormGroup({
      name: new FormControl(this.character.name, Validators.required),
      bio: new FormControl(this.character.bio, Validators.required)
    });
  }

  constructor(
    private charactersService: CharactersService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.navigateToLogin();
    this.characterSub = this.charactersService.selectionChanged.subscribe(character => {
      this.character = character;
      this.initForm();
    });
    this.paramSub = this.route.params.subscribe(params => {
      this.charactersService.fetchCharacter(params.name);
    });
    this.initForm();
  }

  ngOnDestroy() {
    this.characterSub.unsubscribe();
    this.paramSub.unsubscribe();
  }
}
