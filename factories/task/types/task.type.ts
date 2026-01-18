export interface Task {
    name: string;
    index: number;
    isLoading: boolean;
    stop: () => void;
}