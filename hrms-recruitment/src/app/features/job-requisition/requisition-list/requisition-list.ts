import { Component, inject } from '@angular/core';
import { RequisitionService } from '../../../services/requisition.service';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-requisition-list',
  imports: [MATERIAL,CommonModule,RouterModule],
  templateUrl: './requisition-list.html',
  styleUrl: './requisition-list.scss',
})
export class RequisitionList {
  private service = inject(RequisitionService);

  // Signals or Observables can be used here, using simple subscription for demo
  dataSource = this.service.getRequisitions();
  displayedColumns: string[] = ['id', 'title', 'department', 'priority', 'status', 'actions'];
}
