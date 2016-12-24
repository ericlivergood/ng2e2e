import { NgModule } from '@angular/core';
import { CommonModule } from './commonModule';
import { ParentComponent } from './parentComponent';
import { ChildComponent } from './childComponent';

@NgModule({
    declarations: [ParentComponent, ChildComponent],
    imports: [CommonModule]
})
export class TestModule {}