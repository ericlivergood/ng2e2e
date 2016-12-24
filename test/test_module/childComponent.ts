import { Component } from '@angular/core';

@Component({
    selector: 'child-component',
    template: '<input type="text" name="childInput" /><common-component name="commonChild" ></common-component>'
})     
export class ChildComponent {};
