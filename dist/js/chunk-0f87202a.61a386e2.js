(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0f87202a"],{"00b4":function(e,t,a){"use strict";a("ac1f");var c=a("23e7"),s=a("da84"),o=a("c65b"),i=a("e330"),l=a("1626"),r=a("861d"),n=function(){var e=!1,t=/[ac]/;return t.exec=function(){return e=!0,/./.exec.apply(this,arguments)},!0===t.test("abc")&&e}(),d=s.Error,f=i(/./.test);c({target:"RegExp",proto:!0,forced:!n},{test:function(e){var t=this.exec;if(!l(t))return f(this,e);var a=o(t,this,e);if(null!==a&&!r(a))throw new d("RegExp exec method returned something other than an Object or null");return!!a}})},"107c":function(e,t,a){var c=a("d039"),s=a("da84"),o=s.RegExp;e.exports=c((function(){var e=o("(?<a>b)","g");return"b"!==e.exec("b").groups.a||"bc"!=="b".replace(e,"$<a>c")}))},3985:function(e,t,a){e.exports=a.p+"img/INSTABILL.a5badb40.svg"},9263:function(e,t,a){"use strict";var c=a("c65b"),s=a("e330"),o=a("577e"),i=a("ad6d"),l=a("9f7f"),r=a("5692"),n=a("7c73"),d=a("69f3").get,f=a("fce3"),u=a("107c"),b=r("native-string-replace",String.prototype.replace),g=RegExp.prototype.exec,m=g,p=s("".charAt),h=s("".indexOf),v=s("".replace),O=s("".slice),j=function(){var e=/a/,t=/b*/g;return c(g,e,"a"),c(g,t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),x=l.BROKEN_CARET,y=void 0!==/()??/.exec("")[1],I=j||y||x||f||u;I&&(m=function(e){var t,a,s,l,r,f,u,I=this,_=d(I),w=o(e),S=_.raw;if(S)return S.lastIndex=I.lastIndex,t=c(m,S,w),I.lastIndex=S.lastIndex,t;var k=_.groups,E=x&&I.sticky,L=c(i,I),A=I.source,q=0,T=w;if(E&&(L=v(L,"y",""),-1===h(L,"g")&&(L+="g"),T=O(w,I.lastIndex),I.lastIndex>0&&(!I.multiline||I.multiline&&"\n"!==p(w,I.lastIndex-1))&&(A="(?: "+A+")",T=" "+T,q++),a=new RegExp("^(?:"+A+")",L)),y&&(a=new RegExp("^"+A+"$(?!\\s)",L)),j&&(s=I.lastIndex),l=c(g,E?a:I,T),E?l?(l.input=O(l.input,q),l[0]=O(l[0],q),l.index=I.lastIndex,I.lastIndex+=l[0].length):I.lastIndex=0:j&&l&&(I.lastIndex=I.global?l.index+l[0].length:s),y&&l&&l.length>1&&c(b,l[0],a,(function(){for(r=1;r<arguments.length-2;r++)void 0===arguments[r]&&(l[r]=void 0)})),l&&k)for(l.groups=f=n(null),r=0;r<k.length;r++)u=k[r],f[u[0]]=l[u[1]];return l}),e.exports=m},"9ac0":function(e,t,a){},"9f7f":function(e,t,a){var c=a("d039"),s=a("da84"),o=s.RegExp,i=c((function(){var e=o("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),l=i||c((function(){return!o("a","y").sticky})),r=i||c((function(){var e=o("^r","gy");return e.lastIndex=2,null!=e.exec("str")}));e.exports={BROKEN_CARET:r,MISSED_STICKY:l,UNSUPPORTED_Y:i}},ac1f:function(e,t,a){"use strict";var c=a("23e7"),s=a("9263");c({target:"RegExp",proto:!0,forced:/./.exec!==s},{exec:s})},ad6d:function(e,t,a){"use strict";var c=a("825a");e.exports=function(){var e=c(this),t="";return e.hasIndices&&(t+="d"),e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},b0c0:function(e,t,a){var c=a("83ab"),s=a("5e77").EXISTS,o=a("e330"),i=a("9bf2").f,l=Function.prototype,r=o(l.toString),n=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,d=o(n.exec),f="name";c&&!s&&i(l,f,{configurable:!0,get:function(){try{return d(n,r(this))[1]}catch(e){return""}}})},b8f3:function(e,t,a){"use strict";a("9ac0")},d60c:function(e,t,a){"use strict";a.r(t);var c=a("7a23"),s=a("3985"),o=a.n(s),i={class:"fxt-template-animation fxt-template-layout20"},l={class:"container"},r={class:"row"},n=Object(c["f"])("div",{class:"col-xl-7 col-lg-6 col-12 fxt-none-991 fxt-bg-img",style:{"box-shadow":"3px 0 79px 0 rgb(0 0 0 / 50%)"}},[Object(c["f"])("header",null,[Object(c["f"])("div",{id:"carouselExampleIndicators",class:"carousel","data-interval":"2000","data-ride":"carousel","data-pause":"false"},[Object(c["f"])("ol",{class:"carousel-indicators"},[Object(c["f"])("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"0",class:""}),Object(c["f"])("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"1",class:""}),Object(c["f"])("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"2",class:""}),Object(c["f"])("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"3",class:""}),Object(c["f"])("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"4",class:"active"}),Object(c["f"])("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"5",class:""}),Object(c["f"])("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"6",class:""}),Object(c["f"])("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"7",class:""}),Object(c["f"])("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"8",class:""})]),Object(c["f"])("div",{class:"carousel-inner",role:"listbox"},[Object(c["f"])("div",{class:"carousel-item"},[Object(c["f"])("div",{class:"carousel-caption d-none d-md-block"},[Object(c["f"])("div",{class:"img-height-width"},[Object(c["f"])("div",{class:"imgage_slider"},[Object(c["f"])("img",{src:"public/invoice.png",alt:"Logo",class:"img_slide1"})]),Object(c["f"])("h1",{class:"content-header-color"},"CREATE INVOICE"),Object(c["f"])("p",{class:"content_color"},[Object(c["h"])(" Instantly create invoice with customize "),Object(c["f"])("br"),Object(c["h"])(" templates. ")])])])]),Object(c["f"])("div",{class:"carousel-item"},[Object(c["f"])("div",{class:"carousel-caption d-none d-md-block"},[Object(c["f"])("div",{class:"img-height-width"},[Object(c["f"])("div",{class:"imgage_slider"},[Object(c["f"])("img",{src:"public/share.png",alt:"Logo",class:"img_slide2"})]),Object(c["f"])("h1",{class:"content-header-color"},"SHARE INVOICE"),Object(c["f"])("p",{class:"content_color"},[Object(c["h"])(" Instantly share invoice with customers "),Object(c["f"])("br"),Object(c["h"])(" over whatsapp, email and others. ")])])])]),Object(c["f"])("div",{class:"carousel-item"},[Object(c["f"])("div",{class:"carousel-caption d-none d-md-block"},[Object(c["f"])("div",{class:"img-height-width"},[Object(c["f"])("div",{class:"imgage_slider"},[Object(c["f"])("img",{src:"public/hand.png",alt:"Logo",class:"img_slide1"})]),Object(c["f"])("h1",{class:"content-header-color"},"GET PAID"),Object(c["f"])("p",{class:"content_color"},[Object(c["h"])(" Receive quick payment into bank with"),Object(c["f"])("br"),Object(c["h"])(" powerful payment gateway & UPI. ")])])])]),Object(c["f"])("div",{class:"carousel-item"},[Object(c["f"])("div",{class:"carousel-caption d-none d-md-block"},[Object(c["f"])("div",{class:"img-height-width"},[Object(c["f"])("div",{class:"imgage_slider"},[Object(c["f"])("img",{src:"public/icici.png",alt:"Logo",class:"img_slide4"})]),Object(c["f"])("h1",{class:"content-header-color"},"BANKING"),Object(c["f"])("p",{class:"content_color"},[Object(c["h"])(" Do seamless banking powered by ICICI"),Object(c["f"])("br"),Object(c["h"])(" business bank. ")])])])]),Object(c["f"])("div",{class:"carousel-item active"},[Object(c["f"])("div",{class:"carousel-caption d-none d-md-block"},[Object(c["f"])("div",{class:"img-height-width"},[Object(c["f"])("div",{class:"imgage_slider"},[Object(c["f"])("img",{src:"public/rupee_form.png",alt:"Logo",class:"img_slide1"})]),Object(c["f"])("h1",{class:"content-header-color"},"BAHI KHATA"),Object(c["f"])("p",{class:"content_color"},[Object(c["h"])(" Record all payments made and received"),Object(c["f"])("br"),Object(c["h"])(" from customers & vendors at one place. ")])])])]),Object(c["f"])("div",{class:"carousel-item"},[Object(c["f"])("div",{class:"carousel-caption d-none d-md-block"},[Object(c["f"])("div",{class:"img-height-width"},[Object(c["f"])("div",{class:"imgage_slider"},[Object(c["f"])("img",{src:"public/inventory.png",alt:"Logo",class:"img_slide1"})]),Object(c["f"])("h1",{class:"content-header-color",style:{overflow:"visible","text-overflow":"unset","white-space":"unset"}}," INVENTORY MANAGEMENT "),Object(c["f"])("p",{class:"content_color"},[Object(c["h"])(" Easily manage inventory stock of all"),Object(c["f"])("br"),Object(c["h"])(" products. ")])])])]),Object(c["f"])("div",{class:"carousel-item"},[Object(c["f"])("div",{class:"carousel-caption d-none d-md-block"},[Object(c["f"])("div",{class:"img-height-width"},[Object(c["f"])("div",{class:"imgage_slider"},[Object(c["f"])("img",{src:"public/delivery-truck.png",alt:"Logo",class:"img_slide1"})]),Object(c["f"])("h1",{class:"content-header-color"},"E-WAYBILL"),Object(c["f"])("p",{class:"content_color"},[Object(c["h"])(" Easily create E-waybill and move "),Object(c["f"])("br"),Object(c["h"])("goods instantly. ")])])])]),Object(c["f"])("div",{class:"carousel-item"},[Object(c["f"])("div",{class:"carousel-caption d-none d-md-block"},[Object(c["f"])("div",{class:"img-height-width"},[Object(c["f"])("div",{class:"imgage_slider"},[Object(c["f"])("img",{src:"public/insta.png",alt:"Logo",class:"img_slide3"})]),Object(c["f"])("h1",{class:"content-header-color"},"GST"),Object(c["f"])("p",{class:"content_color"},[Object(c["h"])(" Be GST Complaint all the"),Object(c["f"])("br"),Object(c["h"])(" time. ")])])])]),Object(c["f"])("div",{class:"carousel-item"},[Object(c["f"])("div",{class:"carousel-caption d-none d-md-block"},[Object(c["f"])("div",{class:"img-height-width"},[Object(c["f"])("div",{class:"imgage_slider"},[Object(c["f"])("img",{src:"public/notification.png",alt:"Logo",class:"img_slide1"})]),Object(c["f"])("h1",{class:"content-header-color"},"NOTIFICATION"),Object(c["f"])("p",{class:"content_color"},[Object(c["h"])(" Get advance reminder for GST Return"),Object(c["f"])("br"),Object(c["h"])(" due dates. ")]),Object(c["f"])("div")])])])])])])],-1),d={class:"col-xl-5 col-lg-6 col-12 fxt-bg-color"},f={class:"fxt-content content-hieght"},u=Object(c["g"])('<div class="fxt-header"><img src="'+o.a+'" alt="Logo" class="logo_size"><ul class="fxt-socials"><li class="fxt-google"><a href="login/google" title="google"><i class="fab fa-google-plus-g"></i><span>Google +</span></a></li><li class="fxt-facebook"><a href="redirect/facebook" title="Facebook"><i class="fab fa-facebook-f"></i><span>Facebook</span></a></li></ul><div class="fxt-style-line"><h2>Or SignIn With Email</h2></div></div>',1),b={class:"fxt-form"},g=Object(c["f"])("input",{name:"_token",type:"hidden",value:"ON3CmOjY39B8xmODgSTTPB5QlwRmPgGCbadpZAaq"},null,-1),m={class:"form-group"},p={class:"fxt-transformY-50 fxt-transition-delay-1"},h={class:"form-group"},v={class:"fxt-transformY-50 fxt-transition-delay-2"},O={align:"right",style:{overflow:"visible"}},j=Object(c["g"])('<div class="form-group"><div class="fxt-transformY-50 fxt-transition-delay-3"><div class="fxt-checkbox-area"><div class="checkbox"><input id="checkbox1" type="checkbox"><label for="checkbox1">Keep me logged in</label></div><a href="https://instabill.co/forget_password" class="switcher-text">Forgot Password</a></div></div></div>',1),x={class:"form-group"},y={class:"fxt-transformY-50 fxt-transition-delay-4",style:{"margin-top":"-25px"}},I={class:"fxt-footer"},_={class:"fxt-transformY-50 fxt-transition-delay-5"},w=Object(c["h"])(" Don't have an account?"),S=Object(c["h"])("Sign Up");function k(e,t,a,s,o,k){var E=Object(c["z"])("router-link");return Object(c["s"])(),Object(c["e"])("section",i,[Object(c["f"])("div",l,[Object(c["f"])("div",r,[n,Object(c["f"])("div",d,[Object(c["f"])("div",f,[u,Object(c["f"])("div",b,[Object(c["f"])("form",null,[g,Object(c["f"])("div",m,[Object(c["f"])("div",p,[Object(c["G"])(Object(c["f"])("input",{type:"email",name:"email","onUpdate:modelValue":t[0]||(t[0]=function(t){return e.email=t}),required:"",id:"email",placeholder:"Enter Email Id",class:"form-control"},null,512),[[c["D"],e.email]])])]),Object(c["f"])("div",h,[Object(c["f"])("div",v,[Object(c["G"])(Object(c["f"])("input",{type:"password",name:"password","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.password=t}),required:"",id:"password",class:"form-control",placeholder:"Password"},null,512),[[c["D"],e.password]]),Object(c["f"])("span",O,[Object(c["f"])("i",{class:"fa fa-eye-slash",id:"pass-status",onClick:t[2]||(t[2]=function(e){return k.togglePass()}),"aria-hidden":"false",style:{"text-align":"right",position:"relative",top:"-32px",float:"right","margin-right":"15px",cursor:"pointer"}})])])]),j,Object(c["f"])("div",x,[Object(c["f"])("div",y,[Object(c["f"])("button",{onClick:t[3]||(t[3]=Object(c["H"])((function(e){return k.Login()}),["prevent"])),type:"submit",class:"fxt-btn-fill"}," SIGN IN ")])])])]),Object(c["f"])("div",I,[Object(c["f"])("div",_,[Object(c["f"])("p",null,[w,Object(c["i"])(E,{to:"/signup",class:"switcher-text2 inline-text"},{default:Object(c["F"])((function(){return[S]})),_:1})])])])])])])])])}a("d3b7"),a("e9c4"),a("b0c0");var E=a("e4b4"),L={data:function(){return{email:"",password:""}},mounted:function(){document.querySelector(".fxt-checkbox-area label").addEventListener("click",(function(e){e.target.classList.toggle("checkMe"),document.querySelector("#checkbox1").checked=!document.querySelector("#checkbox1").checked}))},methods:{togglePass:function(){document.querySelector(".form-control#password").type="password"===document.querySelector(".form-control#password").type?"text":"password",document.querySelector("#pass-status").classList.toggle("fa-eye-slash"),document.querySelector("#pass-status").classList.toggle("fa-eye")},Login:function(){var e=this;if(""==this.email||""==this.password)return alert("Please enter email and password"),!1;if(!Object(E["b"])(this.email))return alert("Please enter valid email"),!1;var t={email:this.email,password:this.password};fetch("https://tradeopedia.co/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(t){if("Success"==t.errorMsg)return localStorage.setItem("userId",t.data.userId),localStorage.setItem("name",t.data.name),localStorage.setItem("user_email",t.data.email),localStorage.setItem("user_phone",t.data.phone),localStorage.setItem("expire_date",t.data.expire_date),localStorage.setItem("login_time",t.data.login_time),localStorage.setItem("packages_id",t.data.packages_id),localStorage.setItem("token",t.data.token),localStorage.setItem("package_plan",t.data.package_plan),localStorage.setItem("device_token",t.data.device_token),localStorage.setItem("device_type",t.data.device_type),localStorage.setItem("quotation_footer",t.data.quotation_footer),localStorage.setItem("company_id",t.data.company_id),localStorage.setItem("company_logo",t.data.company_logo),localStorage.setItem("company_name",t.data.company_name),localStorage.setItem("company_gstin",t.data.company_gstin),localStorage.setItem("gst_composite_scheme",t.data.gst_composite_scheme),localStorage.setItem("company_address",t.data.company_address),localStorage.setItem("inventory_status",t.data.inventory_status),""==t.data.company_id?(e.$router.push("/website_first_profile"),!1):(e.$router.push("/website_dashboard"),!1);alert(t.errorMsg)})).catch((function(e){console.log(e)}))}}},A=(a("b8f3"),a("6b0d")),q=a.n(A);const T=q()(L,[["render",k]]);t["default"]=T},e4b4:function(e,t,a){"use strict";a.d(t,"a",(function(){return c})),a.d(t,"b",(function(){return s}));var c=function(){document.addEventListener("scroll",(function(){document.querySelector("#header")&&(window.scrollY>100?document.querySelector("#header").classList.add("shadowed"):document.querySelector("#header").classList.remove("shadowed")),document.querySelector(".invoices-div nav")&&(window.scrollY>document.querySelector(".invoices-div nav").offsetTop?(document.querySelector(".invoices-div .h").classList.add("h1-div-card"),document.querySelector(".invoices-div .navbar").classList.add("navbar-stick"),window.scrollY,document.querySelector(".invoices-div nav").offsetTop):(document.querySelector(".invoices-div .h").classList.remove("h1-div-card"),document.querySelector(".invoices-div .navbar").classList.remove("navbar-stick")))}))},s=(a("ac1f"),a("00b4"),function(e){var t=/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return!!t.test(e)})},e8b5:function(e,t,a){var c=a("c6b6");e.exports=Array.isArray||function(e){return"Array"==c(e)}},e9c4:function(e,t,a){var c=a("23e7"),s=a("d066"),o=a("2ba4"),i=a("c65b"),l=a("e330"),r=a("d039"),n=a("e8b5"),d=a("1626"),f=a("861d"),u=a("d9b5"),b=a("f36a"),g=a("4930"),m=s("JSON","stringify"),p=l(/./.exec),h=l("".charAt),v=l("".charCodeAt),O=l("".replace),j=l(1..toString),x=/[\uD800-\uDFFF]/g,y=/^[\uD800-\uDBFF]$/,I=/^[\uDC00-\uDFFF]$/,_=!g||r((function(){var e=s("Symbol")();return"[null]"!=m([e])||"{}"!=m({a:e})||"{}"!=m(Object(e))})),w=r((function(){return'"\\udf06\\ud834"'!==m("\udf06\ud834")||'"\\udead"'!==m("\udead")})),S=function(e,t){var a=b(arguments),c=t;if((f(t)||void 0!==e)&&!u(e))return n(t)||(t=function(e,t){if(d(c)&&(t=i(c,this,e,t)),!u(t))return t}),a[1]=t,o(m,null,a)},k=function(e,t,a){var c=h(a,t-1),s=h(a,t+1);return p(y,e)&&!p(I,s)||p(I,e)&&!p(y,c)?"\\u"+j(v(e,0),16):e};m&&c({target:"JSON",stat:!0,forced:_||w},{stringify:function(e,t,a){var c=b(arguments),s=o(_?S:m,null,c);return w&&"string"==typeof s?O(s,x,k):s}})},fce3:function(e,t,a){var c=a("d039"),s=a("da84"),o=s.RegExp;e.exports=c((function(){var e=o(".","s");return!(e.dotAll&&e.exec("\n")&&"s"===e.flags)}))}}]);
//# sourceMappingURL=chunk-0f87202a.61a386e2.js.map