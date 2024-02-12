(()=>{"use strict";var e={740:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var i=Object.getOwnPropertyDescriptor(t,n);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,i)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const s=o(n(136)),a=n(872),c=process.env.PORT||3e3,l=[{id:"542234",userName:"Vlad",age:24,hobbies:["swimming","judo"]}];s.createServer(((e,t)=>{const{method:n,url:r}=e;let i="";e.on("data",(e=>{i+=e})),e.on("end",(()=>{if("GET"===n&&"/api/users"===r)t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(l));else if("GET"===n&&(null==r?void 0:r.startsWith("/api/users/"))){const e=r.split("/")[3],n=l.find((t=>t.id===e));n?(t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(n))):(t.writeHead(404,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:"User not found"})))}else if("POST"===n&&"/api/users"===r){const{username:e,age:n,hobbies:r}=JSON.parse(i);if(e&&n&&r){const i={id:(0,a.v4)(),userName:e,age:n,hobbies:r};l.push(i),t.writeHead(201,{"Content-Type":"application/json"}),t.end(JSON.stringify(i))}else t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:"Body doesn't contain all requirements"}))}else if("PUT"===n&&(null==r?void 0:r.startsWith("/api/users/"))){const e=r.split("/")[3],n=l.findIndex((t=>t.id===e));if(-1!==n)try{const{username:e,age:r,hobbies:o}=JSON.parse(i);e&&r&&o?(l[n].age=r,l[n].hobbies=o,l[n].userName=e,t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(l[n]))):(t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:"Body doesn't contain all requirements"})))}catch(e){t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:e}))}else t.writeHead(404,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:"User not found"}))}else if("DELETE"===n&&(null==r?void 0:r.startsWith("/api/users/"))){const e=r.split("/")[3],n=l.findIndex((t=>t.id===e));-1!==n?(l.splice(n,1),t.writeHead(204,{"Content-Type":"application/json"}),t.end()):(t.writeHead(404,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:"User not found"})))}else t.writeHead(404,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:"Wrong request!"}))}))})).listen(c,(()=>{console.log(`Server has been running on the ${c} port`)}))},872:(e,t,n)=>{n.r(t),n.d(t,{NIL:()=>T,parse:()=>h,stringify:()=>f,v1:()=>m,v3:()=>O,v4:()=>S,v5:()=>j,validate:()=>l,version:()=>U});const r=require("crypto");var i=n.n(r);const o=new Uint8Array(256);let s=o.length;function a(){return s>o.length-16&&(i().randomFillSync(o),s=0),o.slice(s,s+=16)}const c=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,l=function(e){return"string"==typeof e&&c.test(e)},u=[];for(let e=0;e<256;++e)u.push((e+256).toString(16).slice(1));function d(e,t=0){return u[e[t+0]]+u[e[t+1]]+u[e[t+2]]+u[e[t+3]]+"-"+u[e[t+4]]+u[e[t+5]]+"-"+u[e[t+6]]+u[e[t+7]]+"-"+u[e[t+8]]+u[e[t+9]]+"-"+u[e[t+10]]+u[e[t+11]]+u[e[t+12]]+u[e[t+13]]+u[e[t+14]]+u[e[t+15]]}const f=function(e,t=0){const n=d(e,t);if(!l(n))throw TypeError("Stringified UUID is invalid");return n};let p,y,g=0,v=0;const m=function(e,t,n){let r=t&&n||0;const i=t||new Array(16);let o=(e=e||{}).node||p,s=void 0!==e.clockseq?e.clockseq:y;if(null==o||null==s){const t=e.random||(e.rng||a)();null==o&&(o=p=[1|t[0],t[1],t[2],t[3],t[4],t[5]]),null==s&&(s=y=16383&(t[6]<<8|t[7]))}let c=void 0!==e.msecs?e.msecs:Date.now(),l=void 0!==e.nsecs?e.nsecs:v+1;const u=c-g+(l-v)/1e4;if(u<0&&void 0===e.clockseq&&(s=s+1&16383),(u<0||c>g)&&void 0===e.nsecs&&(l=0),l>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");g=c,v=l,y=s,c+=122192928e5;const f=(1e4*(268435455&c)+l)%4294967296;i[r++]=f>>>24&255,i[r++]=f>>>16&255,i[r++]=f>>>8&255,i[r++]=255&f;const m=c/4294967296*1e4&268435455;i[r++]=m>>>8&255,i[r++]=255&m,i[r++]=m>>>24&15|16,i[r++]=m>>>16&255,i[r++]=s>>>8|128,i[r++]=255&s;for(let e=0;e<6;++e)i[r+e]=o[e];return t||d(i)},h=function(e){if(!l(e))throw TypeError("Invalid UUID");let t;const n=new Uint8Array(16);return n[0]=(t=parseInt(e.slice(0,8),16))>>>24,n[1]=t>>>16&255,n[2]=t>>>8&255,n[3]=255&t,n[4]=(t=parseInt(e.slice(9,13),16))>>>8,n[5]=255&t,n[6]=(t=parseInt(e.slice(14,18),16))>>>8,n[7]=255&t,n[8]=(t=parseInt(e.slice(19,23),16))>>>8,n[9]=255&t,n[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,n[11]=t/4294967296&255,n[12]=t>>>24&255,n[13]=t>>>16&255,n[14]=t>>>8&255,n[15]=255&t,n};function b(e,t,n){function r(e,r,i,o){var s;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const t=[];for(let n=0;n<e.length;++n)t.push(e.charCodeAt(n));return t}(e)),"string"==typeof r&&(r=h(r)),16!==(null===(s=r)||void 0===s?void 0:s.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let a=new Uint8Array(16+e.length);if(a.set(r),a.set(e,r.length),a=n(a),a[6]=15&a[6]|t,a[8]=63&a[8]|128,i){o=o||0;for(let e=0;e<16;++e)i[o+e]=a[e];return i}return d(a)}try{r.name=e}catch(e){}return r.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",r.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",r}const O=b("v3",48,(function(e){return Array.isArray(e)?e=Buffer.from(e):"string"==typeof e&&(e=Buffer.from(e,"utf8")),i().createHash("md5").update(e).digest()})),w={randomUUID:i().randomUUID},S=function(e,t,n){if(w.randomUUID&&!t&&!e)return w.randomUUID();const r=(e=e||{}).random||(e.rng||a)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,t){n=n||0;for(let e=0;e<16;++e)t[n+e]=r[e];return t}return d(r)},j=b("v5",80,(function(e){return Array.isArray(e)?e=Buffer.from(e):"string"==typeof e&&(e=Buffer.from(e,"utf8")),i().createHash("sha1").update(e).digest()})),T="00000000-0000-0000-0000-000000000000",U=function(e){if(!l(e))throw TypeError("Invalid UUID");return parseInt(e.slice(14,15),16)}},136:e=>{e.exports=require("http")}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r].call(o.exports,o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(740)})();