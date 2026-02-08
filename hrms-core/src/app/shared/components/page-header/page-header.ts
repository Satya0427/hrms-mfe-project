import { Component, input, model, output } from '@angular/core';
import { MATERIAL } from '../../material/materials';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interface for the tabs (Exported so parent components can use it)
export interface HeaderTab {
  label: string;
  id: string | number;
}

@Component({
  selector: 'app-page-header',
  imports: [MATERIAL, CommonModule, FormsModule],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {

  // 1. Title of the page (Required)
  title = input.required<string>();

  // 2. Breadcrumbs array (e.g. ['HRMS', 'Employees', 'Details'])
  breadcrumbs = input<string[]>([]);

  // 3. Optional Tabs to display at the bottom
  tabs = input<HeaderTab[]>([]);

  // 4. Two-way binding for the Active Tab
  // Parent uses: [(activeTab)]="currentTab"
  activeTab = model<string | number | null>(null);

  // 5. Back Button Click Event
  onBack = output<void>();

  // Helper method to switch tabs
  selectTab(id: string | number) {
    this.activeTab.set(id);
  }
}
