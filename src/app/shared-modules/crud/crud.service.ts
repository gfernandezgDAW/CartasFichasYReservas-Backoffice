import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class CrudService<T> {
  constructor(private http: HttpClient, private url: string) {}

  getAll() {
    return this.http.get(`${this.url}/all`) as Observable<T[]>;
  }

  getById(id: string) {
    return this.http.get(`${this.url}/${id}`) as Observable<T>;
  }

  create(entity: T) {
    return this.http.post(`${this.url}/new`, entity);
  }

  updateById(id: string, entity: T) {
    return this.http.post(`${this.url}/${id}`, entity);
  }

  deleteById(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
