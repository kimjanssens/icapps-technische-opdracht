import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private githubUrl = 'https://api.github.com/repositories';

  constructor(
    private http: HttpClient
  ) { }

  public getProjects(): Observable<any> {
    return this.http.get<any>(this.githubUrl);
  }
}
