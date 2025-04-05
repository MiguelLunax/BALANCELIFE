// BALANCELIFE/backend/src/Modulo_Logro/Logro.ts
import LogroModel from './LogroModel';
import LogroController from './LogroController';
import LogroView from './LogroView';

export default class Logro {
    public static readonly createView = (): LogroView => {
        const model = new LogroModel();
        const controller = new LogroController(model);
        return new LogroView(controller);
    }
}