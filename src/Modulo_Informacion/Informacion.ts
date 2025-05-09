// BALANCELIFE/backend/src/Modulo_Informacion/Informacion.ts
import InformacionModel from './InformacionModel';
import InformacionController from './InformacionController';
import InformacionView from './InformacionView';

export default class Informacion {
  public static readonly createView = (): InformacionView => {
    const model = new InformacionModel();
    const controller = new InformacionController(model);
    return new InformacionView(controller);
  }
}