import CartasModel from './CartasModel'
import CartasController from './CartasController' 
import CartasView from './CartasView'

export default class Cartas {
  public static readonly createView = (): CartasView => {
    const model = new CartasModel()
    const controller = new CartasController(model)
    return new CartasView(controller)  
  }
}