import { Component, inject } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { GlobalAdminStatusDialog } from '../global-admin-status-dialog/global-admin-status-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-global-admin-list',
  imports: [MATERIAL, CommonModule, RouterModule],
  templateUrl: './global-admin-list.html',
  styleUrl: './global-admin-list.scss',
})
export class GlobalAdminList {
  private dialog = inject(MatDialog)
  displayedColumns = [
    'name',
    'email',
    'organization',
    'status',
    'created',
    'actions'
  ];

  globalAdmins = [
    {
      id: '1',
      name: 'Manikanta Yalla',
      email: 'admin@spryple.com',
      organization: 'Spryple Technologies',
      status: 'Active',
      created: new Date()
    },
    {
      id: '2',
      name: 'Satya',
      email: 'satya@acme.io',
      organization: 'Acme Corp',
      status: 'Inactive',
      created: new Date()
    }
  ];

  openStatusDialog(admin: any) {
    const dialogRef = this.dialog.open(GlobalAdminStatusDialog, {
      width: '420px',
      data: {
        status: admin.status === 'Active' ? 'deactivate' : 'activate',
        adminName: admin.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirmed) {
        admin.status = admin.status === 'Active' ? 'Inactive' : 'Active';
      }
    });
  }

}
