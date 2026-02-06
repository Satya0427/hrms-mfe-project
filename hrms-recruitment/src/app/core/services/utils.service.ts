import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UtilsService {

    getSessionData(key: string = 'Token', defaultValue = null) {
        try {
            const data = sessionStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error(`SessionStorage error for key: ${key}`, error);
            return defaultValue;
        }
    }

}