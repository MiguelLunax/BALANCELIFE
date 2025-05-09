// BALANCELIFE/backend/src/Modulo_Habito/Habito_Alimentacion/Habito_Alimentacion.ts
import Habito_AlimentacionView from './Habito_AlimentacionView';

export default class Habito_Alimentacion {
  public static readonly createView = (): Habito_AlimentacionView => {
    return new Habito_AlimentacionView();
  }
}