const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'blog.html',
    'post.html',
    '/vendor/bootstrap/css/bootstrap.min.css',
    '/vendor/font-awesome/css/font-awesome.min.css',
    '/css/fontastic.css',
    'https://fonts.googleapis.com/css?family=Open+Sans:300,400,700',
    '/vendor/@fancyapps/fancybox/jquery.fancybox.min.css',
    '/css/style.default.css',
    '/css/custom.css',
    '/vendor/jquery/jquery.min.js',
    '/vendor/popper.js/umd/popper.min.js',
    '/vendor/bootstrap/js/bootstrap.min.js',
    '/vendor/jquery.cookie/jquery.cookie.js',
    '/vendor/@fancyapps/fancybox/jquery.fancybox.min.js',
    '/js/front.js',
    '/js/main.js',
];


// Call Install Event
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Catching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Call Activate Event
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');

    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Claering Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});


// Call Fetch Event

self.addEventListener('fetch', (e) => {
    console.log('Service Worker: Fetching');

    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
});
