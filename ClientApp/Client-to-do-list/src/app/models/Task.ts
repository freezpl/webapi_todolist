import {Category} from 'src/app/models/Category';
import { Tag } from './Tag';

export class Task { 
    id:number;
    descripton:string;
    priority:number;
    category:Category;
    tags:Tag[];
}