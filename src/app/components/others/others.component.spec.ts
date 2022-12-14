import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighligthDirective } from 'src/app/directives/highligth.directive';
import { ReversePipe } from 'src/app/pipes/reverse.pipe';

import { OthersComponent } from './others.component';

describe('OthersComponent', () => {
  let component: OthersComponent;
  let fixture: ComponentFixture<OthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthersComponent, ReversePipe, HighligthDirective ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
