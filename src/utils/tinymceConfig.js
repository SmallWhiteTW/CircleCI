import tinymce from "tinymce"
!function(){"use strict";function n(e){return function(n){return r=typeof(t=n),(null===t?"null":"object"==r&&(Array.prototype.isPrototypeOf(t)||t.constructor&&"Array"===t.constructor.name)?"array":"object"==r&&(String.prototype.isPrototypeOf(t)||t.constructor&&"String"===t.constructor.name)?"string":r)===e;var t,r}}function o(n){return function(){return n}}function t(n){return n}function r(){return p}var e,u="undefined"!=typeof window?window:Function("return this;")(),i=function(n,t){return{isRequired:n,applyPatch:t}},a=function(i,o){return function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];var r=o.apply(this,n),e=void 0===r?n:r;return i.apply(this,e)}},c=function(n,t){if(n)for(var r=0;r<t.length;r++)t[r].isRequired(n)&&t[r].applyPatch(n);return n},f=n("object"),l=n("array"),s=function(n){return e===n},g=o(!1),d=o(!(e=void 0)),p={fold:function(n,t){return n()},isSome:g,isNone:d,getOr:t,getOrThunk:v,getOrDie:function(n){throw new Error(n||"error: getOrDie called on none.")},getOrNull:o(null),getOrUndefined:o(void 0),or:t,orThunk:v,map:r,each:function(){},bind:r,exists:g,forall:d,filter:function(){return p},toArray:function(){return[]},toString:o("none()")};function v(n){return n()}function h(n,t){return r=n,e=t,-1<D.call(r,e);var r,e}function y(n,t){return function(n){for(var t=[],r=0,e=n.length;r<e;++r){if(!l(n[r]))throw new Error("Arr.flatten item "+r+" was not an array, input: "+n);U.apply(t,n[r])}return t}(function(n,t){for(var r=n.length,e=new Array(r),i=0;i<r;i++){var o=n[i];e[i]=t(o,i)}return e}(n,t))}function m(n,t){for(var r=P(n),e=0,i=r.length;e<i;e++){var o=r[e];t(n[o],o)}}function E(r){return function(n,t){r[t]=n}}function w(n,t){var r,e,i,o={},u={};return r=t,e=E(o),i=E(u),m(n,function(n,t){(r(n,t)?e:i)(n,t)}),{t:o,f:u}}function O(n,t){return T(n,t)?_(n[t]):S()}function M(u){return function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];if(0===n.length)throw new Error("Can't merge zero objects");for(var r={},e=0;e<n.length;e++){var i=n[e];for(var o in i)T(i,o)&&(r[o]=u(r[o],i[o]))}return r}}function b(n){if(s(n)||""===n)return[];var t=l(n)?y(n,function(n){return n.split(/[\s+,]/)}):n.split(/[\s+,]/);return y(t,function(n){return 0<n.length?[n.trim()]:[]})}function x(n){var t;return null!==(t=n.defaultOptions)&&void 0!==t?t:n.defaultSettings}function j(n,t){var r=C(n,t),e=b(t.plugins),i=O(r,"custom_plugin_urls").getOr({}),o=w(i,function(n,t){return h(e,t)}),u=O(r,"external_plugins").getOr({}),a={};m(o.t,function(n,t){a[t]=n});var c=I(a,u);return I(t,0===P(c).length?{}:{external_plugins:c})}var A=function(r){function n(){return i}function t(n){return n(r)}var e=o(r),i={fold:function(n,t){return t(r)},isSome:d,isNone:g,getOr:e,getOrThunk:e,getOrDie:e,getOrNull:e,getOrUndefined:e,or:n,orThunk:n,map:function(n){return A(n(r))},each:function(n){n(r)},bind:t,exists:t,forall:t,filter:function(n){return n(r)?i:p},toArray:function(){return[r]},toString:function(){return"some("+r+")"}};return i},S=r,_=function(n){return null==n?p:A(n)},D=Array.prototype.indexOf,U=Array.prototype.push,P=Object.keys,R=Object.hasOwnProperty,T=function(n,t){return R.call(n,t)},C=M(function(n,t){return f(n)&&f(t)?C(n,t):t}),I=M(function(n,t){return t}),N={getCustomPluginUrls:j,patch:i(function(){return!0},function(r){r.EditorManager.init=a(r.EditorManager.init,function(n){return[j(x(r),n)]}),r.EditorManager.createEditor=a(r.EditorManager.createEditor,function(n,t){return[n,j(x(r),t)]})})};function k(n,t,r){if(r||2===arguments.length)for(var e,i=0,o=t.length;i<o;i++)!e&&i in t||((e=e||Array.prototype.slice.call(t,0,i))[i]=t[i]);return n.concat(e||Array.prototype.slice.call(t))}function L(n,t){return function(n,t){for(var r=null!=t?t:u,e=0;e<n.length&&null!=r;++e)r=r[n[e]];return r}(n.split("."),t)}function q(n){return parseInt(n,10)}function V(n,t){var r=n-t;return 0==r?0:0<r?1:-1}function z(n,t,r){return{major:n,minor:t,patch:r}}function B(n){var t=/([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(n);return t?z(q(t[1]),q(t[2]),q(t[3])):z(0,0,0)}function F(n,t){return!!n&&-1===function(n,t){var r=V(n.major,t.major);if(0!==r)return r;var e=V(n.minor,t.minor);if(0!==e)return e;var i=V(n.patch,t.patch);return 0!==i?i:0}(B([(r=n).majorVersion,r.minorVersion].join(".").split(".").slice(0,3).join(".")),B(t));var r}function $(o){return function(n){var t=L("tinymce.util.Tools",u),r=b(n.plugins),e=x(o).forced_plugins||[],i=0<e.length?r.concat(e):r;return[t.extend({},n,{plugins:i})]}}function G(){return(new Date).getTime()}function H(e){return function(){var n,t,r=(t="position",(((n=e).currentStyle?n.currentStyle[t]:window.getComputedStyle(n,null)[t])||"").toLowerCase());return"absolute"===r||"fixed"===r}}function J(n){n.parentNode.removeChild(n)}function K(n,t){n.notificationManager?n.notificationManager.open({text:t,type:"warning",timeout:0,icon:""}):n.windowManager.alert(t)}function Q(n){var t,r,e=L("tinymce.util.URI",u);(t=n.base_url)&&(this.baseURL=new e(this.documentBaseURL).toAbsolute(t.replace(/\/+$/,"")),this.baseURI=new e(this.baseURL)),r=n.suffix,n.suffix&&(this.suffix=r),this.defaultSettings=n}function W(n){return[L("tinymce.util.Tools",u).extend({},this.defaultSettings,n)]}function X(n){c(n,[rn.patch,en.patch,Y.patch,N.patch])}var Y={patch:i(function(n){return F(n,"4.7.0")},function(r){r.EditorManager.init=a(r.EditorManager.init,$(r.EditorManager)),r.EditorManager.createEditor=a(r.EditorManager.createEditor,function(n,t){return k([n],$(r.EditorManager)(t),!0)})})},Z=function(n,t,r,e,i){var o,u=G();o=setInterval(function(){n()&&(clearInterval(o),t()),G()-u>i&&(clearInterval(o),r())},e)},nn=function(n,t){var r,e=((r=document.createElement("div")).style.display="none",r.className="mce-floatpanel",r);document.body.appendChild(e),Z(H(e),function(){J(e),n()},function(){J(e),t()},10,5e3)},tn=function(n){n.EditorManager.on("AddEditor",function(n){var t=n.editor,r=t.settings.service_message;r&&nn(function(){K(t,r)},function(){alert(r)})})},rn={patch:i(function(n){return"function"!=typeof n.overrideDefaults},function(r){tn(r),r.overrideDefaults=Q,r.EditorManager.init=a(r.EditorManager.init,W),r.EditorManager.createEditor=a(r.EditorManager.createEditor,function(n,t){return k([n],W.call(r,t),!0)})})},en={patch:i(function(n){return F(n,"4.5.0")},function(n){var e;n.overrideDefaults=a(n.overrideDefaults,(e=n,function(n){var t=n.plugin_base_urls;for(var r in t)e.PluginManager.urls[r]=t[r]}))})};X(u.tinymce)}();

(function(cloudSettings) {
    tinymce.overrideDefaults(cloudSettings);
})({"rtc_tenant_id":"no-origin","editimage_api_key":"no-origin","imagetools_proxy":"https://imageproxy.tiny.cloud/2/image","autocorrect_service_url":"https://spelling.tiny.cloud","suffix":".min","linkchecker_service_url":"https://hyperlinking.tiny.cloud","spellchecker_rpc_url":"https://spelling.tiny.cloud","spellchecker_api_key":"no-origin","tinydrive_service_url":"https://catalog.tiny.cloud","api_key":"no-origin","imagetools_api_key":"no-origin","tinydrive_api_key":"no-origin","export_image_proxy_service_url":"https://imageproxy.tiny.cloud","forced_plugins":["chiffer"],"referrer_policy":"origin","custom_plugin_urls":{"export":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/export/plugin.min.js","powerpaste":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/powerpaste/plugin.min.js","typography":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/typography/plugin.min.js","grammar":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/grammar/plugin.min.js","casechange":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/casechange/plugin.min.js","tableofcontents":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/tableofcontents/plugin.min.js","advtable":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/advtable/plugin.min.js","editimage":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/editimage/plugin.min.js","tinymcespellchecker":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/tinymcespellchecker/plugin.min.js","mergetags":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/mergetags/plugin.min.js","autocorrect":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/autocorrect/plugin.min.js","linkchecker":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/linkchecker/plugin.min.js","checklist":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/checklist/plugin.min.js","mediaembed":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/mediaembed/plugin.min.js","inlinecss":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/inlinecss/plugin.min.js","tinycomments":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/tinycomments/plugin.min.js","rtc":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/rtc/plugin.min.js","pageembed":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/pageembed/plugin.min.js","extractions":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/extractions/plugin.min.js","tinydrive":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/tinydrive/plugin.min.js","advcode":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/advcode/plugin.min.js","formatpainter":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/formatpainter/plugin.min.js","permanentpen":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/permanentpen/plugin.min.js","a11ychecker":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/a11ychecker/plugin.min.js","footnotes":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/footnotes/plugin.min.js","mentions":"https://cdn.tiny.cloud/1/no-origin/tinymce/6.2.0-10/plugins/mentions/plugin.min.js"},"chiffer_snowplow_service_url":"https://sp.tinymce.com/i","mediaembed_api_key":"no-origin","promotion":false,"rtc_service_url":"https://rtc.tiny.cloud","editimage_proxy_service_url":"https://imageproxy.tiny.cloud","linkchecker_api_key":"no-origin","mediaembed_service_url":"https://hyperlinking.tiny.cloud","service_message":"We’re unable to check your domain because the referer header is missing. Please read the \u003ca target=\"_blank\" href=\"https://www.tiny.cloud/docs/tinymce/6/cloud-troubleshooting/\"\u003eGuide\u003c/a\u003e on how to ensure your referer header is present, so we can then customize your editor experience."});
!function(){"use strict";function n(e){return!(null==e)}function r(){}function t(e,n,r,o){return function(e,t){for(var n=S(e),r=0,o=n.length;r<o;r++){var i=n[r];t(e[i],i)}}(e,function(e,t){(n(e,t)?r:o)(e,t)}),1}function o(e,t){return h.call(e,t)}function i(e){var t=e.command;return o(P,t)?function(e){if(n(e.value)&&o(e.value,"list-style-type")){e=e.value["list-style-type"];return"advlist_"+(""===e?"default":e)}}(e):o(w,t)?w[t]:o(I,t)?I[t]:o(b,t)?b[t]:void 0}function c(e,t){return e=e,t=t,-1<k.call(e,t)}function a(e){return"plugin_"+e+"_loaded"}function s(e){var n,e=(t(e,function(e,t){e=!!e.isStub;return!!t&&!e&&c(O,t)},(n=e={},function(e,t){n[t]=e}),r),e);return function(e,t){for(var n=e.length,r=new Array(n),o=0;o<n;o++){var i=e[o];r[o]=t(i,o)}return r}(S(e),a)}function u(e,t){!function(e,t){for(var n=0,r=e.length;n<r;n++)t(e[n],n)}(s(t),e.sendStat)}function l(){return(new Date).getTime()}function e(e,t){var o,i,n,t=(o=e,i=t,{send:function(e,t,n){var e="?aid="+i+"&tna=tinymce_cloud&p=web&dtm="+t+"&stm="+l()+"&tz="+("undefined"!=typeof Intl?encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone):"N%2FA")+"&e=se&se_ca="+e,r=document.createElement("img");r.src=o.chiffer_snowplow_service_url+e;e=function(e){return function(){r.onload=null,r.onerror=null,n(e)}};r.onload=e(!0),r.onerror=e(!1)}});return n=t,{sendStat:function(e){n.send(e,l(),r)}}}var d,f,m,p,g,_,v=(d="string",function(e){return e=typeof(t=e),(null===t?"null":"object"==e&&(Array.prototype.isPrototypeOf(t)||t.constructor&&"Array"===t.constructor.name)?"array":"object"==e&&(String.prototype.isPrototypeOf(t)||t.constructor&&"String"===t.constructor.name)?"string":e)===d;var t}),y=(f=void 0,function(e){return f===e}),S=Object.keys,h=Object.hasOwnProperty,I={mceInsertToc:"toc_insert",mceUpdateToc:"toc_update"},w={mceEditImage:"imagetools_open_dialog",mceImageRotateLeft:"imagetools_rotate",mceImageRotateRight:"imagetools_rotate",mceImageFlipVertical:"imagetools_flip",mceImageFlipHorizontal:"imagetools_flip"},P={InsertUnorderedList:!0,InsertOrderedList:!0},b={mceInsertTemplate:"template_insert",mceInsertDate:"insertdatetime_insert",mceInsertTime:"insertdatetime_insert",mcePreview:"preview_open_dialog",mceAnchor:"anchor_open_dialog"},k=Array.prototype.indexOf,O=["advcode","advtable","a11ychecker","checklist","export","formatpainter","linkchecker","mediaembed","mentions","pageembed","permanentpen","powerpaste","rtc","tinycomments","tinydrive","tinymcespellchecker","casechange","editimage","tableofcontents"];p=null!==(g=tinymce.defaultOptions)&&void 0!==g?g:tinymce.defaultSettings,g={load:r},_=function(e){e=e.api_key;return v(e)?e:void 0}(p),g=void 0===_?g:((m=e(p,_)).sendStat("script_load"),{load:function(e){e.once("init",function(){return m.sendStat("init")}),e.once("focus",function(){return m.sendStat("focus")}),e.on("ExportPdf",function(){return m.sendStat("export_pdf")}),e.on("PastePreProcess PowerPasteTempStats",function(e){e=e.source;n(e)&&m.sendStat("powerpaste_"+e)}),e.on("VisualChars",function(e){!0===e.state&&m.sendStat("visualchars_true")}),e.on("RtcSessionConnected",function(e){var t=e.time;switch(t){case 0:m.sendStat("rtc_started");break;case 5:case 10:case 20:m.sendStat("rtc_connected_"+t+"min")}}),e.on("RtcSessionError",function(){return m.sendStat("rtc_error")}),e.on("RtcSessionDirty",function(){return m.sendStat("rtc_edited")}),e.on("SpellcheckerLanguageChanged",function(e){e=e.language;m.sendStat("spellcheckerpro_language_changed_"+e)}),e.on("ExecCommand",function(e){e=i(e);y(e)||m.sendStat(e)}),e.on("PreInit",function(){u(m,e.plugins)})}}),tinymce.PluginManager.add("chiffer",g.load)}();
