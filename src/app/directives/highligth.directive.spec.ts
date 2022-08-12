import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HighligthDirective } from './highligth.directive';

@Component({
  template: `
    <h5 class="title-d" highligth>default</h5>
    <h5 class="title-c" highligth="green">color</h5>
    <p highligth="purple">parrafo default</p>
    <p>sin directiva</p>
    <input [(ngModel)]="color" [highligth]="color">
  `
})

class HostComponent {
  color:string = 'DarkTurquoise'
}

describe('HighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, HighligthDirective ],
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

  it('#Should have three highligth element', () => {
    // Arrange
    const element = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    const elemetWithout = fixture.debugElement.queryAll(By.css('*:not([highligth])'))
  
    // Assert
    expect(element.length).toEqual(4);
    expect(elemetWithout.length).toEqual(2);
  });

  it('#Should the element be match with bgColor', () => {
    // Arrange
    const element = fixture.debugElement.queryAll(By.directive(HighligthDirective));
  
    // Assert
    expect(element[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(element[1].nativeElement.style.backgroundColor).toEqual('green');
    expect(element[2].nativeElement.style.backgroundColor).toEqual('purple');
  });

  it('#Should the h5.title-d be dwfaultColor', () => {
    // Arrange
    const titleDe = fixture.debugElement.query(By.css('.title-d'));
    const dir = titleDe.injector.get(HighligthDirective);

    // Assert
    expect(titleDe.nativeElement.style.backgroundColor).toEqual(dir.defaultColor);
  });

  it('#Should the h5.title-c be dwfaultColor', () => {
    // Arrange
    const titleDe = fixture.debugElement.query(By.css('.title-c'));
    const dir = titleDe.injector.get(HighligthDirective);

    // Assert
    expect(titleDe.nativeElement.style.backgroundColor).toEqual(dir.bgColor);
  });

  it('#Should bind <input> and change the bgColor', () => {
    // Arrange
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    
    // Assert
    expect(inputEl.style.backgroundColor).toEqual('darkturquoise');
    
    // Act
    inputEl.value = 'red';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert
    expect(inputEl.style.backgroundColor).toEqual('red');
    expect(component.color).toEqual('red');
  });
  
});
