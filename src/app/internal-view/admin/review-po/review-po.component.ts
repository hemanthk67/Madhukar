import { Component, OnInit } from "@angular/core";
import { PoReceivedService } from './../../../services/po-received.service';
import { PurchaseOrder } from './po.model';


@Component({
  selector: 'app-review-po',
  templateUrl: './review-po.component.html',
  styleUrls: ['./review-po.component.css']
})
export class ReviewPOComponent implements OnInit{
  private purchaseOrders: PurchaseOrder[];
  private hasMoreItems: boolean = true;
  constructor(private poService: PoReceivedService){
  }
  async ngOnInit(): Promise<void> {
    this.purchaseOrders = await this.poService.getPOs();
  }

  public async loadMore() : Promise<void> {
    const moreItems : PurchaseOrder[] = await this.poService.getMorePOs(this.purchaseOrders.length -1, 5)
    if(moreItems.length < 5){
      this.hasMoreItems = false;
    }
    this.purchaseOrders.push(...moreItems)
  }
}
