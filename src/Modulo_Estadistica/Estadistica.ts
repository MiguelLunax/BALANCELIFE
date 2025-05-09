// BALANCELIFE/backend/src/Modulo_Estadistica/Estadistica.ts
import EstadisticaModel from './EstadisticaModel';
import EstadisticaController from './EstadisticaController';
import EstadisticaView from './EstadisticaView';

export default class Estadistica {
    public static readonly createView = (): EstadisticaView => {
        const model = new EstadisticaModel();
        const controller = new EstadisticaController(model);
        return new EstadisticaView(controller);
    }
}