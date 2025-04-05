// BALANCELIFE/backend/src/Modulo_Habito/Habito_Sueno/Habito_Sueno.ts
import Habito_SuenoModel from './Habito_SuenoModel';
import Habito_SuenoController from './Habito_SuenoController';
import Habito_SuenoView from './Habito_SuenoView';

export default class Habito_Sueno {
  public static readonly createView = (): Habito_SuenoView => {
    const model = new Habito_SuenoModel();
    const controller = new Habito_SuenoController(model);
    return new Habito_SuenoView(controller);
  }
}