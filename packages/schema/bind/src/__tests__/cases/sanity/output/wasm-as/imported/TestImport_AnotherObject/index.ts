import { Nullable } from "@web3api/wasm-as";
import {
  serializeTestImport_AnotherObject,
  deserializeTestImport_AnotherObject
} from "./serialization";
import * as Objects from "../..";

export class TestImport_AnotherObject {

  public static uri: string = "testimport.uri.eth";

  prop: string;

  static toBuffer(type: TestImport_AnotherObject): ArrayBuffer {
    return serializeTestImport_AnotherObject(type);
  }

  static fromBuffer(buffer: ArrayBuffer): TestImport_AnotherObject {
    return deserializeTestImport_AnotherObject(buffer);
  }
}
