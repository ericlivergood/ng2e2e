import * as _ from 'lodash';
import * as fs from 'fs';
import { pageObjectData } from './pageObjectData';

export class PageObjectWriter {
    constructor(
        private path: string
    ) { 
    }
    
    public writeObjects(objects: pageObjectData[]) {
        _(objects).each(o => {
            fs.writeFileSync(`${this.path}\\${o.name}.ts`, this.convertComponent(o));
        });
    }

    private convertComponent(pageObject: pageObjectData) {
        let deps = _(pageObject.dependencies)
            .map((d) => `import ${d.name} = require('./${d.name}')`)
            .reduce((list: string, d: string) => `${list}\n${d}`);
        let elements = _(pageObject.children)
            .map((f:any) => `public ${f.name}Element = element(by.css('[data-test="${f.name}"]'));`)
            .reduce((fields: string, f: string) => `${fields}\n\t${f}`, '\t');

        let childComponents = _(pageObject.children)
            .filter((c: any) => !!c.component)
            .map((f:any) => `public ${f.name} = new ${f.component}();`)
            .reduce((fields: string, f: string) => `${fields}\n\t${f}`, '\t');

        return `
${deps}

class ${pageObject.name} {
${elements}
${childComponents}
} export = ${pageObject.name}
`;
    }
}