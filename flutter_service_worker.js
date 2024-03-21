'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "25acd3f8cf089d8c5edd1473327f95c3",
"index.html": "c733c864d3da5ebf2dde27902529580c",
"/": "c733c864d3da5ebf2dde27902529580c",
"main.dart.js": "29a281f565e3c77636e1e213ab292d7b",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"favicon.png": "66fa049d44b1a61d2b97159a00b16db3",
"icons/Icon-192.png": "ad2514df7f3b6c37ab3f68f471cfd646",
"icons/Icon-maskable-192.png": "ad2514df7f3b6c37ab3f68f471cfd646",
"icons/Icon-maskable-512.png": "dd64805bec36b4ec12ad4e82a3c89dae",
"icons/Icon-512.png": "dd64805bec36b4ec12ad4e82a3c89dae",
"manifest.json": "4a218de4de4c3f74a5300cf4acf963a6",
"assets/AssetManifest.json": "aa27a02330210072a8ef4d353c002012",
"assets/NOTICES": "bb455e2abfcce15dd4202509d33114b5",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "1bc0b7a20c4887c4e2aa405a265d8075",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "7d0cedfc735d579b6fd19b0391c73b47",
"assets/fonts/MaterialIcons-Regular.otf": "6b4f0753670d9772f571ceaef94efe41",
"assets/assets/README/stretchyHeader.md": "5e20529c46e2232a2e4da7d52b501c1e",
"assets/assets/icons/medium.svg": "6fda8c68bc087e08548f11b415ee85c8",
"assets/assets/icons/user.svg": "d58d4d5a63e901fd55f3d9318dafb627",
"assets/assets/icons/firebase.svg": "d6a431be82c62bf2e9574f8747467718",
"assets/assets/icons/github.svg": "aaa31b38ea5241a1838df1b22387aadb",
"assets/assets/icons/suitcaseAlt.svg": "71850471cbbe832f9d02cb84706fb4e3",
"assets/assets/icons/corporateAlt.svg": "3d9328541d003d75b3642ca5204f01eb",
"assets/assets/icons/flutter.svg": "e2ba3962e87f06ed28ddbb1b1f770de0",
"assets/assets/icons/instagram.svg": "61d2bb69e3402e9672c8b0e8260dda5c",
"assets/assets/icons/graduationCap.svg": "f407b6343f8c827abd6ac99940c3a8db",
"assets/assets/icons/menuBurger.svg": "41e85caf30dd42d32b443df1e70a95f9",
"assets/assets/icons/qr404.svg": "18730b42f0267dc5ceec435813963c55",
"assets/assets/icons/youtube.svg": "f59d477bc4ea342a0f6de57e73d024e3",
"assets/assets/icons/bounLogo.svg": "ced576f1cc3b7f811110f130f1a53323",
"assets/assets/icons/linkedin.svg": "7d20bd1e4710a12ba1a1321e69580000",
"assets/assets/icons/twitter.svg": "9d768bdf3d2730c4ac8b7ca830ce6274",
"assets/assets/icons/swift.svg": "cf47519ee5cb442432c3766af65fa6b1",
"assets/assets/icons/ankaraLogo.svg": "75011c6962de3ffc1d053fbf741a26f2",
"assets/assets/icons/csharp.svg": "806d1b6e090a675d54ab7104a1edf5f8",
"assets/assets/icons/dartlang.svg": "cb5c1a7400205b312c2728299b56b062",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
