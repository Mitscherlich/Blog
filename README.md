# My personal blog
[![build-state][ci-img]][ci-url]

[ci-img]: https://img.shields.io/travis/Mitscherlich/blog.svg
[ci-url]: https://travis-ci.org/Mitscherlich/blog

:book: My personal blog build with [boostrap-vue] and [vuepress]

[boostrap-vue]: https://bootstrap-vue.js.org/
[vuepress]: https://vuepress.vuejs.org/

## Quick start
### Clone
Clone this repo:

```sh
$ git clone https://github.com/Mitscherlich/blog.git
```

That's simple right?

### Install dependencies
This workspaces use [lerna] and [yarn] for organizing. You should use them too.

[lerna]: https://lernajs.io/
[yarn]: https://yarnpkg.com/

```sh
$ yarn bootstrap
```

### Run!
The quickiest way is using the scripts already defined in the `package.json`:

```sh
$ yarn dev # Go visit http://localhost:8080 in your browser
```

### Build

```sh
$ yarn build
```

Generated files will be avaliable in `/dist`.

## License
Checkout [License](License.md) for more detail.
