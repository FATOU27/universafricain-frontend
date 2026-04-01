import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  private uploadUrl = `https://api.cloudinary.com/v1_1/${environment.cloudinaryCloudName}/image/upload`;

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', environment.cloudinaryUploadPreset);
    formData.append('folder', 'produits');

    return this.http.post<any>(this.uploadUrl, formData).pipe(
      map(response => response.secure_url)
    );
  }
}