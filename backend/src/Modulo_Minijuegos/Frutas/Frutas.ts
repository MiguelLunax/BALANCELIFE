import FrutasModel from './FrutasModel'
import FrutasController from './FrutasController' 
import FrutasView from './FrutasView'

export default class Frutas {
  public static readonly createView = (): FrutasView => {
    const model = new FrutasModel()
    const controller = new FrutasController(model)
    return new FrutasView(controller)  
  }
}