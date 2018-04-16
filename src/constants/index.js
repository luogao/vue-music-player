export const PlayState = {
  READY: 'ready', // 就绪,已设置好声音数据
  LOADING: 'loading', // 加载中,1.播放，2.恢复播放，3.seek 引起的声音加载
  PLAYING: 'playing', // 播放中
  PAUSED: 'paused', // 暂停
  STOPED: 'stoped', // 停止,切换声音后触发
  FINISHED: 'finished', // 结束,完整播放后触发
  LOADERROR: 'loaderror', // 下载资源发生错误
};

export const PlayMode = {
  ORDER: 'order', // 顺序
  LOOP: 'loop', // 循环
  RANDOM: 'random', // 随机
};
