import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

let app = null;
let appContainer = null; // 用来记录真实的挂载容器

/** 启动前的初始化，只执行一次 */
export async function bootstrap() {
  console.log('[vue] app bootstraped');
}

/** 挂载函数：每次进入子应用时触发 */
export async function mount(props) {
  console.log('[vue] props from main framework', props);

  app?.unmount();
  console.log(app, "app")

  // ✅ 从乾坤的 props 中拿到子应用容器
  const { container } = props;

  appContainer = container
    ? container.querySelector('#app')
    : document.querySelector('#app');

  app = createApp(App);
  app.use(router);
  app.use(store);
  app.mount(appContainer);

  console.log('[vue] app mounted');
}

/** 卸载函数：退出子应用时触发 */
export async function unmount() {
  if (app) {
    app.unmount();
    app = null;
  }

  // ✅ 清空容器内容（防止 Qiankun 缓存旧 DOM）
  if (appContainer) {
    appContainer.innerHTML = '';
    appContainer = null;
  }

  console.log('[vue] app unmounted and container cleared');
}
