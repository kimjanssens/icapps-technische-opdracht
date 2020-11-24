import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { IProject } from '../../project.types';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  public project: IProject;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  public ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.loading = true;

    if (param) {
      const id = +param;

      this.projectService.getProject(id)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.loading = false)
        )
        .subscribe((project) => {
          this.project = project;
        });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
