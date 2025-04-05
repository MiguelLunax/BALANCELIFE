// BALANCELIFE/backend/src/Modulo_Habito/Anadir_Habito/Anadir.ts
import Anadir_HabitoModel from './Anadir_HabitoModel';
import Anadir_HabitoController from './Anadir_HabitoController';
import Anadir_HabitoView from './Anadir_HabitoView';

export default class Anadir {
  public static readonly createView = (): Anadir_HabitoView => {
    const model = new Anadir_HabitoModel();
    const controller = new Anadir_HabitoController(model);
    return new Anadir_HabitoView(controller);
  }
}