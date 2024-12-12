import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  IsDriver = false


  userProfile?: string;
  user: any;
  isLoading = false

  constructor(
    private router: Router,
    private userService: UserService

  ) {
    this.IsDriver = localStorage.getItem("userType") == "driver"

  }
  ngOnInit(): void {
    this.userProfile = this.userService.userProfileImage
    this.user = this.userService.user
  }

  navigate(url: any) {
    this.router.navigate([url])
  }
}
