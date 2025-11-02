import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

let app = null;

/** 启动前的初始化，只执行一次 */
export async function bootstrap() {
  console.log('[vue] app bootstraped');
}

/** 挂载函数：每次进入子应用时触发 */
export async function mount(props) {
  console.log('[vue] props from main framework', props);

  app = createApp(App);
  app.use(router);
  app.use(store);
  app.mount('#app'); // ⚠️ 必须与主应用的容器对应
}

/** 卸载函数：退出子应用时触发 */
export async function unmount() {
  if (app) {
    app.unmount();
    app = null;
  }
  console.log('[vue] app unmounted');
}
