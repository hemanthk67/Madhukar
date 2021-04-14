import { Input, OnInit } from "@angular/core";
import { PurchaseOrder } from './../po.model';
import { Component } from "@angular/core";

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.css']
})
export class POComponent implements OnInit {
  ngOnInit(): void {
    this.status = this.purchaseOrder.status;
  }
  @Input()
  public purchaseOrder: PurchaseOrder;
  public status: string;

}
