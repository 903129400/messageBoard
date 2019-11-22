import { Service } from 'egg';
import { Comment } from '../entity/Comment';
import { Platform } from '../entity/Platform';
/**
 * Test Service
 */
export default class Comments extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async topicCommentList(platform, topic, type, user, secretKey, skip, take, sort) {
    const { ctx } = this;
    const thisPlatform = await ctx.repo.Platform.findOne({ platformName: platform });
    if (!thisPlatform || thisPlatform.secretKey !== secretKey) return 'secretKey is error';
    console.log(thisPlatform);
    let comment = {};
    let content = {};
    if (type === 'findUserComment') {
      content = { platform: { ...thisPlatform }, user , state: 1 };
    } else if (type === 'findTopicComment') {
      content = { platform: { ...thisPlatform }, topic, state: 1 } ;
    } else if (type === 'findTopicUserComment') {
      content = { platform: { ...thisPlatform }, topic, user, state: 1 };
    } else return 'not find select type';
    if (skip + '' && take + '') content = { where: content, skip, take , order: { id: sort } };
    console.log(content);
    comment = await ctx.repo.Comment.findAndCount(content);
    return comment;
  }
  public async deleteComment(platform, topic, user, secretKey, id) {
    const { ctx } = this;

    const thisPlatform = await ctx.repo.Platform.findOne({ platformName: platform });
    if (!thisPlatform) return 'no comment';
    if (thisPlatform.secretKey !== secretKey) return 'secretKey is error';
    const thisComment = await ctx.repo.Comment.findOne({ where: { platform: thisPlatform, id } });
    if (!thisComment) return 'no comment';
    thisComment.state = 0;
    let result;
    try { result = await ctx.repo.Comment.save(thisComment); } catch (e) { result = e; }
    console.log(thisComment);
    console.log(thisPlatform);

    console.log(platform, topic, user, secretKey);
    return result;
  }
  public async changeComment(platform, topic, user, secretKey, id, comment) {
    const { ctx } = this;

    const thisPlatform = await ctx.repo.Platform.findOne({ platformName: platform });
    if (!thisPlatform) return 'no comment';
    if (thisPlatform.secretKey !== secretKey) return 'secretKey is error';
    const thisComment = await ctx.repo.Comment.findOne({ where: { platform: thisPlatform, id } });
    if (!thisComment) return 'no comment';
    thisComment.comment = comment;
    let result;
    try { result = await ctx.repo.Comment.save(thisComment); } catch (e) { result = e; }
    console.log(thisComment);
    console.log(thisPlatform);

    console.log(platform, topic, user, secretKey);
    return result;
}
  public async submitComment(platform, topic, comment, user, secretKey) {
      const { ctx } = this;
      const thisPlatform = await ctx.repo.Platform.findOne({ platformName: platform });
      if (!thisPlatform) return 'no comment';
      if (thisPlatform.secretKey !== secretKey) return 'secretKey is error';
      const newComment = new Comment();
      newComment.comment = comment;
      newComment.createdAt = new Date();
      newComment.updatedAt = new Date();
      newComment.state = 1;
      newComment.topic = topic;
      newComment.user = user;
      newComment.platform = thisPlatform;
      return ctx.repo.Comment.save(newComment).then(() => {
        return 'success';
      }).catch(() => {
        return 'submit error';
      });
  }
  public async createPlatform(platformName, secretKey) {
      const { ctx } = this;
      const thisPlatform = await ctx.repo.Platform.findOne({ platformName });
      if (thisPlatform) return 'platform is existing';
      const newPlatform = new Platform();
      newPlatform.platformName = platformName;
      newPlatform.secretKey = secretKey;
      return ctx.repo.Platform.save(newPlatform).then(() => {
      return 'success';
    }).catch(() => {
      return 'create error';
    });
    }
}
