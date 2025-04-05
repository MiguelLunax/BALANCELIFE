// BALANCELIFE/backend/src/Modulo_Tutorial/Tutorial.ts
import TutorialModel from './TutorialModel';
import TutorialController from './TutorialController';
import TutorialView from './TutorialView';

export default class Tutorial {
  public static readonly createView = (): TutorialView => {
    const model = new TutorialModel();
    const controller = new TutorialController(model);
    return new TutorialView(controller);
  }
}