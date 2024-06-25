// @ts-nocheck
import { Texture } from "@/types/Grid";
import { TextureStyleObjDto } from "@/models/dto/textureStyleObj-dto";
import { TextGridObjDto } from "@/models/dto/textGridObj-dto";
import { LayoutManipulatorsObjDto } from "../models/dto/layoutManipulatorsObj-dto";

interface PixelMapInterface {
  text: string;
  texture: Texture;
  initialValues: Pick<"initialVal", Texture>;
}

export class PixelMap {
  #TextGridObjDto;
  #Options;
  #InitialValues;

  text: string;

  constructor({ text, texture }: PixelMapInterface) {
    this.#TextGridObjDto = new TextGridObjDto({ text });
    this.#Options = new LayoutManipulatorsObjDto(texture.options || null);
    this.#InitialValues = new TextureStyleObjDto(texture.initialVal);

    this.text = text;

    Object.preventExtensions(this as Object);
  }

  set Options({ manipulatorName, value }) {
    this.#Options[manipulatorName] = value;
  }

  set TextGridObjDto({ manipulatorName, value }) {
    this.#TextGridObjDto[manipulatorName] = value;
  }
}
