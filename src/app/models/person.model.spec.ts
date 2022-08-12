import { PersonClass } from "./person.model";

describe('PersonClass', () => {
    let person: PersonClass;

    beforeEach(() => {
        person = new PersonClass('Rodrigo', 'de La Barrera', 30, 99, 1.74);
    });

    it('#Should set all atributes', () => {
        // Assert
        expect(person.name).toEqual('Rodrigo');
        expect(person.lastName).toEqual('de La Barrera');
        expect(person.age).toEqual(30);
        expect(person.weigth).toEqual(99);
        expect(person.heigth).toEqual(1.74);
    });

    describe('when call function calcIMC', () => {
        it('#Should return down when call function calcIMC', () => {
            // Arrange
            person.weigth = 24;
            person.heigth = 1.65;

            // Act
            const result = person.calcIMC();

            // Assert
            expect(result).toEqual('down');
        });
        it('#Should return normal when call function calcIMC', () => {
            // Arrange
            person.weigth = 58;
            person.heigth = 1.65;

            // Act
            const result = person.calcIMC();

            // Assert
            expect(result).toEqual('normal');
        });
        it('#Should return overweigth when call function calcIMC', () => {
            // Arrange
            person.weigth = 72;
            person.heigth = 1.65;

            // Act
            const result = person.calcIMC();

            // Assert
            expect(result).toEqual('overweigth');
        });
        it('#Should return overweigth level 1 when call function calcIMC', () => {
            // Arrange
            person.weigth = 80;
            person.heigth = 1.65;

            // Act
            const result = person.calcIMC();

            // Assert
            expect(result).toEqual('overweigth level 1');
        });
        it('#Should return overweigth level 2 when call function calcIMC', () => {
            // Arrange
            person.weigth = 95;
            person.heigth = 1.65;

            // Act
            const result = person.calcIMC();

            // Assert
            expect(result).toEqual('overweigth level 2');
        });
        it('#Should return overweigth level 3 when call function calcIMC', () => {
            // Arrange
            person.weigth = 110;
            person.heigth = 1.65;

            // Act
            const result = person.calcIMC();

            // Assert
            expect(result).toEqual('overweigth level 3');
        });
        it('#Should return not found if result is less than zero when call function calcIMC', () => {
            // Arrange
            person.weigth = -15;
            person.heigth = 1.65;

            // Act
            const result = person.calcIMC();

            // Assert
            expect(result).toEqual('not found');
        });
        it('#Should return not found if weigth is not set when call function calcIMC', () => {
            // Arrange
            person.weigth = NaN;
            person.heigth = 1.65;

            // Act
            const result = person.calcIMC();

            // Assert
            expect(result).toEqual('not found');
        });

        it('#Should return not found if heigth is not set when call function calcIMC', () => {
            // Arrange
            person.weigth = 150;
            person.heigth = NaN;

            // Act
            const result = person.calcIMC();
            
            // Assert
            expect(result).toEqual('not found');
        });
    });
}); 