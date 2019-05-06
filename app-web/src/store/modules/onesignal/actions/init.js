
var OneSignal = window.OneSignal || []

export default function () {
  OneSignal.push(function () {
    OneSignal.init({
      appId: process.env.ONESIGNAL_APP_ID,
      autoRegister: false,
      notifyButton: {
        enable: false,
        showCredit: false,
        text: {
          'tip.state.unsubscribed': 'Inscreva-se para receber cursos grátis, cupons de descontos exclusivos e promoções!',
          'tip.state.subscribed': 'Você está inscrito para receber novidades e cursos grátis',
          'tip.state.blocked': 'Você bloqueou nossas notificações :(',
          'message.prenotify': 'Clique para se inscrever para receber cursos grátis, cupons de descontos exclusivos e promoções!',
          'message.action.subscribed': 'Obrigado por se inscrever!',
          'message.action.resubscribed': 'Você se inscreveu para receber nossas novidades exclusivas!',
          'message.action.unsubscribed': 'Você não receberá mais nossas notificações',
          'dialog.main.title': 'Gerenciar notificações da plataforma',
          'dialog.main.button.subscribe': 'INSCREVA-SE',
          'dialog.main.button.unsubscribe': 'DESINSCREVER',
          'dialog.blocked.title': 'Desbloquear notificações',
          'dialog.blocked.message': 'Siga as instruções abaixo para permitir notificações:'
        }
      },
      welcomeNotification: {
        'title': 'Bem-vindo!',
        'message': 'Obrigado por se inscrever!'
      // "url": "" /* Leave commented for the notification to not open a window on Chrome and Firefox (on Safari, it opens to your webpage) */
      },
      promptOptions: {
      /* actionMessage limited to 90 characters */
        actionMessage: 'Nós iremos te enviar notificações da plataforma, cursos grátis, cupons de descontos exclusivos e promoções.',
        /* acceptButtonText limited to 15 characters */
        acceptButtonText: 'PERMITIR',
        /* cancelButtonText limited to 15 characters */
        cancelButtonText: 'NÃO, OBRIGADO'
      }
    })
  })
}
