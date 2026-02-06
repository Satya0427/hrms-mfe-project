import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { ApiClient } from '../services/api-client.service';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private _httpClient = inject(ApiClient);
  destroy$ = new Subject<void>();
  async getUserDetails() {
    const raw = sessionStorage.getItem('userDetails');
    if (!raw) return null;
    try {
      const userDetails = JSON.parse(raw);
      return userDetails ?? null;
    } catch (e) {
      console.error('Failed to parse userDetails from sessionStorage', e);
      return null;
    }
  }

  async getLookupData() {
    try {
      const payload = {
        category: ''
      }
      const response: any = await firstValueFrom(
        this._httpClient.post(API_ENDPOINTS.lookup.getLookupData, payload).pipe(takeUntil(this.destroy$))
      );
      return response?.data ?? [];
    } catch (error) {
      console.error('Error fetching lookup data:', error);
      return [];
    }
  }
  async getBulkLookupData(categories: string[]) {
    try {
      const payload = {
        categories: categories
      }
      const response: any = await firstValueFrom(
        this._httpClient.post(API_ENDPOINTS.lookup.getBulkLookupData, payload).pipe(takeUntil(this.destroy$))
      );
      return response?.data ?? [];
    } catch (error) {
      console.error('Error fetching lookup data:', error);
      return [];
    }
  }
}

