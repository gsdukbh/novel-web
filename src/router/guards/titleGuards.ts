import { setTitle } from '@/utils';
import type { Router } from 'vue-router';

import { title } from '@/config/defaultSetting';

export function createTitleGuard(router: Router) {
  router.beforeEach(async (to) => {
    to.name !== 'Redirect' && setTitle(to.meta.title as string, title);
  });
}
