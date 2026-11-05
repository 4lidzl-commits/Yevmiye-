var C="yevmiye-v4";
var F=["./","index.html","manifest.webmanifest","icon.svg","icon-192.png","icon-512.png","icon-maskable.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return Promise.all(F.map(function(u){return c.add(u).catch(function(){})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
/* Önce ağ (en fazla 3 sn), olmazsa önbellek: yeni sürüm yüklenince hemen gelir, internet yoksa eski sürüm çalışır */
self.addEventListener("fetch",function(e){var q=e.request;
 if(q.method!=="GET"||new URL(q.url).origin!==self.location.origin)return;
 e.respondWith(caches.open(C).then(function(c){
  var net=fetch(q).then(function(r){if(r&&r.ok&&!new URL(q.url).search)c.put(q,r.clone());return r});
  var to=new Promise(function(res){setTimeout(function(){res(null)},3000)});
  return Promise.race([net,to]).then(function(r){return r||c.match(q,{ignoreSearch:true}).then(function(m){return m||net})}).catch(function(){return c.match(q,{ignoreSearch:true})})}))});
