// BALANCELIFE/backend/src/Modulo_Avatar/Avatar.ts
import AvatarModel from './AvatarModel';
import AvatarController from './AvatarController';
import AvatarView from './AvatarView';

export default class Avatar {
  public static readonly createView = (): AvatarView => {
    const model = new AvatarModel();
    const controller = new AvatarController(model);
    return new AvatarView(controller);
  }
}