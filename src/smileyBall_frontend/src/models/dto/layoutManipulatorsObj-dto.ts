// @ts-nocheck
export class LayoutManipulatorsObjDto {
  #isVertical: boolean = false;
  #hasBorder: boolean = false;
  #isSquarish: boolean = false;

  constructor({
    isVertical,
    hasBorder,
    isSquarish,
  }: LayoutManipulatorsObjDto | null) {
    this.#isVertical = isVertical || false;
    this.#hasBorder = hasBorder || false;
    this.#isSquarish = isSquarish || false;

    Object.preventExtensions(this as Object);
  }

  get isVertical() {
    return this.#isVertical;
  }

  set isVertical(value) {
    this.#isVertical = value;
  }

  get hasBorder() {
    return this.#hasBorder;
  }

  set hasBorder(value) {
    this.#hasBorder = value;
  }

  get isSquarish() {
    return this.#isSquarish;
  }

  set isSquarish(value) {
    this.#isSquarish = value;
  }
}
