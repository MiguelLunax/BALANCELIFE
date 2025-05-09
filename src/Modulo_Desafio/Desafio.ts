// BALANCELIFE/backend/src/Modulo_Desafio/Desafio.ts
import DesafioModel from './DesafioModel';
import DesafioController from './DesafioController';
import DesafioView from './DesafioView';

export default class Desafio {
  public static readonly createView = (): DesafioView => {
    const model = new DesafioModel();
    const controller = new DesafioController(model);
    return new DesafioView(controller);
  }
}