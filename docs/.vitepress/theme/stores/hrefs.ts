import { reactive } from 'vue';
import { Group, items } from '../data/catalog';

interface HrefStore {
  hrefs: string[];
  group?: Group;
  item2?: string;
  set: (item: string) => void;
}

const hrefStore = reactive<HrefStore>({
  hrefs: [],
  set(href) {
    if (href === this.hrefs[0]) {
      return;
    }

    const hrefArr = new URL(href, location.origin).pathname.split('/');
    const item = items.find((item) => item.folder === hrefArr[1]);
    if (item) {
      this.group = item.group;
      this.item2 = decodeURIComponent(hrefArr[2]);
    }

    this.hrefs.unshift(href);
    if (this.hrefs.length > 2) {
      this.hrefs.length = 2;
    }
  },
});

export default hrefStore;
