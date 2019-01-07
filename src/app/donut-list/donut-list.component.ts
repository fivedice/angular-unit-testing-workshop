import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { DonutService } from '../donut-list/donut.service';
import { Donut } from '../models/donut.interface';

@Component({
  selector: 'app-donut-list',
  templateUrl: './donut-list.component.html',
  styleUrls: ['./donut-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutListComponent implements OnInit {

  @Output()
  selectionChange: EventEmitter<Donut> = new EventEmitter<Donut>();

  @Output()
  doubleClick: EventEmitter<Donut> = new EventEmitter<Donut>();

  donuts: Donut[] = [];

  constructor(private donutService: DonutService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.donutService.getDonuts().subscribe((doughnuts: Donut[]) => {
      this.donuts = doughnuts.sort((a, b) => {
        return (a < b) ? -1 : (a > b) ? 1 : 0;
      });
      this.changeDetector.markForCheck();
    });
  }

  getItemId(donut: Donut): number {
    return donut.id;
  }

  getItemName(donut: Donut): string {
    return donut.name;
  }

  selectionChanged(donuts: Donut[]) {
    const donut: Donut = (donuts.length > 0) ? donuts[0] : undefined;
    this.selectionChange.emit(donut);
  }

  onDoubleClick(donut: Donut) {
    this.doubleClick.emit(donut);
  }
}
