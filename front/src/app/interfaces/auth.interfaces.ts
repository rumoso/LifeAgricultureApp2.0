export interface sAuth {
    user:  User;
    token: string;
}

export interface User {
    idUser:     number;
    createDate: Date;
    updateDate: Date;
    name:       string;
    username:   string;
    pwd:        string;
    active:     number;
}