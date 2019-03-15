<template lang="pug">
  transition(name="fade"): .github(v-if="ready")
    .gh-header
    a.gh-user(:href="userUrl"): img.gh-avatar(:src="avatar")
    h1 {{ user }}
    ul.gh-info
      li.repo: a(:href="repoUrl", target="_blank")
        strong {{ repoNum }}
        | repos
      li.gists: a(:href="gistsUrl", target="_blank")
        strong {{ gistsNum }}
        | gists
      li.followers: a(:href="followersUrl", target="_blank")
        strong {{ followersNum }}
        | followers
</template>

<script>
import { axiosGithub } from '../../util'

const urlMap = {
  repoTab: '?tab=repositories',
  followersTab: '?tab=followers'
}

export default {
  props: {
    user: {
      type: String,
      deafult: 'E.T.'
    }
  },
  data() {
    return {
      ready: false,
      userUrl: '',
      avatar: '',
      repoNum: 0,
      repoUrl: '',
      gistsNum: 0,
      gistsUrl: '',
      followersNum: 0,
      followersUrl: ''
    }
  },
  methods: {
    resolveUserInfo({
      avatar_url = require('../../assets/images/github.svg'),
      name = 'E.T.',
      html_url = '',
      followers = '∞',
      public_gists = '∞',
      public_repos = '∞'
    } = {}) {
      this.avatar = avatar_url
      this.userUrl = html_url
      this.repoNum = public_repos
      this.repoUrl = `${html_url}${urlMap.repoTab}`
      this.followersNum = followers
      this.followersUrl = `${html_url}${urlMap.followersTab}`
      this.gistsNum = public_gists
      this.gistsUrl = `https://gist.github.com/${this.user}`
    },
    async fetchUserInfo(user) {
      return await axiosGithub.get(`/users/${user}`)
    }
  },
  async mounted() {
    try {
      const { data } = await this.fetchUserInfo(this.user)
      this.resolveUserInfo(data)
    } catch (e) {
      // fetch github api too frequently
    } finally {
      this.ready = true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@theme/styles/variables"

.github
  text-align center
  background #fff
  overflow hidden
  border-radius 2px
  box-shadow 0 1px 3px rgba(26, 26, 26, 0.1)
  box-sizing border-box
  margin 0 auto
  margin-bottom 10px
  h1
    font-size 24px
    font-weight 500
    text-decoration none
  .gh-header
    height 148px
    position relative
    padding 0
    margin 0
    background linear-gradient(to right, #eaecc6, #2bc0e4)
  .gh-user
    display inline-block
    overflow hidden
    background #fff
    border-radius 100%
    box-shadow 0 1px 1px rgba(0, 0, 0, 0.3)
    text-decoration none
    margin-top -43px
    border 3px solid #fff
    position relative
  .gh-avatar
    display block
    width 5rem
    height 5rem
    transition .2s ease-in-out
    &:hover
      transform rotate(45deg)
  .gh-info
    font-size 12px
    color color-dark
    list-style-type none
    margin 0
    padding 0
    border-top 1px solid #eee
    zoom 1
    a
      color color-dark
      &, &:hover, &:visited
        text-decoration none
    strong
      display block
      color #292f33
      font-size 16px
      line-height 1.6
    li
      width 33.33%
      float left
      font-size 12px
      padding 8px 0
      box-shadow 1px 0 0 #eee
</style>
