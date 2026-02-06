import { Component, computed, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { MATERIAL } from '../../shared/material/materials';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiClient } from '../../core/services/api-client.service';
import { API_ENDPOINTS } from '../../core/config/api-endpoints';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../core/services/common.service';
@Component({
  selector: 'app-side-nav',
  imports: [
    MATERIAL,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.css',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('expanded <=> collapsed', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ])
  ]
})
export class SideNav implements OnInit {
  private _httpClient = inject(ApiClient);
  private _toastr = inject(ToastrService);
  private _commonService = inject(CommonService)
  isCollapsed = signal<boolean>(false);
  destroy$ = new Subject<void>()

  menuItems = signal<any[]>(
    [
      // {
      //   label: 'Recruitment',
      //   icon: 'work_outline',
      //   active: false,
      //   expanded: false,
      //   subItems: [
      //     { label: 'Job Requisitions', route: '/home/recruitment/requisition', icon: 'assignment', active: false },
      //     { label: 'Job Postings', route: '/recruitment/jobs', icon: 'campaign', active: false },
      //     { label: 'Candidates', route: '/recruitment/candidates', icon: 'people', active: false },
      //     { label: 'Candidate Pipeline', route: '/recruitment/pipeline', icon: 'account_tree', active: false },
      //     { label: 'Interviews', route: '/recruitment/interviews', icon: 'event', active: false },
      //     { label: 'Offers', route: '/recruitment/offers', icon: 'handshake', active: false },
      //     { label: 'Talent Pool', route: '/recruitment/talent-pool', icon: 'groups', active: false }
      //   ]
      // },
      {
        label: 'Employee',
        icon: 'badge',
        active: false,
        expanded: false,
        subItems: [
          { label: 'Employee Onboarding', route: '/home/hrms-core/employees', icon: 'list', active: false },
          // { label: 'Employee Profile', route: '/employees/profile', icon: 'person', active: false },
          // { label: 'Documents', route: '/employees/documents', icon: 'folder', active: false },
          // { label: 'Assets', route: '/employees/assets', icon: 'inventory_2', active: false }
        ]
      },
      // {
      //   label: 'Onboarding & Exit',
      //   icon: 'how_to_reg',
      //   active: false,
      //   expanded: false,
      //   subItems: [
      //     { label: 'Onboarding Stages', route: '/home/onboarding-exit', icon: 'timeline', active: false },
      //     { label: 'Tasks & Checklist', route: '/onboarding/tasks', icon: 'checklist', active: false },
      //     { label: 'Exit Management', route: '/exit', icon: 'logout', active: false }
      //   ]
      // },
      // {
      //   label: 'Attendance & Leave',
      //   icon: 'schedule',
      //   active: false,
      //   expanded: false,
      //   subItems: [
      //     { label: 'Attendance', route: '/attendance', icon: 'fingerprint', active: false },
      //     { label: 'Leave Management', route: '/leave', icon: 'beach_access', active: false },
      //     { label: 'Holidays', route: '/holidays', icon: 'event_available', active: false },
      //     { label: 'Shifts', route: '/shifts', icon: 'swap_horiz', active: false }
      //   ]
      // },
      // {
      //   label: 'Payroll',
      //   icon: 'payments',
      //   active: false,
      //   expanded: false,
      //   subItems: [
      //     { label: 'Salary Structure', route: '/payroll/salary', icon: 'account_balance', active: false },
      //     { label: 'Payroll Processing', route: '/payroll/process', icon: 'sync', active: false },
      //     { label: 'Payslips', route: '/payroll/payslips', icon: 'receipt', active: false },
      //     { label: 'Tax Declarations', route: '/payroll/tax', icon: 'gavel', active: false }
      //   ]
      // },
      // {
      //   label: 'Performance',
      //   icon: 'trending_up',
      //   active: false,
      //   expanded: false,
      //   subItems: [
      //     { label: 'Goals (OKRs)', route: '/performance/goals', icon: 'flag', active: false },
      //     { label: 'Reviews', route: '/performance/reviews', icon: 'rate_review', active: false },
      //     { label: 'Feedback', route: '/performance/feedback', icon: 'forum', active: false }
      //   ]
      // },
      // {
      //   label: 'Learning',
      //   icon: 'school',
      //   active: false,
      //   expanded: false,
      //   subItems: [
      //     { label: 'Courses', route: '/learning/courses', icon: 'menu_book', active: false },
      //     { label: 'Certifications', route: '/learning/certifications', icon: 'verified', active: false }
      //   ]
      // },
      // {
      //   label: 'Organization',
      //   icon: 'apartment',
      //   active: false,
      //   expanded: false,
      //   subItems: [
      //     { label: 'Departments', route: '/org/departments', icon: 'domain', active: false },
      //     { label: 'Designations', route: '/org/designations', icon: 'work', active: false },
      //     { label: 'Locations', route: '/org/locations', icon: 'location_on', active: false }
      //   ]
      // },
      // {
      //   label: 'Admin & Settings',
      //   icon: 'admin_panel_settings',
      //   active: false,
      //   expanded: false,
      //   subItems: [
      //     { label: 'Roles & Permissions', route: '/admin/roles', icon: 'security', active: false },
      //     { label: 'Users', route: '/admin/users', icon: 'group', active: false },
      //     { label: 'Approval Flows', route: '/admin/approvals', icon: 'rule', active: false },
      //     { label: 'Integrations', route: '/admin/integrations', icon: 'hub', active: false },
      //     { label: 'System Settings', route: '/settings', icon: 'settings', active: false }
      //   ]
      // },
      {
        label: 'Platform Management',
        icon: 'space_dashboard',
        active: false,
        expanded: false,
        subItems: [
          { label: 'Platform Dashboard', route: '/home/paltform-management/platform-dashboard', icon: 'dashboard', active: false },
          { label: 'Organizations', route: '/home/paltform-management/orginization', icon: 'business', active: false },
          { label: 'Global Admin Users', route: '/home/paltform-management/global-admin', icon: 'supervisor_account', active: false },
          { label: 'Subscription & Plans', route: '/home/paltform-management/subscription-plan', icon: 'workspace_premium', active: false },
          { label: 'Module & Feature Management', route: '/home/paltform-management/module-featurs-management', icon: 'view_module', active: false },
          { label: 'Usage & Limits', route: '/home/paltform-management/usage-limit', icon: 'insights', active: false }
        ]
      }
    ]
  );

