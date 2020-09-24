import {Injectable} from '@angular/core';
import {EpisodeServiceClient} from '../services/EpisodeServiceClient';

@Injectable({providedIn: 'root'})
export class EpisodesService {
  addEpisode(episode) {
    return this.episodeServiceClient.addEpisode(episode);
  }

  updateMaxWords(maxWords) {
    return this.episodeServiceClient.updateMaxWords(maxWords);
  }

  addMaxWordsToEpisode(eid, mwids) {
    return this.episodeServiceClient.addMaxWordsToEpisode(eid, mwids);
  }

  constructor(private episodeServiceClient: EpisodeServiceClient) {}
}
