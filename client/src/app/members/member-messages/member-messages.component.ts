import { CommonModule } from '@angular/common';
import { MessageService } from './../../_services/message.service';
import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [CommonModule, TimeagoModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit {
 @Input() username?: string;
 @Input() messages: Message[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
