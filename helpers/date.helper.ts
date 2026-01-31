import { format } from 'date-fns';

export const formatTimestamp = (timestamp: number | undefined): string => {
    if (!timestamp) {
        return '';
    }
    return format(new Date(timestamp), 'h:mm a - MMM d, yyyy');
};

export const getDateString = (): string => {
    return format(new Date(), 'dd/MM/yyyy');
};