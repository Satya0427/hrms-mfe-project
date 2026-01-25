import { Component } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-platform-module-list',
  imports: [MATERIAL, FormsModule, CommonModule, RouterModule],
  templateUrl: './platform-module-list.html',
  styleUrl: './platform-module-list.scss',
})
export class PlatformModuleList {
  displayedColumns = [
    'name',
    'code',
    'features',
    'status',
    'actions'
  ];

  modules = [
    {
      id: 'recruitment',
      name: 'Recruitment',
      code: 'RECRUITMENT',
      features: 8,
      status: 'Enabled'
    },
    {
      id: 'payroll',
      name: 'Payroll',
      code: 'PAYROLL',
      features: 5,
      status: 'Disabled'
    },
    {
      id: 'performance',
      name: 'Performance',
      code: 'PERFORMANCE',
      features: 4,
      status: 'Enabled'
    }
  ];
}
