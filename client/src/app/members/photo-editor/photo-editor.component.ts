import { User } from 'src/app/_models/user';
import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { NgIf, NgFor, NgClass, NgStyle } from '@angular/common';
import { of, take } from 'rxjs';
import { Photo } from 'src/app/_models/photo';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/_services/account.service';
import { CommonModule } from '@angular/common';
import { FileUploader } from 'ng2-file-upload';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [
    NgIf, NgFor, NgClass, NgStyle,
    CommonModule
    ],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit{
  @Input() member: Member | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User | undefined;

  constructor(private accountService: AccountService, private memberService: MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user) this.user = user;
      }
    })
  }

  ngOnInit() : void {
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }


  
  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe({
      next: () => {
        if(this.user && this.member) {
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
          this.member.photoUrl = photo.url;
          this.member.photos.forEach(p => {
            if(p.isMain) p.isMain = false;
            if(p.id === photo.id) p.isMain = true;
          });
        }
      }
    })
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe({
      next: _ => {
        if(this.member) {
          this.member.photos = this.member.photos.filter(x => x.id !== photoId);
        }
      }
    })
  }

  /*
  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFilesİZE: 10* 1024 * 1024
    })
  }
  */
 
}
