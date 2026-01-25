import { Component, inject } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { OrganizationStatusDialog } from '../organization-status-dialog/organization-status-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-organization-list',
  imports: [MATERIAL, CommonModule, RouterModule],
  templateUrl: './organization-list.html',
  styleUrl: './organization-list.scss',
})
export class OrganizationList {
  private dialog = inject(MatDialog)
  organizations = [
    { name: 'Spryple Technologies', domain: 'spryple.com', plan: 'Enterprise', status: 'active', users: 245, created: new Date() },
    { name: 'Acme Corp', domain: 'acme.io', plan: 'Growth', status: 'trial', users: 58, created: new Date() }
  ];

  displayedColumns = ['name', 'plan', 'status', 'users', 'created', 'actions'];

  openStatusDialog(org: any) {
    const dialogRef = this.dialog.open(OrganizationStatusDialog, {
      width: '420px',
      data: {
        status: org.status === 'Suspended' ? 'activate' : 'suspend',
        orgName: org.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirmed) {
        org.status = org.status === 'Suspended'
          ? 'Active'
          : 'Suspended';
      }
    });
  }

}
