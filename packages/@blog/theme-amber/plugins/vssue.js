import Vssue from 'vssue'
import GithubV4 from '@vssue/api-github-v4'

const install = (
  Vue,
  {
    siteData: {
      themeConfig: { comment: { enable, owner, repo, clientId, clientSecret } = {} }
    }
  }
) => {
  if (!enable) {
    return // ignore this when disabled
  }
  Vue.use(Vssue, {
    api: GithubV4,
    owner,
    repo,
    clientId,
    clientSecret
  })
}

export default { install }
