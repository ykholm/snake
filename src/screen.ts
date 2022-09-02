export class Screen {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
    }

    public getWidth(): number {
        return this.width
    }

    public getHeight(): number {
        return this.height
    }

    public ratio(): number {
        return this.width / this.height
    }
}