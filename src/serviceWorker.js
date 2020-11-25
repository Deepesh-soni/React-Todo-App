const path = require('path');
const webpush = require('web-push');

// VAPID keys should only be generated only once.
// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys);

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function determineAppServiceKey() {
    // const vapidPublicKey = '<Your Public Key from generateVAPIDKeys()>';
    const vapidPublicKey = "BESTGxzOizVGs6-iaosz5zIFSB_tgm49hUTngQZLjx-L_pdDsYvm1ET0QT7T-P12N1SMJdmNLvS6vEpa62an9gY";
    // const vapidPublicKey = vapidKeys;
    return urlBase64ToUint8Array(vapidPublicKey);
}

let swUrl = path.join(process.env.PUBLIC_URL + '/serviceWorker.js')

export let register = () => {
    navigator.serviceWorker.register(swUrl)
        .then(res => {
            //console.log(res)
            navigator.serviceWorker.ready.then(()=>{
                return res.pushManager.getSubscription()
                .then(function(subscription){
                    return res.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey:determineAppServiceKey()
                    })
                })
            })
        })   
        .catch(err => console.log(err))
}