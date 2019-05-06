
export function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function handleApiErrors (response) {
  const responseData = response.data;
  let htmlErrors = '';
  if (responseData && responseData.hasOwnProperty('errors')) {
    htmlErrors += '<ul><li>'
    for (let field in responseData.errors) {
      htmlErrors = responseData.errors[field].join('</li><li>');
    }
    htmlErrors += '</li></ul>';
  } else if (responseData && responseData.hasOwnProperty('message')) {
    htmlErrors += responseData.message;
  }
  return htmlErrors;
}


export function getCouponCode (to) {
  if (to && to.query && to.query.hasOwnProperty('c')) {
    return to.query.c;
  }
  return null;
}

export function checkRedirectUrl(to) {
  let redirectUrl = null;
  if (to.query && to.query.hasOwnProperty('url') && to.query.url) {
    redirectUrl = to.query.url;
  }
  return redirectUrl;
}

export function getHumanRecurrencyPeriod(product) {
  if (product && product.recurrency_period === 'monthly') {
    let periodNames = {
      1: 'mês',
      2: 'bimestre',
      3: 'trimestre',
      4: 'quadrimestre',
      6: 'semestre',
      12: 'ano'
    };
    // /product.recurrency_frequency > 1 ? `${product.recurrency_frequency} mêses` : 'mês'
    if (periodNames.hasOwnProperty(product.recurrency_frequency) !== -1) {
      return periodNames[product.recurrency_frequency];
    } else if (product.recurrency_frequency > 1) {
      return `${product.recurrency_frequency} mêses`;
    } else {
      return 'mês';
    }
  }
}
