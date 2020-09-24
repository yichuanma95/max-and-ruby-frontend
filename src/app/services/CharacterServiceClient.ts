import {Injectable} from '@angular/core';
import {API_URL} from '../common/constants';

@Injectable({providedIn: 'root'})
export class CharacterServiceClient {
  findAllCharacters = () => fetch(`${API_URL}/characters`).then(response => response.json());

  findCharacterById = cid => fetch(`${API_URL}/characters/${cid}`).then(response => response.json());

  addCharactersToEpisode = (eid, cids) => fetch(`${API_URL}/episodes/${eid}/characters`, {
    method: "POST",
    body: JSON.stringify(cids),
    headers: {
      "content-type": "application/json"
    },
    credentials: 'include'
  }).then(response => response.json());
}
