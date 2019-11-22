import { Controller } from 'egg';

export default class TopicController extends Controller {
  public async topicCommentList() {
      const { ctx } = this;
      const { platform, type, topic, user, secretKey, skip, take, sort } = ctx.request.body;
      console.log('111=>>');
      console.log(ctx.request.body);
      console.log('222=>>');
        // sort为'DESC'时为倒序
        // skip：查询位置，take：查询长度，任一为空就查询全部内容
        // type类型有：'findUserComment','findTopicComment'和'findTopicUserComment',分别是查询用户、讨论、讨论下的用户的查询
      ctx.body = await ctx.service.comment.topicCommentList(platform, topic, type, user, secretKey, skip, take, sort);
  }
  public async deleteComment() {
      const { ctx } = this;
      ctx.body = ctx.request.body;
      const { platform, topic, user, secretKey , id } = ctx.request.body;
      ctx.body = await ctx.service.comment.deleteComment(platform, topic, user, secretKey, id);
  }
  public async changeComment() {
      const { ctx } = this;
      ctx.body = ctx.request.body;
      const { platform, topic, user, secretKey , id ,comment} = ctx.request.body;
      ctx.body = await ctx.service.comment.changeComment(platform, topic, user, secretKey, id,comment);
   }
  public async submitComment() {
      const { ctx } = this;
      ctx.body = ctx.request.body;
   //   ctx.body = `body: ${JSON.stringify(ctx.request.body)}`;
      const { platform, topic, comment, user, secretKey } = ctx.request.body;
     // ctx.body = { platform, topicName, topicKey, comment, userName, userKey };
      ctx.body = await ctx.service.comment.submitComment(platform, topic, comment, user, secretKey);
  }
  public async createPlatform() {
      const { ctx } = this;
      ctx.body = ctx.request.body;
   //   ctx.body = `body: ${JSON.stringify(ctx.request.body)}`;
      const { platformName, secretKey } = ctx.request.body;
     // ctx.body = { platform, topicName, topicKey, comment, userName, userKey };
      ctx.body = await ctx.service.comment.createPlatform(platformName, secretKey);
  }
}
