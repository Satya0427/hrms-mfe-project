import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MATERIAL } from '../../../shared/material/materials';

interface LedgerItem {
  month: string;
  opening: number;
  accrued: number;
  taken: number;
  closing: number;
  remarks?: string;
  expiry?: number; // Credits expiring this month
}

@Component({
  selector: 'app-leave-simulation',
  imports: [MATERIAL, CommonModule, FormsModule],
  templateUrl: './leave-simulation.html',
  styleUrl: './leave-simulation.scss',
})
export class LeaveSimulation {
  simulationRan = signal(false);
  displayedColumns = ['month', 'opening', 'credit', 'debit', 'expiry', 'closing'];

  // Mock Data
  ledgerData = signal<LedgerItem[]>([]);

  runSimulation() {
    this.simulationRan.set(true);
    // Generate Dummy Ledger for 12 months
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    let balance = 2.0; // Opening

    const data = months.map(m => {
      const credit = 1;
      const taken = Math.random() > 0.7 ? 1 : 0; // Randomly take leave
      const expiry = m === 'Mar' ? 0.5 : 0; // Expire in March

      const opening = balance;
      balance = opening + credit - taken - expiry;

      return {
        month: `${m} 2024`,
        opening: parseFloat(opening.toFixed(1)),
        accrued: credit,
        taken: taken,
        expiry: expiry,
        closing: parseFloat(balance.toFixed(1))
      };
    });

    this.ledgerData.set(data);
  }
}
