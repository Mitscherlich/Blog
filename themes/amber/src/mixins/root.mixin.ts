import { Vue, Component } from 'vue-property-decorator';
import { IRootState } from '@/store/index';

import HexoConfig from '@/models/hexo';
import ThemeConfig from '@/models/theme';

import Loading from '@/components/partials/Loading.vue';

declare module 'vue/types/vue' {
  interface Vue {
    site: HexoConfig;
    themeConfig: ThemeConfig;
    sideabr: boolean;
    isHome(): boolean;
    isPost(): boolean;
    isPage(): boolean;
  }
}

// register global components
Vue.component('loading', Loading);

@Component({
  name: 'Root',
})
export default class RootMixin extends Vue {
  private get state(): IRootState {
    return this.$store.state as IRootState;
  }

  public get site() {
    return this.state.site;
  }

  public get themeConfig() {
    return this.state.themeConfig;
  }

  public get sidebar() {
    return this.$route.meta.sidebar !== false;
  }

  public isHome(): boolean {
    return this.$route.meta.home === true;
  }

  public isPost(): boolean {
    return this.$route.meta.post === true;
  }

  public isPage(): boolean {
    return this.$route.meta.page === true;
  }
}
