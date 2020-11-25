let cacheData='appCache';

console.log("working");

this.addEventListener('install',event=>{
    event.waitUntil(
        caches.open(cacheData).then(cache=>{
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/bundle.js',
                '/static/js/0.chunk.js',
                '/manifest.json',
                '/favicon.ico',
                '/index.html',
                '/Add',
                '/logo192.png',
                '/Todo/allTodo',
                '/'

            ])
        })
    )
})

this.addEventListener('fetch',event=>{
    if(event.request.url==='http://localhost:3000/Home'){
        event.waitUntil(
            console.log("this is a push notification"),
            this.registration.showNotification("Welcome to priority Tasks page",{
                body: "Now Get back to your work"
            })
        )
    }


    if(!navigator.onLine){
        event.respondWith(
            fetch(event.request).catch(function() {
                return caches.match(event.request)
            })
        )
    }
})