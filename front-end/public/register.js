//registro para inatalção
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw3.js')
    .then((reg) => {
      console.log(`serviceWorker registrado ${serviceWorker}`);
    }).catch((e) => {
      console.log('falha! no SERVICEWORKER= ', e.message)
    })
  }
