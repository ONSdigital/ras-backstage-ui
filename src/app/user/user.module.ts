import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { UserActions } from './user.actions';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@NgModule({
    imports: [
        HttpModule,
        CommonModule
    ],
    providers: [
        UserService,
        UserActions,
        UserResolver
    ]
})
export class UserModule {}
