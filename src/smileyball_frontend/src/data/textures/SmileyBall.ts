import { TextureStyleObjDto } from "@/models/dto/textureStyleObj-dto";
import { Texture } from "@/types/Letter";

const data: Texture = {
  options: {
    skin: "1",
    size: "16px",
    set: "twitter",
    fallback: ":shrug:",
  },
  initialVal: new TextureStyleObjDto({
    main: "🙂",
    background: "♾️",
    border: "🚀",
    outline: null
  }),
};

export default data;
