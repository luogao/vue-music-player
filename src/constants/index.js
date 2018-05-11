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

export const ReadyState = {
  /** 没有关于音频是否就绪的信息 */
  HAVE_NOTHING: 0,
  /** 关于音频就绪的元数据 */
  HAVE_METADATA: 1,
  /** 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒 */
  HAVE_CURRENT_DATA: 2,
  /** 当前及至少下一帧的数据是可用的 */
  HAVE_FUTURE_DATA: 3,
  /** 可用数据足以开始播放 */
  HAVE_ENOUGH_DATA: 4,
};
