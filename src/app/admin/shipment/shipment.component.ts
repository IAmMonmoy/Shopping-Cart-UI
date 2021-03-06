import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { Shipment,ShipmentQuantity } from '../../shared/AllModels';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {

  shipment: any[];
  products:string;
  constructor(private _commonService: CommonService) { }

  ngOnInit() {
      //get shipment from db
      //for each shipment get shipment products from db
      this._commonService.getShipment().subscribe(val => {
          this.shipment = val;
          this.shipment.forEach(element => {
            this._commonService.getShipmentProductById(element.id).subscribe( val=> {
                element.shipmenQuantiy = val;

                //make string of all the products and quantity
                this.products = "";
                element.shipmenQuantiy.forEach(val => {
                  this.products+="Name: "+val.productName+" "+"Quantity: "+val.quantity+" , ";
                });
            })
          });
          //console.log(this.shipment);
      });
  }

}
