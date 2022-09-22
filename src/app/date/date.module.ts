import { NgModule } from '@angular/core';
import { ThaiDatePipe } from './thai-date.pipe';

@NgModule({
  declarations: [ThaiDatePipe],
  exports: [ThaiDatePipe],
})
export class DateModule {}
