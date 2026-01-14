export enum Status {
    SUCCESS = 'success',
    INFO    = 'info',
    WARNING = 'warning',
    ERROR   = 'error',
    NEUTRAL = 'neutral'

}
export interface Message {
    status: Status
    title: string,
    message: string,
    index: number,
    expired: boolean,
    close: (index: number) => void
}