import { NgModule } from '@angular/core';
import { CommonComponent } from './commonComponent';

@NgModule({
    declarations: [CommonComponent],
    exports: [CommonComponent]
})
export class CommonModule {}  