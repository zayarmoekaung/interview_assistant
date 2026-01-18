
export interface Converse {
    id: string;
    text: string;
    isOutgoing: boolean;
    isLoading: boolean;
    timestamp?: string;
    makeConverse: ()=> void;
}