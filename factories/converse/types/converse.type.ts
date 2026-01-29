
export interface Converse {
    id: number;
    text: string;
    isOutgoing: boolean;
    isLoading: boolean;
    timestamp?: number;
    makeConverse: (text: string)=> void;
}