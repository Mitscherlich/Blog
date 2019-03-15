<template lang="pug">
  .profile.box-shadow: .row
    .col-md-4
      .profile-img: img.rounded-circle.border.box-shadow(:src="avatar")
      .profile-work.d-none.d-md-block.d-lg-block
        p.text-uppercase.mt-4 work link
        a(:href="website") Website
        br/
        a(:href="github") Github
        p.text-uppercase.mt-4 skills
        a(:href="link", :key="`skill-${i}`", v-for="({ text, link }, i) of skills")
          | {{ text }}
          br/
    .col-md-8
      .profile-head
        h4 {{ name }}
        h5 {{ profession }}
        //- p.proile-rating.text-uppercase
        //-   | rankings&nbsp;:&nbsp;
        //-   span {{ rankings }}
      b-tabs.profile-tab
        b-tab(title="About", active)
          .row
            .col-md-3: label Name
            .col-md-6: p {{ name }}
          .row
            .col-md-3: label Email
            .col-md-6: p {{ email }}
          .row
            .col-md-3: label Profession
            .col-md-6: p {{ profession }}
          .row
            .col-md-3: label Skills
            .col-md-6: p {{ plainSkills.join(', ') }}
        b-tab(title="Achievements")
          .row(v-for="({ text, date, link }, i) in achievements", :key="`paper-${i}`")
            .col-md-1: label Title
            .col-md-8: a(:href="link", target="_blank") {{ text }}
            .col-md-1: label Date
            .col-md-2: p {{ date }}
        b-tab(title="Education")
          .row.mb-3(v-if="education.bachelor")
            .col: .card.flex-md-row.box-shadow.h-250
              .card-body.d-flex.flex-column.align-items-start
                strong.d-inline-block.mb-2.text-primary Bachelor
                h3.mb-1 {{ education.bachelor.title }}
                div.mb-1.text-muted {{ education.bachelor.date }}
                small.card-text.text-muted.mb-auto(v-html="education.bachelor.text")
                a(:href="education.bachelor.link") Learn more
              img.rounded-circle.d-none.d-md-block.d-lg-block.mr-5.my-auto.flex-auto.border.box-shadow(:style="styleObject", :src="education.bachelor.image")
        b-tab(title="Experience")
          .row.mb-3(v-if="experience", :key="`exp-${i}`", v-for="({ title, text, date, link, image }, i) in experience")
            .col: .card.flex-md-row.box-shadow.h-250
              .card-body.d-flex.flex-column.align-items-start
                h3.mb-1 {{ title }}
                div.mb-1.text-muted {{ date }}
                small.card-text.text-muted.mb-auto(v-html="text")
                a(:href="link") Learn more
              img.rounded-circle.d-none.d-md-block.d-lg-block.mr-5.my-auto.flex-auto.border.box-shadow(:style="styleObject", :src="image")
</template>

<script>
export default {
  props: ['data'],
  data() {
    return { ...this.data }
  },
  computed: {
    plainSkills() {
      const skills = []
      this.skills.forEach((skill) => skills.push(skill.text))
      return skills
    },
    styleObject() {
      return {
        width: '10rem',
        height: '10rem'
      }
    }
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
        transform rotate(666turn)
        transition-delay .5s
        transition-property all
        transition-duration 59s
        transition-timing-function cubic-bezier(.34, 0, .84, 1)
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
