import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('#Should transform "roma" to "amor"', () => {
    // Arrange
    const pipe = new ReversePipe();
    const rta = pipe.transform('roma');

    // Assert
    expect(rta).toEqual('amor')
  });

  it('#Should transform "123" to "321"', () => {
    // Arrange
    const pipe = new ReversePipe();
    const rta = pipe.transform('123');

    // Assert
    expect(rta).toEqual('321')
  });
});

@Component({
  template: `
    <h5>{{ 'amor' | reverse }}</h5>
    <input [(ngModel)]="text">
    <p>{{ text | reverse }}</p>
  `
})

class HostComponent {
  text:string = ''
}

describe('ReversePipe from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, ReversePipe ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#Should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('#Should the h5 be "roma"', () => {
    // Arrange
    const h5De = fixture.debugElement.query(By.css('h5'));
    
    // Assert
    expect(h5De.nativeElement.textContent).toEqual('roma');
  });

  it('#Should apply reverse pipe when typing in the input', () => {
    // Arrange
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    const pDe = fixture.debugElement.query(By.css('P'));

    
    // Assert
    expect(pDe.nativeElement.textContent).toEqual('');

    // Act
    inputEl.value = "pokemon";
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert
    expect(pDe.nativeElement.textContent).toEqual('nomekop');
  });
});