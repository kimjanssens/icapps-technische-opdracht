import { Component, OnInit } from '@angular/core';

import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  public projects = [];

  constructor(
    private projectsService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

}
