import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { defer, of } from 'rxjs';
import { generateManyProducts } from 'src/app/models/product.mock';
import { ValueService } from 'src/app/services/value.service';
import { ProductsService } from '../../services/products.service';
import { ProductComponent } from '../product/product.component';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    const spyProduct = jasmine.createSpyObj('ProductsService', ['getAll']);
    const spyValue = jasmine.createSpyObj('ValueService', ['getPromiseValue']);
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent ],
      providers: [
        { provide: ProductsService, useValue: spyProduct },
        { provide: ValueService, useValue: spyValue }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    const productsMock = generateManyProducts(6);
    productService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges();
  });

  it('#Should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('#Should call funtion getAll', () => {
    // Assert
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('when call function getAllProducts', () => {
    describe('when it is a successful response', () => {
      it('#Should return product list form service when it is a successful response and when call function getAllProduts', () => {
        // Arrange
        const productsMock = generateManyProducts(6);
        productService.getAll.and.returnValue(of(productsMock));
        const countPrev = component.products.length;
  
        // Act
        component.getAllProducts();
        fixture.detectChanges();
  
        // Assert
        expect(component.products.length).toEqual(productsMock.length + countPrev);
      });

      it('#Should display product list in app-product when it is a successful response and when call function getAllProducts', fakeAsync(() => {
          // Arrange
          const mockProduct = generateManyProducts(6);
          productService.getAll.and.returnValue(defer(() => Promise.resolve(mockProduct)));
          const countProduct = component.products.length;
          const btnDe = fixture.debugElement.query(By.css('.btn-load'));

          // Act
          btnDe.triggerEventHandler('click', null);
          tick();
          fixture.detectChanges();
          const appProductDe = fixture.debugElement.queryAll(By.css('app-product'));

          //Assert
          expect(appProductDe.length).toEqual(mockProduct.length + countProduct);
        }
      ));
  
      it('#Should change the satus "loading" to "success" when it is a successful response and when call function getAllProducts', fakeAsync(() => {
        // Arrange
        const productsMock = generateManyProducts();
        productService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));
  
        // Act
        component.getAllProducts();
        fixture.detectChanges();
  
        // Assert <------ Se coloca el expect antes del tick para valores anteriores a la llamada del metodo del servicio
        expect(component.status).toBe('loading');
        tick();
        fixture.detectChanges();
  
        // Assert
        expect(component.status).toBe('success');
      }));

      it('#Should show "Load more" in the button when it is a successful response and when call function getAllProducts', fakeAsync(() => {
        // Arrange
        const productsMock = generateManyProducts(6);
        productService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));
        const btnDe = fixture.debugElement.query(By.css('.btn-load'));

        // Act
        btnDe.triggerEventHandler('click', null);
        tick();
        fixture.detectChanges();
        
        // Assert
        expect(btnDe.nativeElement.textContent).toBe('Load more');
      }));
    });
    describe('when the response is loading', () => {
      it('#Should show "Loading" in the button when the response is loading and when call function getAllProducts', fakeAsync(() => {
        // Arrange
        const productsMock = generateManyProducts(6);
        productService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));
        const btnDe = fixture.debugElement.query(By.css('.btn-load'));

        // Act
        btnDe.triggerEventHandler('click', null);
        fixture.detectChanges();

        // Assert
        expect(btnDe.nativeElement.textContent).toBe('Loading');
        tick();
        fixture.detectChanges();
      }));

      it('#Should disabled button when the response is loading and when call function getAllProducts', fakeAsync(() => {
        // Arrange
        const productsMock = generateManyProducts(6);
        productService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));
        const btnDe = fixture.debugElement.query(By.css('.btn-load'));

        // Act
        btnDe.triggerEventHandler('click', null);
        fixture.detectChanges();

        // Assert
        expect(btnDe.nativeElement.disabled).toBeTruthy();
        tick();
        fixture.detectChanges();
      }));
    });
    describe('when it is a wrong response', () => {
      it('#Should change the satus "loading" to "error" when it is a wrong response and when call function getAllProducts', fakeAsync(() => {
        // Arrange
        const errorMock = 'Ha ocurrido un error';
        productService.getAll.and.returnValue(defer(() => Promise.reject(errorMock)));
  
        // Act
        component.getAllProducts();
        fixture.detectChanges();
  
        // Assert <------ Se coloca el expect antes del tick para valores anteriores a la llamada del metodo del servicio
        expect(component.status).toBe('loading');
        tick(3000);
        fixture.detectChanges();
  
        // Assert 
        expect(component.status).toBe('error');
      }));

      it('#Should empty the list of products when it is a wrong response and when call function getAllProducts', fakeAsync(() => {
        // Arrange
        const errorMock = 'Ha ocurrido un error';
        productService.getAll.and.returnValue(defer(() => Promise.reject(errorMock)));
        const btnDe = fixture.debugElement.query(By.css('.btn-load'));
  
        // Act
        btnDe.triggerEventHandler('click', null);
        tick(3000);
        fixture.detectChanges();
  
        // Assert 
        expect(component.products.length).toBe(0);
      }));

      it('#Should show "Error" in the button when it is a wrong response and when call function getAllProducts', fakeAsync(() => {
        // Arrange
        const errorMock = 'Ha ocurrido un error';
        productService.getAll.and.returnValue(defer(() => Promise.reject(errorMock)));
        const btnDe = fixture.debugElement.query(By.css('.btn-load'));
  
        // Act
        btnDe.triggerEventHandler('click', null);
        tick(3000);
        fixture.detectChanges();
  
        // Assert 
        expect(btnDe.nativeElement.textContent).toBe('Error');
      }));
    });

  });

  describe('when call function callPromise', () => {
    it('#Should call to promise when call function callPromise', async() => {  //<------ Para las promesas se puede usar el async await o el fakeAsync tick()
      // Arrange
      const mockMessage = "Promise mock string"
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMessage));

      // Act
      await component.callPromise();
      fixture.detectChanges();
      
      // Assert
      expect(component.responseString).toEqual(mockMessage);
    });
  });

  describe('when btn was clicked', () => {
    it('#Should show the "Promise mock string" when btn was clicked', fakeAsync(() => {  //<------ Cuando se esta probando la llamada de un metodo desde el DOM es necesario realizaro con fakeAsync tick(), no se puede usar async await
      // Arrange
      const mockMessage = "Promise mock string";
      const buttonDe = fixture.debugElement.query(By.css('button.btn-promise'));
      const pDe = fixture.debugElement.query(By.css('p.rta-promise'));
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMessage));

      // Act
      buttonDe.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      
      // Assert
      expect(pDe.nativeElement.textContent).toEqual(mockMessage)
    }));
  });
  
});
