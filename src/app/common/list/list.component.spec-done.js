import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ListItem } from './list-item.interface';
import { SelectableDirective } from '../selectable.directive';
import { By } from '@angular/platform-browser';

interface UnitTestListItem extends ListItem {
  id: number;
  name: string;
  pill?: number;
  icon?: string;
}

function getListItems(): Array<UnitTestListItem> {
  return [{
    id: 0,
    name: 'zero',
    pill: 0,
    icon: 'ZERO'
  }, {
    id: 1,
    name: 'one',
    pill: 1,
    icon: 'ONE'
  }, {
    id: 2,
    name: 'two',
    pill: 2,
    icon: 'TWO'
  }];
}

function getItemId(item: UnitTestListItem): number {
  return item.id;
}

function getItemName(item: UnitTestListItem): string {
  return item.name;
}

function getItemPill(item: UnitTestListItem): number {
  return item.pill;
}

function getItemStatusIcon(item: UnitTestListItem): string {
  return item.icon;
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const listItems = getListItems();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent,
        SelectableDirective
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    // COMMON STUFF AND CHANGE DETECTION'
    component.listItems = listItems;
    component.itemIdAccessor = getItemId;
    component.itemNameAccessor = getItemName;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // should render list items
  it('should render list items', () => {
    fixture.detectChanges();
    const renderedListItems = fixture.debugElement.queryAll(By.css('li'));
    expect(renderedListItems.length).toBe(3);
    expect(renderedListItems[0].nativeElement.innerText)
      .toContain(listItems[0].name);
    expect(renderedListItems[1].nativeElement.innerText)
      .toContain(listItems[1].name);
    expect(renderedListItems[2].nativeElement.innerText)
      .toContain(listItems[2].name);
  });

  // should render pill values
  it('should render pill values', () => {
    component.showPill = true;
    component.itemPillValueAccessor = getItemPill;
    fixture.detectChanges();
    const pills = fixture.debugElement.queryAll(By.css('.badge-pill'));
    expect(pills.length).toBe(3);
    expect(pills[0].nativeElement.innerText).toContain(listItems[0].pill);
    expect(pills[1].nativeElement.innerText).toContain(listItems[1].pill);
    expect(pills[2].nativeElement.innerText).toContain(listItems[2].pill);
  });

  // should render status icon??? How?
  it('should render status icon', () => {
    component.showStatusIcon = true;
    component.itemStatusIconAccessor = getItemStatusIcon;
    fixture.detectChanges();
    const statusIcons = fixture.debugElement.queryAll(By.css('.status-icon'));
    expect(statusIcons).toBeTruthy();
    expect(statusIcons.length).toBe(3);
    expect(statusIcons[0].nativeElement.innerText).toContain(listItems[0].icon);
  });

  // ng test --code-coverage
});
