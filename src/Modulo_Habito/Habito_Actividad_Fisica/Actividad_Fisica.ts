// BALANCELIFE/backend/src/Modulo_Habito/Habito_Actividad_Fisica/Actividad_Fisica.ts
import Habito_Actividad_FisicaController from './Habito_Actividad_FisicaController';
import Habito_Actividad_FisicaView from './Habito_Actividad_FisicaView';

export default class Actividad_Fisica {
  public static readonly createView = (): Habito_Actividad_FisicaView => {
    const controller = new Habito_Actividad_FisicaController();
    return new Habito_Actividad_FisicaView(controller);
  }
}