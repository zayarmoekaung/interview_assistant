export function getTimeStamp():number{
    const timestampInMilliseconds = new Date().valueOf();
    return timestampInMilliseconds
}
export function getDateString():string{
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB'); 
    return formattedDate;
}