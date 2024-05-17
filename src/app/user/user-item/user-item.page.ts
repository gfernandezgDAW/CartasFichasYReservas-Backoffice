import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

import { UtilsService } from '../../common/services/utils.service';
import { BreadcrumbDataDto } from '../../shared-modules/components/breadcrumb/dtos/breadcrumb-data.dto';
import { User } from '../classes/user.class';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-item',
  templateUrl: 'user-item.page.html',
  styleUrls: ['user-item.page.scss'],
})
export class UserItemPage implements OnInit {
  id: string;
  userForm = this.fromBuilder.group({
    username: ['', [Validators.required]],
    dni: [
      '',
      [Validators.required, Validators.pattern('^[0-9]{8,8}[A-Za-z]$')],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(3)]],
    isAdmin: [false],
  });
  breadCrumbDataList: BreadcrumbDataDto[] = [
    { title: 'Usuarios', routes: ['users'] },
  ];

  constructor(
    private route: ActivatedRoute,
    private fromBuilder: FormBuilder,
    private usersService: UsersService,
    protected utilsService: UtilsService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }

    this.id = idParam;
    if (this.id !== 'new') {
      this.usersService
        .getById(this.id)
        .pipe(first())
        .subscribe((user: User) => {
          this.breadCrumbDataList = this.breadCrumbDataList.concat({
            title: `Editar: ${user.username.trim()} (${user.email.trim()})`,
          });
          this.userForm.patchValue(user);
        });
      return;
    }

    this.breadCrumbDataList = this.breadCrumbDataList.concat({
      title: 'Nuevo',
    });
    this.userForm.patchValue(new User());
    this.userForm.controls.password.addValidators([Validators.required]);
  }

  upsertUser() {
    const user = this.userForm.value as User;
    if (this.id !== 'new') {
      if (!user.password || !user.password.trim().length) {
        delete user.password;
      }

      this.usersService
        .updateById(this.id, user)
        .pipe(first())
        .subscribe(() => {
          this.utilsService.displayToast(
            'El usuario se ha modificado correctamente',
            'success'
          );
          this.utilsService.navigateTo(['users']);
        });
      return;
    }

    this.usersService
      .create(user)
      .pipe(first())
      .subscribe(() => {
        this.utilsService.displayToast(
          'El usuario se ha generado correctamente',
          'success'
        );
        this.utilsService.navigateTo(['users']);
      });
  }

  deleteUser() {
    this.usersService
      .deleteById(this.id)
      .pipe(first())
      .subscribe(() => {
        this.utilsService.displayToast(
          'El usuario se ha eliminado correctamente',
          'success'
        );
        this.utilsService.navigateTo(['users'], true);
      });
  }
}
