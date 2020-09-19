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
}
