import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../../../shared/app-common.module';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterRoutingModule
  ],
  declarations: [RegisterPageComponent],
  exports: [
      RegisterPageComponent
  ]
})
export class RegisterModule {}
