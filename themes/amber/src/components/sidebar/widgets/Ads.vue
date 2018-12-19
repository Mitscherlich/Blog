<template lang="pug">
  transition(name="fade")
    b-carousel.ads.mb-4(indicators, :interval="interval", v-model="slide", v-if="!dismiss")
      b-link(v-for="({ text, image, link }, i) in ads", :key="`ads-${i}`", :href="link", target="_blank")
        b-carousel-slide(:img-src="image", style="height: 160px;")
      span.dismiss.cursor-pointer(@click="dismissAds") &times;
      span.tips {{ $t('ads') }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import store from 'store';

@Component({ name: 'Ads' })
export default class Ads extends Vue {
  private slide: number = 0;
  private dismiss: boolean = false;

  @Prop({ type: Number, default: 10 * 1000 })
  private interval?: number;

  @Prop({ default: [] })
  private ads?: Array<{ text: string; image: string; link: string; }>;

  private beforeMount() {
    const now = Date.now();
    const last = store.get('ads_expire_date', now);
    if (now - last > 1) {
      store.set('dismiss_ads', false);
    }
    this.dismiss = store.get('dismiss_ads', false);
  }

  private dismissAds(e: any) {
    e.preventDefault();
    this.dismiss = true;
    store.set('dismiss_ads', true);
    const now = Date.now();
    const expired = 24 * 60 * 3600; // 1 day
    store.set('ads_expire_date', now + expired);
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/stylus/variables"

.ads
  &:hover
    .dismiss
      display block
  span.dismiss
    z-index 99
    font-size 28px
    display none
    position absolute
    right .5rem
    top -0.5rem
    color color-muted
    &:hover
      color color-light
  span.tips
    position absolute
    padding .1rem .25rem
    right .5rem
    bottom .5rem
    color color-light
    border 1px solid color-light
    border-radius .25rem
    font-size 14px
</style>
