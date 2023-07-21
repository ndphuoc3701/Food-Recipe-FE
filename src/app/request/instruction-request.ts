import { ImageInstructionRequest } from "./image-instruction-request";

export class InstructionRequest {
  constructor(public content: string, public stepOrder: number, public imageInstructionRequests: ImageInstructionRequest[]) { }
}