import { ComponentWalker } from '../src/componentWalker';
import { PageObjectWriter } from '../src/pageObjectWriter';
import { Component, NgModule } from '@angular/core';
import * as fs from 'fs';
import * as _ from 'lodash';
import 'reflect-metadata';

import { ChildComponent } from './test_module/childComponent';
import { ParentComponent } from './test_module/parentComponent';
import { CommonComponent } from './test_module/commonComponent';

// describe('component walking', () => {
//     it('walks inline templates & writes files', (done) => {
//         let walker = new ComponentWalker();
//         let objects = walker.walk(['./test/test_module/testModule.ts']);
//         let basePath = '\\git\\ng2e2e\\pageObjects';
//         _(fs.readdirSync(basePath)).each(f => fs.unlinkSync(`${basePath}\\${f}`));

//         let writer = new PageObjectWriter(basePath);
//         writer.writeObjects(objects);
//         expect(fs.existsSync(`${basePath}\\${ParentComponent.name}.ts`)).toBeTruthy();
//         expect(fs.existsSync(`${basePath}\\${ChildComponent.name}.ts`)).toBeTruthy();
//         expect(fs.existsSync(`${basePath}\\${CommonComponent.name}.ts`)).toBeTruthy();

//         done();
//     });
// });

describe('vantage', () => {
    it('walks patients', (done) => {
        let walker = new ComponentWalker();
        let objects = walker.walk(['../Vantage/DataFinch.Vantage.Web/Assets/TypeScript/app/patients/patients.module.ts']);
        let basePath = '\\temp\\vantagePageObjects';
        //_(fs.readdirSync(basePath)).each(f => fs.unlinkSync(`${basePath}\\${f}`));

        let writer = new PageObjectWriter(basePath);
        writer.writeObjects(objects);        
        done();
    });
});