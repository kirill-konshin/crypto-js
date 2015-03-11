(function(e,r){"object"==typeof exports?module.exports=exports=r():"function"==typeof define&&define.amd?define([],r):e.CryptoJS=r()})(this,function(){var e=e||function(e,r){var t={},n=t.lib={},i=n.Base=function(){function e(){}return{extend:function(r){e.prototype=this;var t=new e;return r&&t.mixIn(r),t.hasOwnProperty("init")||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var r in e)e.hasOwnProperty(r)&&(this[r]=e[r]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),o=n.WordArray=i.extend({init:function(e,t){e=this.words=e||[],this.sigBytes=t!=r?t:4*e.length},toString:function(e){return(e||s).stringify(this)},concat:function(e){var r=this.words,t=e.words,n=this.sigBytes,i=e.sigBytes;if(this.clamp(),n%4)for(var o=0;i>o;o++){var c=255&t[o>>>2]>>>24-8*(o%4);r[n+o>>>2]|=c<<24-8*((n+o)%4)}else if(t.length>65535)for(var o=0;i>o;o+=4)r[n+o>>>2]=t[o>>>2];else r.push.apply(r,t);return this.sigBytes+=i,this},clamp:function(){var r=this.words,t=this.sigBytes;r[t>>>2]&=4294967295<<32-8*(t%4),r.length=e.ceil(t/4)},clone:function(){var e=i.clone.call(this);return e.words=this.words.slice(0),e},random:function(r){for(var t,n=[],i=function(r){var r=r,t=987654321,n=4294967295;return function(){t=36969*(65535&t)+(t>>16)&n,r=18e3*(65535&r)+(r>>16)&n;var i=(t<<16)+r&n;return i/=4294967296,i+=.5,i*(e.random()>.5?1:-1)}},c=0;r>c;c+=4){var s=i(4294967296*(t||e.random()));t=987654071*s(),n.push(0|4294967296*s())}return new o.init(n,r)}}),c=t.enc={},s=c.Hex={stringify:function(e){for(var r=e.words,t=e.sigBytes,n=[],i=0;t>i;i++){var o=255&r[i>>>2]>>>24-8*(i%4);n.push((o>>>4).toString(16)),n.push((15&o).toString(16))}return n.join("")},parse:function(e){for(var r=e.length,t=[],n=0;r>n;n+=2)t[n>>>3]|=parseInt(e.substr(n,2),16)<<24-4*(n%8);return new o.init(t,r/2)}},f=c.Latin1={stringify:function(e){for(var r=e.words,t=e.sigBytes,n=[],i=0;t>i;i++){var o=255&r[i>>>2]>>>24-8*(i%4);n.push(String.fromCharCode(o))}return n.join("")},parse:function(e){for(var r=e.length,t=[],n=0;r>n;n++)t[n>>>2]|=(255&e.charCodeAt(n))<<24-8*(n%4);return new o.init(t,r)}},a=c.Utf8={stringify:function(e){try{return decodeURIComponent(escape(f.stringify(e)))}catch(r){throw Error("Malformed UTF-8 data")}},parse:function(e){return f.parse(unescape(encodeURIComponent(e)))}},u=n.BufferedBlockAlgorithm=i.extend({reset:function(){this._data=new o.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=a.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(r){var t=this._data,n=t.words,i=t.sigBytes,c=this.blockSize,s=4*c,f=i/s;f=r?e.ceil(f):e.max((0|f)-this._minBufferSize,0);var a=f*c,u=e.min(4*a,i);if(a){for(var p=0;a>p;p+=c)this._doProcessBlock(n,p);var d=n.splice(0,a);t.sigBytes-=u}return new o.init(d,u)},clone:function(){var e=i.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});n.Hasher=u.extend({cfg:i.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){u.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){e&&this._append(e);var r=this._doFinalize();return r},blockSize:16,_createHelper:function(e){return function(r,t){return new e.init(t).finalize(r)}},_createHmacHelper:function(e){return function(r,t){return new p.HMAC.init(e,t).finalize(r)}}});var p=t.algo={};return t}(Math);return e});