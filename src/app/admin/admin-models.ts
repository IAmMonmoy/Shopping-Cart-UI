export class Credential
{
    email: string = '';
    password: string = '';
}

export class Auth {
    token: string = '';
    expiration: string = '';
}

export interface Product
{
    ProductCode: string;
    ProductName: string;
    Description: string;
    Price: number;
    Stock: number;
    Image: File[];
    Tags: string[];
}

export class Tag
{
    TagName : string = '';
    TagDescription : string = '' ;
}