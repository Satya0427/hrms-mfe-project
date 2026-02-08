import { Component, signal } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Holiday {
  id: number;
  name: string;
  date: Date;
  type: 'National' | 'Festival' | 'Optional';
  locations: string[]; // ['All'] or ['Hyderabad', 'Bangalore']
  isOptional: boolean;
}

@Component({
  selector: 'app-holiday-calendar',
  imports: [MATERIAL, CommonModule, FormsModule],
  templateUrl: './holiday-calendar.html',
  styleUrl: './holiday-calendar.scss',
})
export class HolidayCalendar {
  displayedColumns = ['date', 'details', 'type', 'locations', 'actions'];

  holidays = signal<Holiday[]>([
    { id: 1, name: 'Republic Day', date: new Date(2024, 0, 26), type: 'National', locations: ['All'], isOptional: false },
    { id: 2, name: 'Holi', date: new Date(2024, 2, 25), type: 'Festival', locations: ['All'], isOptional: true },
    { id: 3, name: 'Ugadi', date: new Date(2024, 3, 9), type: 'Festival', locations: ['Hyderabad', 'Bangalore'], isOptional: false },
  ]);

  // Calendar Coloring Logic
  dateClass = (d: Date) => {
    const time = d.getTime();
    const holiday = this.holidays().find(h => h.date.getTime() === time);
    if (!holiday) return '';
    return holiday.type === 'National' ? 'highlight-national' : 'highlight-festival';
  };
}
