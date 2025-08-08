import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonList } from '@ionic/angular';

@Component({
  selector: 'app-scroll-test',
  templateUrl: './scroll-test.page.html',
  styleUrls: ['./scroll-test.page.scss'],
})
export class ScrollTestPage implements OnInit {
  @ViewChild(IonList, { read: ElementRef }) list: ElementRef;
  @ViewChild(IonContent) content: IonContent;

  arr: any[] = [];

  block = 'start';//=> mostra emcima no start da lista
  //block = 'end'; => mostra no final embaixo
  //block = 'center'; => mostra no meio do box

  //behavior = 'auto' => rola rapido para o index da lista
  behaviour = 'smooth'//rola devagar para o index

  scrollTo: any

  offsetTop = 0;

  constructor() {
    for (let val = 0; val < 100; val++) {
      this.arr.push(`Element - ${val}`)
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.scrollTo = 99
    this.scrollListVisible()
  }

  scrollListVisible() {
    console.log('Scroll to: ', this.scrollTo);
    let arr = this.list.nativeElement.children;
    //console.log(arr, 'arr');
    let item = arr[this.scrollTo];
    console.log(item, 'item')
    //this.a.scrrolIntoView()
    item.scrollIntoView({ behavior: this.behaviour, block: this.block });
  }

  scrollBottom() {
    this.content.scrollToBottom();
  }


  scrollTop() {
    this.content.scrollToTop();
  }

  onScroll(e: any) {
    console.log(e);
    this.offsetTop = e.detail.scrollTop;
  }

}
