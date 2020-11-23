import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProject } from './project.types';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private githubUrl = 'https://api.github.com/repositories';

  constructor(
    private http: HttpClient
  ) { }

  public getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.githubUrl);
  }

  public getProject(id: number): Observable<IProject> {
    return this.getProjects()
      .pipe(
        map((projects: IProject[]) => projects.find(p => p.id === id))
      );
  }
}
