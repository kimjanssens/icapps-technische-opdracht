import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  public pageTitle = 'Projects';
  public projects = [];
  public loading: boolean;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private projectsService: ProjectsService
  ) { }

  public ngOnInit(): void {
    this.loading = true;

    this.projectsService.getProjects()
      .pipe(
        finalize(() => this.loading = false),
        takeUntil(this.destroy$)
      )
      .subscribe((projects) => {
        this.projects = projects;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
