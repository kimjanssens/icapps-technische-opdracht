import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  public pageTitle = 'Projects';
  public projects = [];
  public loading: boolean;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private projectService: ProjectService
  ) { }

  public ngOnInit(): void {
    this.loading = true;

    this.projectService.getProjects()
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
