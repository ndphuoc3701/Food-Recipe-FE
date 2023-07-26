import { Image } from "./image";

export class Instruction {
  constructor(public content: string, public stepOrder: number, public images: Image[]) { }
}