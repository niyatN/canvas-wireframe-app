import { doubleKeypressThresholdInMilliSeconds, getWidthFromPosition, getHeightFromPosition, getTopLeftPosition } from './../../utils/canvasUtil';

describe('canvasUtil', () => {
    describe('getWidthFromPosition', () => {
        it('should return the correct width when currentPosition is greater than startPosition', () => {
            const startPosition = { x: 10, y: 20 };
            const currentPosition = { x: 30, y: 40 };
            expect(getWidthFromPosition(startPosition, currentPosition)).toEqual(20);
        });

        it('should return the correct width when currentPosition is less than startPosition', () => {
            const startPosition = { x: 30, y: 40 };
            const currentPosition = { x: 10, y: 20 };
            expect(getWidthFromPosition(startPosition, currentPosition)).toEqual(20);
        });
    });

    describe('getHeightFromPosition', () => {
        it('should return the correct height when currentPosition is greater than startPosition', () => {
            const startPosition = { x: 10, y: 20 };
            const currentPosition = { x: 30, y: 40 };
            expect(getHeightFromPosition(startPosition, currentPosition)).toEqual(20);
        });

        it('should return the correct height when currentPosition is less than startPosition', () => {
            const startPosition = { x: 30, y: 40 };
            const currentPosition = { x: 10, y: 20 };
            expect(getHeightFromPosition(startPosition, currentPosition)).toEqual(20);
        });
    });

    describe('getTopLeftPosition', () => {
        it('should return the correct top-left position when both positions are positive', () => {
            const position1 = { x: 10, y: 20 };
            const position2 = { x: 30, y: 40 };
            expect(getTopLeftPosition(position1, position2)).toEqual({ x: 10, y: 20 });
        });

        it('should return the correct top-left position when one position is negative', () => {
            const position1 = { x: -10, y: -20 };
            const position2 = { x: 30, y: 40 };
            expect(getTopLeftPosition(position1, position2)).toEqual({ x: -10, y: -20 });
        });
    });

    describe('doubleKeypressThresholdInMilliSeconds', () => {
        it('should have the correct value', () => {
            expect(doubleKeypressThresholdInMilliSeconds).toEqual(300);
        });
    });
});
