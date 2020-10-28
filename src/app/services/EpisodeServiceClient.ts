import {Injectable} from '@angular/core';
import {API_URL} from '../common/constants';

@Injectable({providedIn: 'root'})
export class EpisodeServiceClient {
  login = user => fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json"
    },
    credentials: 'include'
  }).then(response => response.json());

  logout = () => fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: 'include'
  });

  verifySession = () => fetch(`${API_URL}/verify`, {
    method: "POST",
    credentials: 'include'
  }).then(response => response.json()).catch(_ => {});

  addEpisode = episode => fetch(`${API_URL}/episodes`, {
    method: "POST",
    body: JSON.stringify(episode),
    headers: {
      "content-type": "application/json"
    },
    credentials: 'include'
  }).then(response => response.json());

  updateMaxWords = maxWords => fetch(`${API_URL}/max-words`, {
    method: "PUT",
    body: JSON.stringify(maxWords),
    headers: {
      "content-type": "application/json"
    },
    credentials: 'include'
  }).then(response => response.json());

  addMaxWordsToEpisode = (eid, mwids) => fetch(`${API_URL}/episodes/${eid}/max-words`, {
    method: "POST",
    body: JSON.stringify(mwids),
    headers: {
      "content-type": "application/json"
    },
    credentials: 'include'
  }).then(response => response.json());
}
