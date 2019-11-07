import {Category} from 'src/app/models/Category';
import { Tag } from './Tag';

export class Task { 
    id:number;
    description:string;
    priority:number;
    category:Category;
    tags:Tag[];
}