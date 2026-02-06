import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { OrganizationStatusDialog } from '../organization-status-dialog/organization-status-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClientService } from '../../../core/services/http_client.service';
import { ToastrService } from 'ngx-toastr';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-organization-list',
  imports: [MATERIAL, CommonModule, RouterModule],
  templateUrl: './organization-list.html',
  styleUrl: './organization-list.scss',
})
export class OrganizationList implements OnInit {
  private _dialog = inject(MatDialog)
  private _httpClient = inject(HttpClientService);
  private _toastr = inject(ToastrService);

  organizations = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  displayedColumns = ['select', 'name', 'plan', 'status', 'users', 'created', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.get_grid_list();
  }

  ngAfterViewInit() {
    this.organizations.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.organizations.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.organizations.data);
  }

  /** Apply filter to the table */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.organizations.filter = filterValue.trim().toLowerCase();
  }

  get_grid_list() {
    try {
      const payload = {
        "page": "1",
        "limit": "10",
        "search_key": ""
      };
      this._httpClient.post(API_ENDPOINTS.organizations.get_all, payload).pipe(takeUntil(this.destroy$)).subscribe({
        next: (_res: any) => {
          console.log(_res);
          const data = _res?.data?.org_data;
          if (data && Array.isArray(data)) {
            const mappedData: any = data.map((org: any) => ({
              id: org.id || org._id,
              name: org.organization_name,
              domain: org.domain,
              plan: org.plan_name,
              status: org.is_active ? 'active' : 'suspended',
              users: org.company_size,
              created: org.createdAt,
              ...org
            }));
            this.organizations.data = mappedData;
          }
        },
        error: (err: any) => {
          console.error('Error fetching organizations:', err);
          this._toastr.error('Failed to load organizations');
        },
        complete: () => {
          console.log('Organizations loaded');
        }
      });
    } catch (err: any) {
      console.error('Error:', err);
      this._toastr.error('An error occurred');
    }
  }

  openStatusDialog(org: any) {
    const dialogRef = this._dialog.open(OrganizationStatusDialog, {
      width: '420px',
      data: {
        status: org.status === 'Suspended' ? 'activate' : 'suspend',
        orgName: org.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirmed) {
        org.status = org.status === 'Suspended' ? 'Active' : 'Suspended';
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
