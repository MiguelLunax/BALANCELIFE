// BALANCELIFE/backend/src/Modulo_InicioDeSesion/Usuario.ts
import UsuarioModel from './UsuarioModel';
import UsuarioController from './UsuarioController';
import UsuarioView from './UsuarioView';

export default class Usuario {
  public static readonly createView = (): UsuarioView => {
    const model = new UsuarioModel();
    const controller = new UsuarioController(model);
    return new UsuarioView(controller);
  }
}