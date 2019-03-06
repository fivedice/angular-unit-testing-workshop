import { SelectableDirective } from './selectable.directive';
import { Component } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('SelectableDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectableDirective,
        TestComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new SelectableDirective();
    expect(directive).toBeTruthy();
  });

  // should not have active class when selected is false
  it('should not have active class when selected is false', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.active'))).toBeFalsy();
  });

  // should have active class when selected is true
  it('should have active class when selected is true', () => {
    component.selected = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.active'))).toBeTruthy();
  });

  it('can toggle', () => {
    component.selected = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.active'))).toBeTruthy();

    component.selected = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.active'))).toBeFalsy();
  });

});

// Test Component
@Component({
  selector: `app-test`,
  template: `<div appSelectable [selected]="selected">Hello</div>`
})
class TestComponent {
  selected = false;
}
