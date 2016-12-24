import { Component } from '@angular/core';

@Component({
    selector: 'parent-component',
    template: '<input type="text" name="parentInput" /><child-component name="child"></child-component><common-component name="commonParent" ></common-component>'
})
export class ParentComponent {};