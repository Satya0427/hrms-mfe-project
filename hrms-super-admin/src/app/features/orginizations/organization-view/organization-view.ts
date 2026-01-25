import { Component, inject } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { RouterModule } from "@angular/router";
import { OrganizationStatusDialog } from '../organization-status-dialog/organization-status-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-organization-view',
  imports: [MATERIAL, RouterModule],
  templateUrl: './organization-view.html',
  styleUrl: './organization-view.scss',
})
export class OrganizationView {
  private dialog = inject(MatDialog)
  openSuspendDialog() {
    this.dialog.open(OrganizationStatusDialog, {
      width: '420px',
      data: {
        status: 'suspend', // or 'activate'
        orgName: 'Spryple Technologies'
      }
    });
  }
}
