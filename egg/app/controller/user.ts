import { Controller } from 'egg';

export default class UserController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = `user: ${ctx.params.id},${ctx.params.platform}`;
  }
}
