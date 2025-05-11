import { Message } from "./message";
import { User } from "./user";

export enum ChatTypeEnum{
    PV='PV',
    GROUP='GROUP'
}

export interface Chat{
    id:string;
    name:string;
    type:ChatTypeEnum
    reciveer:User
    isActive:boolean;
    participants:User[]
    
    lastMessage:Message
    unreadCount:number
    messages:Message[];
    created_at:Date
    updated_at:Date
}

