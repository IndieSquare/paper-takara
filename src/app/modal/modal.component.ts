import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public dataService:DataService) { }

  ngOnInit() {
  }
  closeSelf(){
this.dataService.showModal = false;
  }
}
