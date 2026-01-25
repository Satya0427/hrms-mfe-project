import { Component } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-global-admin-view',
  imports: [MATERIAL,CommonModule,RouterModule],
  templateUrl: './global-admin-view.html',
  styleUrl: './global-admin-view.scss',
})
export class GlobalAdminView {
  admin = {
    name: 'Manikanta Yalla',
    email: 'admin@spryple.com',
    mobile: '+91 98765 43210',
    organization: 'Spryple Technologies',
    status: 'Active',
    lastLogin: 'Today, 10:32 AM',
    createdOn: '12 Jan 2026'
  };
}
