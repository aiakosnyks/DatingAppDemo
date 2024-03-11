import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  //currentUser$: Observable<User | null> = of(null) 
  //loggedIn = false;

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit():void {
    //this.currentUser$ = this.accountService.currentUser$;
    //this.getCurrentUser();
  }
/*
  getCurrentUser() {
    this.accountService.currentUser$.subscribe(
      {
        next: user => this.loggedIn =!!user,
        error: error => console.log(error)
      })
  }
*/
  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => this.router.navigateByUrl('/members'),
        //this.loggedIn = true;
      error: error => console.log(error)
    })
  }
  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    //this.loggedIn = false;
  }
}
