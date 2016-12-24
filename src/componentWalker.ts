import * as ts from 'typescript';
import * as fs from 'fs';
import * as tsc from '@angular/tsc-wrapped';
import * as _ from 'lodash';
import * as path from 'path';
import * as html from 'htmlparser2';

import { pageObjectData } from './pageObjectData';
import { pageObjectElement } from './pageObjectElement';

export class ComponentWalker {
    private components: { [tag: string]: any } = {};
    private componentTree: { [tag: string]: pageObjectData } = {};
    constructor() {}
 
    walk(entryPoints: string[]): pageObjectData[] {
        this.discoverComponents(entryPoints);
        this.parseTemplates();
        return _.values(this.componentTree);
    }

    //walk the dependency chain of each entry point and parse each class'
    //annotations extracting templates and selectors from Angular Component annotations 
    private discoverComponents(entryPoints: string[]) {
        let loadTemplateFromUrl = (baseDir: string, templatePath: string) => {
            return fs.readFileSync(path.join(baseDir, templatePath), 'utf8');
        }

        let program = ts.createProgram(entryPoints, { module: ts.ModuleKind.CommonJS, experimentalDecorators: true });
        let collector = new tsc.MetadataCollector();

        program.getSourceFiles().forEach(f => {
            let metadata = collector.getMetadata(f, false);
            if(!!metadata && !!metadata.metadata) {
                _(metadata.metadata).keys().each(m => {
                    let cmetadata = <tsc.ClassMetadata> metadata.metadata[m];
                    if(!!cmetadata && !!cmetadata.decorators) {
                        cmetadata.decorators.forEach(d => {
                            if(tsc.isMetadataSymbolicCallExpression(d)) {
                                let e = <tsc.MetadataSymbolicCallExpression>d;
                                let name = (<tsc.MetadataObject>e.expression)['name'];
                                if(name === 'Component') {
                                    let opts = <tsc.MetadataObject>e.arguments[0];
                                    let tag = <string>opts['selector'];

                                    this.components[tag] = {
                                        name: m,
                                        selector: opts['selector'],
                                        template: !!opts['template'] ? opts['template'] : loadTemplateFromUrl(path.dirname(f.path), <string>opts['templateUrl'])
                                    }
                                }
                            }
                        });
                    }
                });
            }
        });
    }

    private parseTemplates(): void {
        let component: any = null;
        let parser = new html.Parser({
            onopentag: (name, attr) => this.convertElement(component, name, attr)
        });
        _(this.components).keys().each((c:any) => {
            this.componentTree[c] = {
                name: this.components[c].name,
                children: [],
                dependencies: []
            };
            component = this.componentTree[c];
            parser.write(this.components[c].template);
        });
        parser.end();
    }

    private convertElement(node: any, tag: string, attributes: any) {
        if(attributes['data-test'] || !!this.components[tag]) {
            let child: pageObjectElement = {
                name: attributes['data-test'],
                type: tag
            };
            if(!!this.components[tag]) {
                child.component = this.components[tag].name;
                node.dependencies.push({
                    name: this.components[tag].name,
                    file: `./${tag}`
                });
            }
            else if(attributes['data-test']) {
                switch(tag) {
                    case 'input':
                        child.type = attributes['type'];                   
                        break;
                    default:
                        break;
                }
            }
            node.children.push(child);
        }
    }
}