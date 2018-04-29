import { Component, OnInit } from '@angular/core';
import { cartProduct, Product, Shipment,ShipmentQuantity } from '../../shared/AllModels';
import { CommonService } from '../../shared/services/common.service';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  allCartProduct : cartProduct[];
  totalPrice : number;
  checkOutForm : FormGroup;
  purchaseAmount : any[] = [];
  product : any;
  shipment: Shipment;
  shipmentQuantity: ShipmentQuantity;

  constructor(private _commonService: CommonService, private fb: FormBuilder, private route:Router) { }

  ngOnInit() {
    this.getCartProducts();
    this.createForm();
    
    //console.log(this.allCartProduct);
  }

  getCartProducts()
  {
    this.allCartProduct = this._commonService.getCartProductFromLocalStorage();
    this.totalPrice=0;
    if(this.allCartProduct == null) this.allCartProduct = [];

    this.allCartProduct.forEach(element => {
      this.totalPrice += element.TotalPrice;
    });

    for(var i = 0; i<this.allCartProduct.length; i++)
            this.purchaseAmount[i] = this.allCartProduct[i].NumberOfProduct;
  }

  onSubmit()
  {
      if(this.allCartProduct.length > 0)
      {
        //build shipment model to send to server
        this.shipment = new Shipment();
        this.shipment.UserName = this._commonService.getUserName();
        this.shipment.BuyerAddress = this.checkOutForm.controls.Address.value;
        this.shipment.BuyerName = this.checkOutForm.controls.Name.value;
        this.shipment.BuyerPhone = this.checkOutForm.controls.Phone.value;
        this.shipment.TotalCost = this.totalPrice;
        this.shipment.productQuantity = [];
        this.shipment.isDelivered = false;

        //decrease the stock from database
          this.allCartProduct.forEach(element => {
            this._commonService.updateProductStock(element.Id,element.NumberOfProduct).subscribe(
              val => {
                console.log(val);
              }
            );
            
            //build shipment model to send to server
            this.shipmentQuantity = new ShipmentQuantity();
            this.shipmentQuantity.ProductName = element.ProductName;
            this.shipmentQuantity.Quantity = element.NumberOfProduct;
            this.shipment.productQuantity.push(this.shipmentQuantity);
          });
          
         

          //console.log(this.shipment);
      }

        this.clearCart();
        this.checkOutForm.reset();
        //this.route.navigate(['/allProduct']);
  }
  
  createForm()
  {
    this.checkOutForm = this.fb.group({
        Name : ['', [Validators.required]],
        Address : ['', [Validators.required]],
        Phone : ['', [Validators.required]]
    });
  }
  
  clearCart()
  {
    this._commonService.clearCart();
    this.getCartProducts();
    this._commonService.getLocalProductsNumber();
  }

  addAmount(event)
  {
    //can not take more than stock
    //save the id in the value of button to identify which product
     this._commonService.getProductById(event.target.value).subscribe( val => {
         this.product = val;
        if(this.purchaseAmount[event.target.id]+1 <= this.product.stock)
        {
          //add product to the specified cart product
          //update the Total price
          //update local storage
          this.purchaseAmount[event.target.id]++;
          this.allCartProduct[event.target.id].NumberOfProduct++;
          this.allCartProduct[event.target.id].TotalPrice+= this.allCartProduct[event.target.id].Price;
          this.totalPrice += this.allCartProduct[event.target.id].Price;
          localStorage.setItem('products',JSON.stringify(this.allCartProduct));
        }
        
     });
  }

  subtractAmount(event)
  {
    //saved the index in the id of button to identify which button clicked
    if(this.purchaseAmount[event.target.id]-1 >= 0)
    {
      this.purchaseAmount[event.target.id]--;
      this.allCartProduct[event.target.id].NumberOfProduct--;
      this.allCartProduct[event.target.id].TotalPrice-= this.allCartProduct[event.target.id].Price;
      this.totalPrice -= this.allCartProduct[event.target.id].Price;
      localStorage.setItem('products',JSON.stringify(this.allCartProduct));
    }
  }
}
