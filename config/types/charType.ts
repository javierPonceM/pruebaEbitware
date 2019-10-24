export default class Char {
    private _value:number;

    constructor(char: number | string){
        this.setValue(char);
    }

    public get getValue():string {
        return String.fromCharCode(this._value);
    }
    public set setValue(char: number | string) {
          if (typeof char === "number") {
              this._value = char;
          }
          else {
            this._value = char.charCodeAt(0);
          }
    }
}