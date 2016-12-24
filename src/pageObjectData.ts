import { pageObjectElement } from './pageObjectElement';

export interface pageObjectData {
    name: string;
    children: pageObjectElement[];
    dependencies: pageObjectData[];
}