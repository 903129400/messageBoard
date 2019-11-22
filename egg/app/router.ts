import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/platform/comments', controller.topic.topicCommentList);  // 获取评论信息
  router.post('/submitComments', controller.topic.submitComment); // 提交评论
  router.post('/changeComments', controller.topic.changeComment); // 修改评论
  router.post('/createPlatform', controller.topic.createPlatform); // 创建平台
  router.delete('/deleteComments', controller.topic.deleteComment); // 删除评论
};
