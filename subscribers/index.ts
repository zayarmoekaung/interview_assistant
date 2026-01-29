import { KbVersionUpdater } from "./knowledgeBase.subscriber";

export function initSubscribers(){
    
    new KbVersionUpdater();
    
}