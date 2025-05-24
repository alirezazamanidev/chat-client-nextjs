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
    receiver:User
    isActive:boolean;
    
    lastMessage:Message
    unreadCount:number
    messages:Message[];
    created_at:Date
    updated_at:Date
}

