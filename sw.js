var C="yevmiye-v3";
var F=["./","index.html","manifest.webmanifest","icon.svg"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET"||new URL(e.request.url).origin!==self.location.origin)return;
 e.respondWith(caches.open(C).then(function(c){return c.match(e.request,{ignoreSearch:true}).then(function(m){
  var n=fetch(e.request).then(function(r){if(r&&r.ok&&e.request.url.indexOf(self.location.origin)===0)c.put(e.request,r.clone());return r}).catch(function(){return m});
  return m||n})}))});
