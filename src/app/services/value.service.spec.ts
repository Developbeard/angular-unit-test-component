import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    service = new ValueService();
  })

  it('should be created', () => {
    // Assert
    expect(service).toBeTruthy();
  });

  describe('when call function getValue', () => {
    it('#Should return "My Value" when call function getValue', () => {
      // Assert
      expect(service.getValue()).toBe("My Value");
    });
  });

  describe('when call function setValue', () => {
    it('#Should return "Change" when call function setValue', () => {
      // Assert
      expect(service.getValue()).toBe('My Value');
      
      // Act
      service.setValue('Change');
      
      // Assert
      expect(service.getValue()).toBe('Change');
    });
  });

  describe('when call function getPromiseValue', () => {
    it('#Should return "Promise Value" with then when call function getPromiseValue', (doneFn) => {
      // Act
      service.getPromiseValue()
      .then((value) => {

        // Assert
        expect(value).toBe('Promise Value');
        doneFn();
      })
    });

    it('#Should return "Promise Value" with async when call function getPromiseValue', async() => {
      // Arrange
      const resp = await service.getPromiseValue();

      // Assert
      expect(resp).toBe('Promise Value');
    });
  });

  describe('when call function getObservableValue', () => {
    it('#Should return "Promise Value" with subscribe when call function getObservableValue', (doneFn) => {
      // Act
      service.getObservableValue()
      .subscribe((value) => {

        // Assert
        expect(value).toBe('Observable Value');
        doneFn();
      })
    });
  });
});
