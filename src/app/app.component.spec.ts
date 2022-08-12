import { ComponentDecorator } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Calculator } from './calculator';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let calculator = new Calculator();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it(`should have as title 'angular-unit-test-component'`, () => {
    // Assert
    expect(component.title).toEqual('angular-unit-test-component');
  });

  it("#Should multiply two numbers", () => {
    // Arrange
    const a = 2;
    const b = 10;
    let result;

    //Act
    result = calculator.multiply(a, b);

    //Assert
    expect(result).toEqual(20);
  });

  it("#Should divide two numbers", () => {
    // Arrange
    const a = 20;
    const b = 10;
    let result;

    //Act
    result = calculator.divide(a, b);

    //Assert
    expect(result).toEqual(2);
  });
  
});
