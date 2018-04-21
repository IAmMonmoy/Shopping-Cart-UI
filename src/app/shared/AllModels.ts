
export class Credential
{
    email: string = '';
    password: string = '';
}

export class Auth {
    token: string = '';
    expiration: string = '';
}

export class Product
{
    ProductCode: string;
    ProductName: string;
    Description: string;
    Price: number;
    Stock: number;
    Image: Image[];
    Tags: ProductTag[];
}

export class Tag
{
    Id : string;
    TagName : string = '';
    TagDescription : string = '' ;
}

export class ProductTag
{
    productId: string;
    tagId: string;
}

export class Image
{
    id: string;
    productId: string;
    path: string;
}

export class cartProduct
{
    Id: string;
    ProductCode: string;
    ProductName: string;
    Description: string;
    Price: number;
    NumberOfProduct: number;
    TotalPrice: number;
}