import { Component, OnInit } from "@angular/core";
import { InfoService } from "src/app/services/internal/info.service";
import { MarketingService } from "src/app/services/internal/marketing/marketing.service";

@Component({
  selector: "app-marketing-result",
  templateUrl: "./marketing-result.component.html",
  styleUrls: ["./marketing-result.component.scss"],
})
export class MarketingResultComponent implements OnInit {
  result = [
    {
      name: "Successful",
      message: "The enquiry has been alloted to us",
      color: "green",
    },
    {
      name: "UnSuccessful",
      message: "The enquiry has been alloted to other competitor",
      color: "red",
    },
    {
      name: "Rejected",
      message: "TCC is not Allowed to partcipate in the enquiry",
      color: "red",
    },
    {
      name: "Cancelled",
      message: "The enquiry has been cancelled",
      color: "blue",
    },
  ];
  rejectionReason = [
    "Vendor Registration",
    "Test Certificates",
    "Make Approval",
    "Experiance",
    "Others",
  ];
  enquiryRejectedReason = "";
  resultStatus = "";
  resultStatusRemark = "";
  indianStates = [
    "Andhra Pradesh",
    "Andaman and Nicobar",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Daman and Diu",
    "Dadar and Nagar Haveli",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    " Kerala",
    "Ladakh",
    "Lakshadweep",
    " Madhya Pradesh",
    " Maharashtra",
    " Manipur",
    " Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  totalWithGst = 0;
  total = 0;
  po = false;
  constructor(
    public marketingService: MarketingService,
    public infoService: InfoService
  ) {}

  ngOnInit() {
    this.marketingService.enquiry.itemPrice = JSON.parse(
      JSON.stringify(this.marketingService.enquiry.offer.itemsPrice)
    );
    if (!this.marketingService.enquiry.firm) {
      this.marketingService.enquiry.firm = "TCC ENERGY SOLUTIONS";
    }
    for (let i = 0; i < this.marketingService.enquiry.itemPrice.length; i++) {
      this.marketingService.enquiry.itemPrice[i].gst = 18;
      this.total =
        this.total + this.marketingService.enquiry.itemPrice[i].totalPrice;
      this.marketingService.enquiry.itemPrice[i].totalWithGst =
        this.marketingService.enquiry.itemPrice[i].totalPrice *
        (1 + this.marketingService.enquiry.itemPrice[i].gst / 100);
    }
    this.totalWithGst =
      this.total +
      this.total * (this.marketingService.enquiry.itemPrice[0].gst / 100);
  }
  enquiryStatus(status) {
    this.resultStatus = status;
  }
  doTextareaValueChange(ev) {
    try {
      this.resultStatusRemark = ev.target.value;
    } catch (e) {
      console.info("could not set textarea-value");
    }
  }

  addPrice(i) {
    if (this.marketingService.enquiry.itemPrice[i].unitPrice) {
      this.marketingService.enquiry.itemPrice[i].totalPrice =
        this.marketingService.enquiry.itemPrice[i].unitPrice *
        this.marketingService.enquiry.itemPrice[i].qty;
      this.marketingService.enquiry.itemPrice[i].totalWithGst =
        this.marketingService.enquiry.itemPrice[i].totalPrice *
        (1 + this.marketingService.enquiry.itemPrice[i].gst / 100);
    }
    this.total = 0;
    for (let j = 0; j < this.marketingService.enquiry.itemPrice.length; j++) {
      this.total =
        this.total + this.marketingService.enquiry.itemPrice[j].totalPrice;
    }
    this.totalWithGst =
      this.total +
      this.total * (this.marketingService.enquiry.itemPrice[0].gst / 100);
  }
  submit() {
    if (this.resultStatus == "") {
      alert("Please Select enquiry status");
    } else {
      this.marketingService.enquiry.status = this.resultStatus;
      this.marketingService.enquiry.rejectedReason = this.enquiryRejectedReason;
      this.marketingService.enquiry.statusRemark = this.resultStatusRemark;
      if (this.resultStatus == "Successful") {
        this.po = true;
      } else {
        this.marketingService.enquiryResultSubmission(
          this.marketingService.enquiry
        );
      }
    }
  }

  poReturnData(value) {
    console.log(value);
    this.marketingService.enquiry.poNumber = value.poNumber;
    this.marketingService.enquiry.poInternalNumber = value.number;
    this.po = !this.po;
    this.marketingService.enquiryResultSubmission(
      this.marketingService.enquiry
    );
  }
}