  ngOnInit(): void {
    // this.getModuleList()
  }

  async getModuleList() {
    const userDetails = await this._commonService.getUserDetails();
    // const payload = {
    //   role_code: userDetails,
    //   scope: userDetails,
    //   organization_id: 
    // }
    this._httpClient.get(API_ENDPOINTS.sideNav.get_menus).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        const data = res?.data || res;
        if (Array.isArray(data)) {
          this.menuItems.set(this.mapModulesToSidebar(data));
        }
      },
      error: (err: any) => {
        console.error('Failed to fetch modules', err);
        this._toastr.error('Failed to load platform modules');
      }
    });
  }

  mapModulesToSidebar(modules: any[]) {
    return modules.map(module => ({
      label: module.module_name,
      icon: module.icon || 'folder',
      active: false,
      expanded: false,
      id: module._id,
      subItems: (module.features || []).map((feature: any) => ({
        label: feature.feature_name,
        route: feature.route_path,
        icon: 'chevron_right', // or any default icon
        active: false
      }))
    }));
  }

  toggleSidebar() {
    this.isCollapsed.update(v => !v);

    // When collapsing sidebar, collapse all submenus
    if (this.isCollapsed()) {
      this.menuItems.update(items =>
        items.map(item => ({
          ...item,
          expanded: false
        }))
      );
    }
  }

  toggleSubMenu(clickedItem: any) {
    if (this.isCollapsed()) return;

    this.menuItems.update(items =>
      items.map(item => {
        if (item.label === clickedItem.label) {
          // Toggle expanded state for clicked item
          const newExpanded = !item.expanded;
          return {
            ...item,
            expanded: newExpanded,
            active: newExpanded // Set active when expanded
          };
        } else {
          // Collapse all other items and remove their active state
          return {
            ...item,
            expanded: false,
            active: false
          };
        }
      })
    );
  }

  activateSubItem(parent: any, sub: any) {
    this.menuItems.update(items =>
      items.map(item => {
        if (item.label === parent.label) {
          return {
            ...item,
            expanded: true, // Keep parent expanded when subitem is clicked
            active: true,
            subItems: item.subItems?.map((s: any) => ({
              ...s,
              active: s.label === sub.label
            }))
          };
        } else {
          return {
            ...item,
            expanded: false,
            active: false,
            subItems: item.subItems?.map((s: any) => ({
              ...s,
              active: false
            }))
          };
        }
      })
    );
  }

  // Helper method to handle menu item click for collapsed state
  onMenuItemClick(item: any, event?: MouseEvent) {
    if (this.isCollapsed()) {
      // In collapsed state, don't toggle submenu - let mat-menu handle it
      return;
    }

    if (item.subItems?.length) {
      this.toggleSubMenu(item);
    } else {
      // Handle click for menu items without submenus
      this.menuItems.update(items =>
        items.map(i => ({
          ...i,
          active: i.label === item.label,
          expanded: false
        }))
      );
    }
  }
}
