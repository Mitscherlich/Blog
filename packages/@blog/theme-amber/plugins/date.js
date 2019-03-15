import dayjs from 'dayjs'

const install = Vue => {
  Vue.prototype.$date = dayjs

  Vue.filter('date', (date, format = 'YYYY/MM/DD') => {
    return dayjs(new Date(date)).format(format)
  })
}

export default { install }
