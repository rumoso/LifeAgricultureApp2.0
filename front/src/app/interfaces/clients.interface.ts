export interface ClientCat {
    idClient:     number;
    name:         string;
    address:      string;
    tel:          string;
    cel:          string;
    cultivo:      string;
    superficie:   string;
}

export interface OGetClientsListWithPage {
    idClient:     number;
    createDate:    Date;
    name:         string;
    address:      string;
    tel:          string;
    cel:          string;
}