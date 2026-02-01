import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

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
}
