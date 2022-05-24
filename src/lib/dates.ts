import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import RelativeTimePlugin from 'dayjs/plugin/relativeTime'
import UpdateLocale from 'dayjs/plugin/updateLocale'

export const setupDayjs = () => {
  dayjs.extend(UpdateLocale)
  dayjs.extend(RelativeTimePlugin)

  dayjs.updateLocale('pt-br', {
    relativeTime: {
      future: 'em %s',
      past: '%s atrás',
      s: 'poucos segundos',
      m: 'um minuto',
      mm: '%d minutos',
      h: 'uma hora',
      hh: '%d horas',
      d: 'um dia',
      dd: '%d dias',
      M: 'um mês',
      MM: '%d meses',
      y: 'um ano',
      yy: '%d anos',
    },
  })

  dayjs.locale('pt-br')
}
