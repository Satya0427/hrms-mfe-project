import { Component, signal } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weekly-off-setup',
  imports: [MATERIAL, CommonModule, FormsModule],
  templateUrl: './weekly-off-setup.html',
  styleUrl: './weekly-off-setup.scss',
})
export class WeeklyOffSetup {
  policyName = '';
  effectiveDate = new Date();
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Data Structure: { weekNumber: { dayName: boolean } }
  // Initialize grid where everything is working (false)
  matrix = signal<any>(this.initMatrix());

  initMatrix() {
    const m: any = {};
    [1, 2, 3, 4, 5].forEach(w => {
      m[w] = {};
      this.weekDays.forEach(d => m[w][d] = false); // Default Working
    });
    return m;
  }

  isOff(week: number, day: string) {
    return this.matrix()[week][day];
  }

  toggleDay(week: number, day: string) {
    this.matrix.update(m => {
      const newM = { ...m };
      newM[week][day] = !newM[week][day];
      return newM;
    });
  }

  toggleAllColumn(day: string) {
    this.matrix.update(m => {
      const newM = { ...m };
      // Check first week to determine toggle state
      const nextState = !newM[1][day];
      [1, 2, 3, 4, 5].forEach(w => newM[w][day] = nextState);
      return newM;
    });
  }

  savePolicy() {
    const payload = {
      name: this.policyName,
      effectiveFrom: this.effectiveDate.toISOString(),
      offDays: this.matrix()
    };
    console.log('Weekly Off Payload:', JSON.stringify(payload, null, 2));
    alert('Policy Saved! Check Console.');
  }
}
