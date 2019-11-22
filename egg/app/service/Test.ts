import { Service } from 'egg';

/**
 * Test Service
 */
export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    this.ctx.body = name;
    // const { ctx } = this;
    // const user = await ctx.repo.User.find();
    // console.log(user);
    // return `hi, ${name},${user}`;
  }
}
