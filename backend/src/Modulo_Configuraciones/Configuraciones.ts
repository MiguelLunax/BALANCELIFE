// BALANCELIFE/backend/src/Modulo_Configuraciones/Configuraciones.ts
import ConfiguracionesModel from './ConfiguracionesModel';
import ConfiguracionesController from './ConfiguracionesController';
import ConfiguracionesView from './ConfiguracionesView';

export default class Configuraciones {
    public static readonly createView = (): ConfiguracionesView => {
        const model = new ConfiguracionesModel();
        const controller = new ConfiguracionesController(model);
        return new ConfiguracionesView(controller);
    }
}