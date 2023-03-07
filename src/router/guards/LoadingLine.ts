import type { Router } from 'vue-router';
import {NProgress} from 'nprogress';
import 'nprogress/nprogress.css';

export function LoadingLine(router: Router) {
  // 进度条
  NProgress.configure({ showSpinner: false });

  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    // console.log(to.fullPath);
    // go(to.fullPath);
    next();
  });
  router.afterEach(() => {
    NProgress.done();
  });
}
