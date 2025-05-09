// BALANCELIFE/src/Modulo_Habito/Habito_Hidratacion/Habito_Hidratacion.ts
import Habito_HidratacionModel from './Habito_HidratacionModel';
import Habito_HidratacionController from './Habito_HidratacionController';
import Habito_HidratacionView from './Habito_HidratacionView';

export default class Habito_Hidratacion {
  public static readonly createView = (): Habito_HidratacionView => {
    const model = new Habito_HidratacionModel();
    const controller = new Habito_HidratacionController(model);
    return new Habito_HidratacionView(controller);
  }
}