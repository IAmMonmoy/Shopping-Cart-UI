import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { AuthGuardService } from '../admin/services/auth-guard.service';
import { RoleGuardService } from '../admin/services/role-guard.service';
import { AdminServiceService } from '../admin/services/admin-service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _commonService: CommonService, private _adminService: AdminServiceService) { }

  ngOnInit() {
  }

  logOut()
  {
    localStorage.removeItem('token');
  }

}
