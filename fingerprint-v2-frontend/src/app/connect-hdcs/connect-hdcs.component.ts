import { DataProviderService } from './../data-provider.service';
import { StepperService } from './../stepper.service';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-connect-hdcs',
  templateUrl: './connect-hdcs.component.html',
  styleUrls: ['./connect-hdcs.component.css']
})
export class ConnectHdcsComponent implements OnInit {

  connecting: boolean = false
  hdcsConnected = false
  @Output() changeAppStateEmitter = new EventEmitter()

  @ViewChild("connectToPort") portBtn: ElementRef<HTMLElement>;

  constructor(private dataProvider: DataProviderService, private stepper: StepperService) { }

  ngOnInit(): void { }

  //-------------------HDCS CONNECTION------------------------------------------------------------------->

  connect(){
    this.dataProvider.createSocket().subscribe((res:string) => {
      const data = JSON.parse(res)
      if(data.method=="previewImage"){
        this.connecting = false
        this.stepper.stepUpSend("next")
        this.changeAppStateEmitter.emit("CaptureFingerprint")
      }
    }, err => {
      setTimeout(() => {
        this.portBtn.nativeElement.click()
      },1000)
    })
  }

  getAtomLinkHref = function(xml, linkRel) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xml, "text/xml");
    var nsResolver = xmlDoc.createNSResolver(xmlDoc.documentElement);
    var xpath = '//atom:link[@rel="' + linkRel + '"]/@href';
    var href = xmlDoc.evaluate(xpath, xmlDoc, nsResolver, XPathResult.ANY_TYPE, null );
    return href.iterateNext().nodeValue;
  }

  connectToHdcs = async () => {
    this.connecting = true
    const response = await fetch('http://localhost:8005/');
    const xmlResponse = await response.text();
    const hdcapUri = this.getAtomLinkHref(xmlResponse, "http://ws.bdr.de/webhd/rels/hdcap/");
    const hdcapResponse = await fetch(hdcapUri);
    const fpScannersUri = this.getAtomLinkHref(await hdcapResponse.text(), "http://ws.bdr.de/webhd/hdcap/rels/fingerprint-sensors/");
    
    // const fpListResponse = await fetch(fpScannersUri);
    // console.log(await fpListResponse.text());

    const formBody = "deviceName=Dermalog+ZF1";
    //const formBody = "deviceName=Single+Fingerprint+Sensor+Mock";


    const fpResponse = await fetch(fpScannersUri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
        });

    const useCaseUri = this.getAtomLinkHref(await fpResponse.text(), "http://ws.bdr.de/webhd/hdcap/rels/capture-fingerprints-web-ui/");
    const useCaseResponse = await fetch(useCaseUri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: ""
        })
        .then(res => {
          //this.connect()
          this.hdcsConnected = true
          setTimeout(() => {
            this.portBtn.nativeElement.click()
          },1000)   
        });

    // console.log(await useCaseResponse.text());
  }
//------------------------------------------------------------------------------------------------------------
}
