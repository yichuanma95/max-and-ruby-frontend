import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {CharactersService} from '../characters/characters.service';
import {BunnyCharacter} from '../characters/character.model';
import {Subscription} from 'rxjs';
import {EpisodesService} from '../episodes/episodes.service';
import {Episode} from '../episodes/episode.model';

@Component({
  selector: 'app-new-episode',
  templateUrl: './new-episode.component.html',
  styleUrls: ['./new-episode.component.css']
})
export class NewEpisodeComponent implements OnInit {
  newEpisodeForm: FormGroup;
  characters: BunnyCharacter[] = [];
  max: BunnyCharacter;
  ruby: BunnyCharacter;
  characterSub: Subscription;
  seasons = [...Array(5).keys()].map(i => i + 1);
  addedEpisode: Episode = null;

  get maxWordsControls() {
    return (this.newEpisodeForm.get('maxWords') as FormArray).controls;
  }

  onAddMaxWords() {
    (<FormArray> this.newEpisodeForm.get('maxWords')).push(new FormGroup({
      words: new FormControl(null, Validators.required)
    }));
  }

  onDeleteMaxWord(index: number) {
    (<FormArray> this.newEpisodeForm.get('maxWords')).removeAt(index);
  }

  onCancel() {
    if (!this.navigateToLogin())
      this.location.back();
  }

  onCloseAlert() {
    let alertElem = document.getElementById('episode-success');
    alertElem.classList.remove("show");
    setTimeout(() => {
      alertElem.classList.add("d-none");
    }, 250);
  }

  onSubmit() {
    if (this.navigateToLogin())
      return;
    let newEpisode = {
      season: +this.newEpisodeForm.value.season,
      episodeNo: this.newEpisodeForm.value.episodeNo,
      segment: this.newEpisodeForm.value.segment,
      title: this.newEpisodeForm.value.title,
      plot: this.newEpisodeForm.value.plot,
      littleBrothers: this.newEpisodeForm.value.littleBrothers
    };
    let appearingCharacters = this.newEpisodeForm.value.characters ? [...this.newEpisodeForm.value.characters] : [];
    appearingCharacters.push(this.max.id);
    appearingCharacters.push(this.ruby.id);
    let maxWords = this.newEpisodeForm.value.maxWords.map(word => {
      return {
        originalWords: word.words,
        searchableWords: word.words.toLowerCase().split('').filter(c => /^[a-z]$/i.test(c)).join('')
      };
    });
    this.episodesService.addEpisode(newEpisode).then(episode => {
      this.addedEpisode = episode;
      return this.episodesService.updateMaxWords(maxWords);
    }, _ => {
      localStorage.removeItem("admin");
      this.navigateToLogin();
    }).then(maxWords => {
      let mwids = maxWords.map(word => word.id);
      return this.episodesService.addMaxWordsToEpisode(this.addedEpisode.id, mwids);
    }).then(_ => {
      return this.charactersService.addCharactersToEpisode(this.addedEpisode.id, appearingCharacters);
    }).then(_ => {
      this.addedEpisode = null;
      let alertElem = document.getElementById("episode-success");
      alertElem.classList.remove("d-none");
      alertElem.classList.add("show");
    });
  }

  private initForm() {
    this.newEpisodeForm = new FormGroup({
      season: new FormControl(null, Validators.required),
      episodeNo: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
      segment: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      characters: new FormControl(null, []),
      plot: new FormControl('', Validators.required),
      littleBrothers: new FormControl(false, []),
      maxWords: new FormArray([])
    });
  }

  private navigateToLogin() {
    if (localStorage.getItem('admin') === null) {
      this.router.navigate(['/login']).then(_ => {
        location.reload();
      });
      return true;
    }
    return false;
  }

  constructor(
    private router: Router,
    private location: Location,
    private charactersService: CharactersService,
    private episodesService: EpisodesService
  ) { }

  ngOnInit(): void {
    if (!this.navigateToLogin()) {
      this.characterSub = this.charactersService.charactersChanged.subscribe(characters => {
        this.max = characters.find(c => c.name === 'Max');
        this.ruby = characters.find(c => c.name === 'Ruby');
        this.characters = characters.filter(c => !['Max', 'Ruby'].includes(c.name));
      });
      this.charactersService.fetchCharacters();
      this.initForm();
    }
  }

}
