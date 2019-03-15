module.exports = {
  title: 'Amber',
  description: 'Mitscherlich\'s blog',
  markdown: { lineNumbers: true },
  theme: 'amber',
  themeConfig: {
    perPage: 5,
    ga: 'UA-126376019-1',
    menu: [
      { text: 'Essay', link: '/category/essay' },
      { text: 'Note', link: '/category/note' },
      { text: 'ACG', link: '/tag/acg' },
      { text: 'Vue.js', link: '/tag/vue.js' },
      { text: 'Python', link: '/tag/python' },
      { text: 'Node.js', link: '/tag/node.js' },
      { text: 'Archives', link: '/archives' },
      { text: 'Donate', link: '/donate' },
      { text: 'Messages', link: '/messages' },
      { text: 'Projects', link: '/projects' },
      { text: 'Profile', link: '/profile' }
    ],
    sidebar: {
      github: 'Mitscherlich',
      elsewhere: [
        { text: 'Github', icon: 'far github-alt', link: 'https://github.com/Mitscherlich' }
      ]
    },
    rss: {
      enable: false
    },
    comment: {
      enable: true,
      owner: 'Mitscherlich',
      repo: 'blog',
      clientId: 'b2d802022a53f942adb5',
      clientSecret: 'edd6732c3953ff9fd024ba88e591386e9807acc2'
    },
    powerby: {
      author: 'Mitscherlich',
      link: 'https://github.com/Mitscherlich'
    }
  }
}
