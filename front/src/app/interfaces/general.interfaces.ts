export interface ResponseGet {
    status:  number;
    message: string;
    data: any;
}

export interface ParamID{
    id: number
}

export interface ResponseDB_CRUD {
    status:  number;
    message: string;
    insertID: number;
}

export interface Pagination{
    search: string;
    iRows: number;
    start: number;
    limiter: number;
}