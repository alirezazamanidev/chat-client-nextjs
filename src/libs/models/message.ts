import { User } from "./user";

export interface Message{
    id:string;
    text:string;
    senderId:string;
    sender:User
    isRead:boolean;
    isMine:boolean
    
    created_at:Date;
}