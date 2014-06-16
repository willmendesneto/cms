"use strict";angular.module("cmsApp",["ngRoute","firebase"]).constant("IMAGE_SERVICE_URL","http://mst-image-service.herokuapp.com/upload").constant("FIREBASE_REF",new Firebase("https://mst-cms.firebaseio.com/customtags")).constant("DRAFT_URL","/repos/movimento-sem-terra/site-novo/contents/_drafts/").constant("PUBLISH_URL","/repos/movimento-sem-terra/site-novo/contents/_posts/").config(["$routeProvider","$httpProvider","$logProvider",function(a,b,c){b.defaults.useXDomain=!0,delete b.defaults.headers.common["X-Requested-With"],c.debugEnabled(!0),a.when("/auth",{templateUrl:"views/auth.html",controller:"AuthCtrl"}).when("/posts",{templateUrl:"views/posts.html",controller:"PostsCtrl"}).when("/post/:sha",{templateUrl:"views/post.html",controller:"PostCtrl"}).when("/post",{templateUrl:"views/post.html",controller:"PostCtrl"}).otherwise({redirectTo:"/auth"})}]).run(["$rootScope","$location",function(a,b){a.$on("$locationChangeStart",function(){return a.error=null,a.github?void 0:(b.path("/auth").replace(),!1)})}]),angular.module("cmsApp").controller("PostCtrl",["$scope","$rootScope","$routeParams","Post","_","DRAFT_URL","PUBLISH_URL",function(a,b,c,d,e,f,g){function h(a){return b.posts.filter(function(b){return b.sha===a}).shift(0)}function i(){return d.makePost()}function j(a){return"https://api.github.com/repos/movimento-sem-terra/site-novo/git/blobs/"+a}function k(a,b){for(var c=a.length,d=0;c>d;d++)if(a[d].value===b)return a[d]}function l(b){a.menuTag=b.getMenuItem(),a.section=k(a.sectionOptions,b.getSection()),a.label=k(a.labelOptions,b.getLabel()),a.tag=b.tags,a.imagesHD=b.getImagesHD(),a.$apply()}function m(b){if(b.name)return b.name;var c,d="",e=a.getTime(),f=("0"+(e.getMonth()+1)).slice(-2);return d=e.getFullYear()+"-"+f+"-"+e.getDate(),c=b.content.meta.title.toLowerCase().replace(/[^\w\s]/gi,"").replace(/[ ]([a-zA-Z])/g,function(a,b){return"-"+b}),d+"-"+c+".md"}function n(a){return"/repos/movimento-sem-terra/site-novo/contents/_drafts/"+m(a)}var o=c.sha;a.post=o?h(o):i(),a.postStatus=function(){var b=new RegExp("^https?://.*?/_drafts/?"),c=new RegExp("^https?://.*?/_posts/?");return"undefined"==typeof a.post.html_url?"NOVO":b.exec(a.post.html_url)?"RASCUNHO":c.exec(a.post.html_url)?"PUBLICADO":""},a.menuTagOptions=["agricultura camponesa","agronegócio","direitos humanos","educação, cultura e comunicação","lutas e mobilizações","solidariedade internacional","meio ambiente","projeto popular","reforma agrária","transgênicos"],a.sectionOptions=[{label:"Destaque",value:"featured-news"},{label:"Debate",value:"debate"},{label:"Capa",value:"cover"},{label:"MST TV",value:"tv"}],a.labelOptions=[{label:"Artigo",value:"articles"},{label:"Entrevista",value:"interviews"},{label:"Reportagens Especiais",value:"special-stories"}],a.menuTag=void 0,a.section=void 0,a.label=void 0,a.tag="",a.tagsPersonalizadas=[],a.imagesHD=void 0,a.$watch("label",function(b){a.post.setLabel(b)}),a.$watch("menuTag",function(b){a.post.setMenuItem(b)}),a.$watch("section",function(b){a.post.setSection(b)}),a.$watch("imagesHD",function(b){a.post.setImagesHD(b)}),o?b.github.get(j(o)).done(function(b){a.post.loadContentFromJekyllData(atob(b.content)),l(a.post)}):(a.post.create(),l(a.post)),a.processTag=function(){e.contains(a.tagsPersonalizadas,a.tag)||(a.post.addNewTag(a.tag),a.tagsPersonalizadas.push(a.tag)),a.tag=""},a.removeTag=function(b){var c=a.tagsPersonalizadas[b];a.post.deleteTag(c),a.tagsPersonalizadas.splice(b,1)},a.save=function(a){b.github.put(n(a),{data:JSON.stringify(a.commitData())}).done(function(){alert("Post salvo com sucesso!")}).fail(function(a){console.log("error data:",a)})},a.publish=function(b){var c=g+b.name;a.save(b,c)},a.draft=function(b){var c=f+b.name;a.save(b,c)},a.prepareNameFile=function(a){return m(a)},a.getTime=function(){return new Date}}]),angular.module("cmsApp").controller("UploadCtrl",["$scope","Image",function(a,b){function c(a){return{image:a,thumbnail:a,description:a}}a.uploadImage=function(){var d=a.file,e=-1;if(d){var f=d;e=a.images.push(c("img/loading.gif"))-1,b.send(f,e,a.addImage)}return e},a.images=[],a.currentImage=a.images[0],a.setCurrentImage=function(b){a.currentImage=b,window.alert("Utilize CTRL+C/CMD+C para copiar o endereço da imagem.")},a.addImage=function(b,d){a.images[b]=c(d)}}]),angular.module("cmsApp").controller("PostsCtrl",["$scope","$rootScope","_","Post","$filter",function(a,b,c,d,e){b.github.get("/repos/movimento-sem-terra/site-novo/contents/_drafts").done(function(f){a.$apply(function(){b.posts=c.map(f,d.makePost),a.currentPage=0,a.pageSize=10,a.numberOfPages=function(){return Math.ceil(b.posts.length/a.pageSize)},a.tableOrderBy=function(c,d){a.posts=e("orderBy")(b.posts,c,d)},a.nextPage=function(){a.currentPage=a.currentPage+1},a.previousPage=function(){a.currentPage=a.currentPage-1}})})}]),angular.module("cmsApp").controller("AuthCtrl",["$scope","$rootScope","$location","oauth",function(a,b,c,d){a.authenticate=function(){d.popup("github",function(d,e){return d?alert(d):(b.github=e,c.path("/posts"),void a.$apply())})}}]),angular.module("cmsApp").factory("oauth",function(){var a=window.OAuth;return a.initialize("S2shWzj2Cp87Mg4estazc6DFGQc"),a}),angular.module("cmsApp").directive("ckEditor",function(){return{require:"?ngModel",link:function(a,b,c,d){var e=window.CKEDITOR.replace(b[0]);e.config.height="100%",e.on("instanceReady",function(){e.setData(d.$viewValue)}),e.on("pasteState",function(){a.$apply(function(){d.$setViewValue(e.getData())})}),d.$render=function(){e.setData(d.$modelValue)}}}}),angular.module("cmsApp").directive("upload",function(){return{restrict:"A",controller:"UploadCtrl",scope:{file:"="},link:function(a,b){b.bind("change",function(b){var c=b.target.files;a.file=c[0],a.$apply()})}}}),angular.module("cmsApp").directive("selectOnFocus",function(){return{restrict:"A",link:function(a,b){b.on("focus",function(){this.select()})}}}),angular.module("cmsApp").factory("_",function(){return window._}),angular.module("cmsApp").factory("Image",["$http","$rootScope","IMAGE_SERVICE_URL","FormDataObject",function(a,b,c,d){var e={send:function(e,f,g){a({url:c,method:"POST",transformRequest:d,headers:{"Content-Type":void 0},data:{token:b.github.access_token,myfile:e}}).success(function(a){g(f,a)}).error(function(a,b,c){console.log("error"),console.log(a),console.log(b),console.log(c)})}};return e}]),angular.module("cmsApp").factory("FormDataObject",function(){return function(a){var b=new FormData;return angular.forEach(a,function(a,c){b.append(c,a)}),b}}),angular.module("cmsApp").factory("CustomTag",["$firebase","FIREBASE_REF",function(a,b){var c=a(b),d={all:c,addNewCustomTag:function(a){c.$add(a)}};return d}]),angular.module("cmsApp").service("Post",["_","jsyaml","CustomTag",function(a,b,c){return{makePost:function(d){var e={};return a.extend(e,d),e.loadContentFromJekyllData=function(a){var c=decodeURIComponent(escape(a)).split("---");e.content={text:c.pop().replace(/^\n/,""),meta:b.load(c.pop())}},e.create=function(){e.content={text:"",meta:{layout:"post",title:"",legacy_url:"",created:0,images:"",video:"",tags:[],type:"",support_line:"",section:"",hat:"",label:"",images_hd:""}}},e.convertContentToJekyllData=function(){if(!e.content)return"";var a=["---",b.dump(e.content.meta),"---",e.content.text].join("\n");return unescape(encodeURIComponent(a))},e.commitData=function(){return{sha:e.sha,content:btoa(e.convertContentToJekyllData()),message:"commit from cms"}},e.setMenuItem=function(b){e.content&&(e.content.meta.tags=a.filter(e.content.meta.tags,function(a){return!/^menu:/.test(a)}),b&&e.content.meta.tags.push("menu:"+b))},e.getMenuItem=function(){return e.content?"agricultura camponesa":""},e.setLabel=function(a){return e.content?a?void(e.content.meta.label=a.value):void(e.content.meta.label=""):void 0},e.getLabel=function(){return e.content?e.content.meta.label:""},e.setSection=function(a){return e.content?a?void(e.content.meta.section=a.value):void(e.content.meta.section=""):void 0},e.getSection=function(){return e.content?e.content.meta.section:""},e.setImagesHD=function(a){return e.content?a?void(e.content.meta.images_hd=a):void(e.content.meta.images_hd=""):void 0},e.getImagesHD=function(){return e.content?e.content.meta.images_hd:""},e.addNewTag=function(a){if(e.content.meta.tags){var b={personalizada:a};c.addNewCustomTag(b);var d="personalizada:"+a;e.content.meta.tags.push(d)}},e.deleteTag=function(b){e.content.meta.tags&&(e.content.meta.tags=a.without(e.content.meta.tags,"personalizada:"+b))},e}}}]),angular.module("cmsApp").factory("jsyaml",function(){return window.jsyaml}),angular.module("cmsApp").filter("startFrom",function(){return function(a,b){return b=+b,"object"==typeof a&&a.length>0?a.slice(b):[]}});