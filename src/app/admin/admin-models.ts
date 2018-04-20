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
    Image: File[];
    Tags: string[];
}

export class Tag
{
    Id : string;
    TagName : string = '';
    TagDescription : string = '' ;
}