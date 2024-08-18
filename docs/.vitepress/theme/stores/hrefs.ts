import { reactive } from 'vue';
import { Group, items } from '../data/catalog';

interface HrefStore {
  hrefs: string[];
  group?: Group;
  item2?: string;
  set: (toHref?: string) => void;
}

const hrefStore = reactive<HrefStore>({
  hrefs: [],
  set(toHref) {
    let url = { href: '', pathname: '' };
    if (!import.meta.env.SSR) {
      url = toHref ? new URL(toHref, location.origin) : location;
    }

    if (url.href === this.hrefs[0]) {
      return;
    }

    const hrefArr = url.pathname.split('/');
    const item = items.find((item) => item.folder === hrefArr[1]);
    if (item) {
      this.group = item.group;
      this.item2 = decodeURIComponent(hrefArr[2]);
    }

    this.hrefs.unshift(url.href);
    if (this.hrefs.length > 2) {
      this.hrefs.length = 2;
    }
  },
});

export default hrefStore;
