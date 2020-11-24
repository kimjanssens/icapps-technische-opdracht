import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { ProjectService } from '../../project.service';
import { IProject } from '../../project.types';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  public pageTitle = 'Projects';
  public projects: IProject[];
  public filteredProjects: IProject[];
  public loading: boolean;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public filter = '';

  constructor(
    private projectService: ProjectService
  ) { }

  get searchText(): string {
    return this.filter;
  }

  set searchText(value: string) {
    this.filter = value;
    this.filteredProjects = this.searchText ? this.filterProjects(this.searchText) : this.projects;
  }

  public ngOnInit(): void {
    this.loading = true;

    this.projectService.getProjects()
      .pipe(
        finalize(() => this.loading = false),
        takeUntil(this.destroy$)
      )
      .subscribe((projects) => {
        this.projects = projects;
        this.filteredProjects = projects;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private filterProjects(filter: string): IProject[] {
    filter = filter.toLocaleLowerCase();

    return this.projects.filter((project: IProject) =>
      project.name.toLocaleLowerCase().indexOf(filter) !== -1
    );
  }
}
