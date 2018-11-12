import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//importar timelinecomponent
import { TimelineComponent } from './timeline.component';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;
  let element: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimelineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create timeline', () => {
    const fixture = TestBed.createComponent(TimelineComponent);
    const timeline = fixture.debugElement.componentInstance;
    expect(timeline).toBeTruthy();
  });

  it('should render posts', () => {
    expect(element.querySelector('#post-list'));
  });

  it('should load the menu', () => {
    expect(element.querySelector('#menu'));
  });

  it('should call some method', () => {
    component.method();
    fixture.detectChanges();

    // expect(compiled.querySelector('h1').textContent).toContain('Welcome to aula3-tests!');
  });
});
