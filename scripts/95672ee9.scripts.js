"use strict";angular.module("cmsApp",["ngRoute","firebase"]).constant("IMAGE_SERVICE_URL","http://mst-image-service.herokuapp.com/upload").constant("FIREBASE_REF",new Firebase("https://mst-cms.firebaseio.com/customtags")).constant("DRAFT_URL","/repos/movimento-sem-terra/site-novo/contents/_drafts/").constant("PUBLISH_URL","/repos/movimento-sem-terra/site-novo/contents/_posts/").config(["$routeProvider","$httpProvider","$logProvider",function(a,b,c){b.defaults.useXDomain=!0,delete b.defaults.headers.common["X-Requested-With"],c.debugEnabled(!0),a.when("/auth",{templateUrl:"views/auth.html",controller:"AuthCtrl"}).when("/posts",{templateUrl:"views/posts.html",controller:"PostsCtrl"}).when("/post/:sha",{templateUrl:"views/post.html",controller:"PostCtrl"}).when("/post",{templateUrl:"views/post.html",controller:"PostCtrl"}).otherwise({redirectTo:"/auth"})}]).run(["$rootScope","$location",function(a,b){a.$on("$locationChangeStart",function(){return a.error=null,a.github?void 0:(b.path("/auth").replace(),!1)})}]),angular.module("cmsApp").controller("PostCtrl",["$scope","$rootScope","$routeParams","Post","_","DRAFT_URL","PUBLISH_URL","DateUtil",function(a,b,c,d,e,f,g,h){function i(a){return b.posts.filter(function(b){return b.sha===a}).shift(0)}function j(){return d.makePost()}function k(a){return"https://api.github.com/repos/movimento-sem-terra/site-novo/git/blobs/"+a}function l(a,b){for(var c=a.length,d=0;c>d;d++)if(a[d].value===b)return a[d]}function m(b){a.menuTag=b.getMenuItem(),a.section=l(a.sectionOptions,b.getSection()),a.label=l(a.labelOptions,b.getLabel()),a.imagesHD=b.getImagesHD(),a.$apply()}function n(a){if(a.name)return a.name;var b,c="",d=h.getTime(),e=("0"+(d.getMonth()+1)).slice(-2);return c=d.getFullYear()+"-"+e+"-"+d.getDate(),b=a.content.meta.title.toLowerCase().replace(/[^\w\s]/gi,"").replace(/[ ]([a-zA-Z])/g,function(a,b){return"-"+b}),c+"-"+b+".md"}var o=c.sha;a.post=o?i(o):j(),a.menuTagOptions=["agricultura camponesa","agronegócio","direitos humanos","educação, cultura e comunicação","lutas e mobilizações","solidariedade internacional","meio ambiente","projeto popular","reforma agrária","transgênicos"],a.sectionOptions=[{label:"Destaque",value:"featured-news"},{label:"Debate",value:"debate"},{label:"Capa",value:"cover"},{label:"MST TV",value:"tv"}],a.labelOptions=[{label:"Artigo",value:"articles"},{label:"Entrevista",value:"interviews"},{label:"Reportagens Especiais",value:"special-stories"}],a.menuTag=void 0,a.section=void 0,a.label=void 0,a.tag="",a.tagsPersonalizadas=[],a.imagesHD=void 0,a.$watch("label",function(b){a.post.setLabel(b)}),a.$watch("menuTag",function(b){a.post.setMenuItem(b)}),a.$watch("section",function(b){a.post.setSection(b)}),a.$watch("imagesHD",function(b){a.post.setImagesHD(b)}),o?b.github.get(k(o)).done(function(b){a.post.loadContentFromJekyllData(atob(b.content)),m(a.post)}):a.post.create(),a.processTag=function(){a.tag&&(e.contains(a.tagsPersonalizadas,a.tag)||(a.post.addNewTag(a.tag),a.tagsPersonalizadas.push(a.tag)),a.tag="")},a.removeTag=function(b){var c=a.tagsPersonalizadas[b];a.post.deleteTag(c),a.tagsPersonalizadas.splice(b,1)},a.save=function(a,c){b.github.put(c,{data:JSON.stringify(a.commitData())}).done(function(){window.alert("Post salvo com sucesso!")}).fail(function(a){console.log("error data:",a)})},a.publish=function(b){var c=g+a.prepareNameFile(b);a.save(b,c)},a.draft=function(b){var c=f+a.prepareNameFile(b);a.save(b,c)},a.prepareNameFile=function(a){return n(a)},a.postStatus=function(){var b=new RegExp("^https?://.*?/_drafts/?"),c=new RegExp("^https?://.*?/_posts/?");return"undefined"==typeof a.post.html_url?"NOVO":b.exec(a.post.html_url)?"RASCUNHO":c.exec(a.post.html_url)?"PUBLICADO":""}}]),angular.module("cmsApp").controller("UploadCtrl",["$scope","Image",function(a,b){function c(a){return{image:a,thumbnail:a,description:a}}a.uploadImage=function(){var d=a.file,e=-1;if(d){var f=d;e=a.images.push(c("images/loading.gif"))-1,b.send(f,e,a.addImage)}return e},a.images=[],a.currentImage=a.images[0],a.setCurrentImage=function(b){a.currentImage=b,window.alert("Utilize CTRL+C/CMD+C para copiar o endereço da imagem.")},a.addImage=function(b,d){a.images[b]=c(d)}}]),angular.module("cmsApp").controller("PostsCtrl",["$scope","$rootScope","_","Post","$filter","Posts",function(a,b,c,d,e,f){b.posts=[],f.success(function(a){b.posts=c.map(a,d.makePost)}),a.currentPage=0,a.pageSize=10,a.numberOfPages=function(){return Math.ceil(b.posts.length/a.pageSize)},a.tableOrderBy=function(c,d){a.posts=e("orderBy")(b.posts,c,d)},a.nextPage=function(){a.currentPage=a.currentPage+1},a.previousPage=function(){a.currentPage=a.currentPage-1}}]),angular.module("cmsApp").controller("AuthCtrl",["$scope","$rootScope","$location","oauth",function(a,b,c,d){a.authenticate=function(){d.popup("github",function(d,e){return d?alert(d):(b.github=e,c.path("/posts"),void a.$apply())})}}]),angular.module("cmsApp").factory("oauth",function(){var a=window.OAuth;return a.initialize("S2shWzj2Cp87Mg4estazc6DFGQc"),a}),angular.module("cmsApp").directive("ckEditor",function(){return{require:"?ngModel",link:function(a,b,c,d){var e=window.CKEDITOR.replace(b[0]);e.config.height="100%",d&&(e.on("pasteState",function(){a.$apply(function(){d.$setViewValue(e.getData())})}),d.$render=function(){e.setData(d.$viewValue)})}}}),angular.module("cmsApp").directive("upload",function(){return{restrict:"A",controller:"UploadCtrl",scope:{file:"="},link:function(a,b){b.bind("change",function(b){var c=b.target.files;a.file=c[0],a.$apply()})}}}),angular.module("cmsApp").directive("selectOnFocus",function(){return{restrict:"A",link:function(a,b){b.on("focus",function(){this.select()})}}}),angular.module("cmsApp").factory("_",function(){return window._}),angular.module("cmsApp").factory("Image",["$http","$rootScope","IMAGE_SERVICE_URL","FormDataObject",function(a,b,c,d){var e={send:function(e,f,g){a({url:c,method:"POST",transformRequest:d,headers:{"Content-Type":void 0},data:{token:b.github.access_token,myfile:e}}).success(function(a){g(f,a)}).error(function(a,b,c){console.log("error"),console.log(a),console.log(b),console.log(c)})}};return e}]),angular.module("cmsApp").factory("FormDataObject",function(){return function(a){var b=new FormData;return angular.forEach(a,function(a,c){b.append(c,a)}),b}}),angular.module("cmsApp").factory("CustomTag",["$firebase","FIREBASE_REF",function(a,b){var c=a(b),d={all:c,addNewCustomTag:function(a){c.$add(a)}};return d}]),angular.module("cmsApp").service("Post",["_","jsyaml","CustomTag","DateUtil",function(a,b,c,d){return{makePost:function(e){var f={};return a.extend(f,e),f.loadContentFromJekyllData=function(a){var c=decodeURIComponent(escape(a)).split("---");f.content={text:c.pop().replace(/^\n/,""),meta:b.load(c.pop())}},f.create=function(){f.content={text:"",meta:{layout:"post",title:"",legacy_url:"",created:0,images:"",video:"",tags:[],type:"",support_line:"",section:"",hat:"",label:"",images_hd:""}}},f.getContent=function(){return f.content.meta.created||(f.content.meta.created=d.getTime().getTime()),f.content.meta},f.convertContentToJekyllData=function(){if(!f.content)return"";var a=["---",b.dump(f.getContent()),"---",f.content.text].join("\n");return unescape(encodeURIComponent(a))},f.commitData=function(){return{sha:f.sha,content:btoa(f.convertContentToJekyllData()),message:"commit from cms"}},f.setMenuItem=function(b){f.content&&(f.content.meta.tags=a.filter(f.content.meta.tags,function(a){return!/^menu:/.test(a)}),b&&f.content.meta.tags.push("menu:"+b))},f.getMenuItem=function(){if(!f.content)return"";var b=a.filter(f.content.meta.tags,function(a){return/^menu:/.test(a)});return 0===b.length?"":b[0].substr(5)},f.setLabel=function(a){return f.content?a?void(f.content.meta.label=a.value):void(f.content.meta.label=""):void 0},f.getLabel=function(){return f.content?f.content.meta.label:""},f.setSection=function(a){return f.content?a?void(f.content.meta.section=a.value):void(f.content.meta.section=""):void 0},f.getSection=function(){return f.content?f.content.meta.section:""},f.setImagesHD=function(a){return f.content?a?void(f.content.meta.images_hd=a):void(f.content.meta.images_hd=""):void 0},f.getImagesHD=function(){return f.content?f.content.meta.images_hd:""},f.addNewTag=function(a){if(f.content.meta.tags){var b={personalizada:a};c.addNewCustomTag(b);var d="personalizada:"+a;f.content.meta.tags.push(d)}},f.deleteTag=function(b){f.content.meta.tags&&(f.content.meta.tags=a.without(f.content.meta.tags,"personalizada:"+b))},f}}}]),angular.module("cmsApp").factory("Posts",["$rootScope",function(a){var b=a.github.get("/repos/movimento-sem-terra/site-novo/contents/_drafts");return b}]),angular.module("cmsApp").factory("DateUtil",function(){return{getTime:function(){return new Date}}}),angular.module("cmsApp").factory("jsyaml",function(){return window.jsyaml}),angular.module("cmsApp").filter("startFrom",function(){return function(a,b){return b=+b,"object"==typeof a&&a.length>0?a.slice(b):[]}});