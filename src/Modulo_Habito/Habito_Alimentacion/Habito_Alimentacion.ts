// BALANCELIFE/backend/src/Modulo_Habito/Habito_Alimentacion/Habito_Alimentacion.ts
import Habito_AlimentacionModel from './Habito_AlimentacionModel';
import Habito_AlimentacionController from './Habito_AlimentacionController';
import Habito_AlimentacionView from './Habito_AlimentacionView';

export default class Habito_Alimentacion {
  public static readonly createView = (): Habito_AlimentacionView => {
    const model = new Habito_AlimentacionModel();
    const controller = new Habito_AlimentacionController(model);
    return new Habito_AlimentacionView(controller);
  }
}