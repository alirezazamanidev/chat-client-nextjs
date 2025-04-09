import { Message } from "./message";
import { User } from "./user";

export enum ChatTypeEnum{
    PV='PV',
    GROUP='GROUP'
}

export interface Chat{
    id:string;
    type:ChatTypeEnum
    isActive:boolean;
    participants:User[]
    messages:Message[];
    created_at:Date
    updated_at:Date
}

