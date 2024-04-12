import { User } from 'src/app/_models/user';
import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { NgIf, NgFor, NgClass, NgStyle } from '@angular/common';
import { of, take } from 'rxjs';
import { Photo } from 'src/app/_models/photo';
import { environment } from 'src/environments/environment';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountService } from 'src/app/_services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [
    NgIf, NgFor, NgClass, NgStyle,
    FileUploadModule, 
    CommonModule
    ],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit{
  @Input() member: Member | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User | undefined;

  constructor(private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user) this.user = user;
      }
    })
  }

  ngOnInit() : void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true, 
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingAll = (file) => {
      file.withCredentials = false
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response) {
        const photo = JSON.parse(response);
        this.member?.photos.push(photo);
      }
    }
  }
}
