import {Observable} from 'rxjs';
import {RestService} from './restService';
import {BASE_URL} from '../../base/baseURL';
import {ListUsersResponse} from '../../utils/typing';

export class RestServicesImp implements RestService {
  constructor(private readonly page: number) {}
  public getUsersList(): Observable<ListUsersResponse> {
    return new Observable(sunscribe => {
      fetch(BASE_URL(this.page))
        .then(respone => respone.json())
        .then(result => {
          sunscribe.next(result);
          sunscribe.complete();
        })
        .catch(error => {
          sunscribe.error(error);
          sunscribe.complete();
        });
    });
  }
}