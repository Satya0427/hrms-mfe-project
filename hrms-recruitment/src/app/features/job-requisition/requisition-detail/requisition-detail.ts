import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RequisitionService } from '../../../services/requisition.service';
import { JobRequisition } from '../../../models/requisition.model';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requisition-detail',
  imports: [MATERIAL, CommonModule,RouterModule],
  templateUrl: './requisition-detail.html',
  styleUrls: ['./requisition-detail.scss'],
})
export class RequisitionDetail implements OnInit {
  // Dependency Injection using inject() function
  private route = inject(ActivatedRoute);
  private service = inject(RequisitionService);

  // Data property to hold the result
  requisition = {
    id: 'REQ-2024-001',
    title: 'Senior Angular Developer',
    department: 'Engineering',
    location: 'Bangalore, India',
    employmentType: 'Full-time',
    positions: 2,
    priority: 'High',
    description:
      'We are looking for a Senior Angular Developer to build scalable HRMS applications.',
    skills: ['Angular', 'TypeScript', 'RxJS', 'Angular Material'],
    experienceRange: '5-8 Years',
    education: 'B.Tech / MCA',
    salaryMin: 2000000,
    salaryMax: 3500000,
    hiringManager: 'John Doe',
    recruiter: 'Jane Smith',
    interviewPanel: ['Tech Lead', 'Architect'],
    approver1: 'Director Engineering',
    approver2: 'HR VP',
    status: 'Pending Approval',
    timeline: [
      {
        step: 'Created',
        approver: 'Jane Smith',
        date: '2024-01-05',
        status: 'Completed'
      },
      {
        step: 'Manager Approval',
        approver: 'Director Engineering',
        date: '2024-01-06',
        status: 'Current'
      },
      {
        step: 'HR Approval',
        approver: 'HR VP',
        date: '2024-01-07',
        status: 'Pending'
      }
    ]
  };

  ngOnInit() {
    //   this.route.paramMap.pipe(
    //     switchMap(params => {
    //       const id = params.get('id');
    //       return this.service.getRequisitionById(id || '');
    //     })
    //   ).subscribe(data => {
    //     this.requisition = data;
    //   });
  }
}
