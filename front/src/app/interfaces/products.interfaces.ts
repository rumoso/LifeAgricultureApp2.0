export interface getProductsListWithPage {
    idProduct:     number;
    createDate:    Date;
    updateDate:    Date;
    name:          string;
    precio:        number;
    cantidad:        number;
    UMDesc:        string;
    UMSiglas:      string;
}

export interface ProductCat {
    idProduct:     number;
    name:          string;
    precio:        number;
    idUnidadMedida:string;
    UMDesc:        string;
    UMSiglas:      string;
    cantidad:       number;
}

export interface GetProductByIDData {
    idProduct:     number;
    createDate:    Date;
    updateDate:    Date;
    name:          string;
    precio:        number;
    UMDesc:        string;
    UMSiglas:      string;
    cantidad:       number;
}

export interface getInventaryByIdProduct {
    iRows:        number;
    createDate:   Date;
    idUser:       number;
    userName:     string;
    idMovimiento: number;
    movName:      string;
    idProduct:    number;
    productName:  string;
    cantidad:     number;
    cantidadNow:  number;
    description:  string;
}
