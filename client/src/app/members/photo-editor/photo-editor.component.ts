import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { NgIf, NgFor } from '@angular/common';
import { of } from 'rxjs';
import { Photo } from 'src/app/_models/photo';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [
    NgIf, NgFor 
  ],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit{
  @Input() member: Member | undefined;

  constructor() {}

  ngOnInit() : void {

  }
}
