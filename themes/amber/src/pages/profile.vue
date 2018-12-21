<template lang="pug">
  .rounded(style="min-height: 65vh;")
    transition(name="fade", mode="out-in")
      b-container.profile.box-shadow(v-if="ready"): b-row
        b-col(md=4)
          .profile-img
            b-img-lazy.border.box-shadow(rounded="circle", :src="avatar")
          .profile-work.d-none.d-md-block.d-lg-block
            p.text-uppercase.mt-4 work link
            b-link(:href="website") Website
            br/
            b-link(:href="github") Github
            p.text-uppercase.mt-4 skills
            b-link(:href="link", :key="`skill-${i}`", v-for="({ text, link }, i) of skills") {{ text }}#[br/]
        b-col(md=8)
          header.profile-head.mt-4
            h4 {{ name }}
            h5 {{ profession }}
            p.proile-rating.text-uppercase
              | rankings&nbsp;:&nbsp;
              span {{ rankings }}
          b-tabs.profile-tab
            b-tab(title="About", active)
              b-row
                b-col(md=3): label Name
                b-col(md=6): p {{ name }}
              b-row
                b-col(md=3): label Email
                b-col(md=6): p {{ email }}
              b-row
                b-col(md=3): label Profession
                b-col(md=6): p {{ profession }}
              b-row
                b-col(md=3): label Skills
                b-col(md=6): p {{ plainSkills.join(', ') }}
            b-tab(title="Achievements")
              b-row(:key="`paper-${i}`", v-for="({ text, date, link }, i) in achievements")
                b-col(md=1): label Title
                b-col(md=8): b-link(:href="link", target="_blank") {{ text }}
                b-col(md=1): label Date
                b-col(md=2): p {{ date }}
            b-tab(title="Education")
              b-row.mb-3(v-if="bachelor")
                b-col(cols=12): b-card.flex-md-row.box-shadow(no-body, style="height:250px;")
                  b-card-body.d-flex.flex-column.align-items-start
                    strong.d-inline-block.mb-2.text-primary Bachelor
                    h3.mb-1 {{ bachelor.title }}
                    div.mb-1.text-muted {{ bachelor.date }}
                    small.card-text.text-muted.mb-auto(v-html="$md.renderInline(bachelor.text)")
                    b-link(:href="bachelor.link") Learn more
                  b-img.d-none.d-md-block.d-lg-block.mr-5.my-auto.flex-auto.border.box-shadow(rounded="circle", style="width:10rem;height:10rem;", :src="bachelor.image")
            b-tab(title="Experience")
              b-row.mb-3(v-if="experience", :key="`exp-${i}`", v-for="({ title, text, date, link, image }, i) in experience")
                b-col(cols=12): b-card.flex-md-row.box-shadow(no-body, style="height:250px;")
                  b-card-body.d-flex.flex-column.align-items-start
                    h3.mb-1 {{ title }}
                    div.mb-1.text-muted {{ date }}
                    small.card-text.text-muted.mb-auto(v-html="$md.renderInline(text)")
                    b-link(:href="link") Learn more
                  b-img.d-none.d-md-block.d-lg-block.mr-5.my-auto.flex-auto.border.box-shadow(rounded="circle", style="width:10rem;height:10rem;", :src="image")
      b-row.justify-content-center(v-else): loading.my-5(style="margin: 0 auto;")
</template>

<script lang="ts">
import { CreateElement, RenderContext, VNode } from 'vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({ name: 'Profile' })
export default class Profile extends Vue {
  private get ready() {
    return !Object.is(this.profile, {});
  }

  private get profile(): any {
    return this.$store.state.data.profile;
  }

  private get avatar() {
    return this.profile.avatar;
  }

  private get name() {
    const { fullname, name } = this.profile;
    return fullname || name;
  }

  private get email() {
    return this.profile.email;
  }

  private get profession() {
    return this.profile.profession;
  }

  private get rankings() {
    return this.profile.rankings;
  }

  private get website() {
    return this.profile.website;
  }

  private get github() {
    return this.profile.github;
  }

  private get skills() {
    return this.profile.skills;
  }

  private get plainSkills() {
    const skills: string[] = [];
    this.skills.forEach((_: any) => skills.push(_.text));
    return skills;
  }

  private get achievements() {
    return this.profile.achievements;
  }

  private get bachelor() {
    return this.profile.education.bachelor;
  }

  private get experience() {
    return this.profile.experience;
  }
}
</script>

<style lang="stylus">
.profile
  padding 3%
  margin-top 3%
  margin-bottom 3%
  background white
  .profile-img
    text-align center
    img
      width 70%
      height 100%
      transition 0.2s ease-in-out
      &:hover
        transform rotate(45deg)
  .profile-head
    h4
      color #333
    h5
      color #0062cc
    .proile-rating
      font-size 12px
      color #818182
      margin-top 5%
      span
        color #495057
        font-size 15px
        font-weight 600
  .profile-work
    padding 14%
    margin-top -15%
    p
      font-size 12px
      color #818182
      font-weight 600
      margin-top 10%
    a
      text-decoration none
      color #495057
      font-weight 600
      font-size 14px
    ul
      list-style none
  .profile-tab
    label
      font-weight 600
    p, a
      font-weight 600
      color #0062cc
    .nav-tabs
      margin-bottom 5%
      height 2.75rem
      overflow-x auto
      overflow-y hidden
      display flex
      flex-wrap nowrap
      -ms-overflow-style none
      overflow -moz-scrollbars-none
      &::-webkit-scrollbar
        display none
      .nav-link
        font-weight 600
        border none
        &.active
          border none
          border-bottom 2px solid #0062cc
</style>
