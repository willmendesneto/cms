"use strict";var app=angular.module("cmsApp",["ngRoute","firebase"]);app.constant("IMAGE_SERVICE_URL","http://mst-image-service.herokuapp.com/upload"),app.constant("FIREBASE_REF",new Firebase("https://mst-cms.firebaseio.com/customtags")),app.config(["$routeProvider",function(a){a.when("/auth",{templateUrl:"views/auth.html",controller:"AuthCtrl"}).when("/posts",{templateUrl:"views/posts.html",controller:"PostsCtrl"}).when("/posts/:sha",{templateUrl:"views/post.html",controller:"PostCtrl"}).otherwise({redirectTo:"/auth"})}]),app.config(["$httpProvider","$logProvider",function(a,b){a.defaults.useXDomain=!0,delete a.defaults.headers.common["X-Requested-With"],b.debugEnabled(!0)}]),app.controller("PostCtrl",["$scope","$rootScope","$routeParams","$window","Image",function(a,b,c,d,e){function f(a){return b.posts.filter(function(b){return b.sha===a}).shift(0)}function g(a){return"https://api.github.com/repos/movimento-sem-terra/site-novo/git/blobs/"+a}function h(a){return"/repos/movimento-sem-terra/site-novo/contents/_drafts/"+a}var i=c.sha;a.post=f(i),a.menuTagOptions=["agricultura camponesa","agronegócio","direitos humanos","educação, cultura e comunicação","lutas e mobilizações","solidariedade internacional","meio ambiente","projeto popular","reforma agrária","transgênicos"],a.sectionOptions=[{label:"Destaque",value:"featured-news"},{label:"Debate",value:"debate"},{label:"Capa",value:"cover"},{label:"MST TV",value:"tv"}],a.labelOptions=[{label:"Artigo",value:"articles"},{label:"Entrevista",value:"interviews"},{label:"Reportagens Especiais",value:"special-stories"}],a.menuTag=void 0,a.section=void 0,a.label=void 0,a.tag="",a.imagesHD=void 0,a.$watch("label",function(b){a.post.setLabel(b)}),a.$watch("menuTag",function(b){a.post.setMenuItem(b)}),a.$watch("section",function(b){a.post.setSection(b)}),a.$watch("imagesHD",function(b){a.post.setImagesHD(b)}),b.github.get(g(i)).done(function(b){a.post.loadContentFromJekyllData(atob(b.content)),a.$apply()}),a.save=function(a){b.github.put(h(a.name),{data:JSON.stringify(a.commitData())}).done(function(){alert("Post salvo com sucesso!")}).fail(function(a){console.log("error data:",a)})},a.uploadImage=function(){var b=document.getElementById("imgFile");if(b.files.length>0){var c=b.files[0];e.send(c,a.addImage)}},a.images=[],a.currentImage=a.images[0],a.setCurrentImage=function(b){a.currentImage=b,d.alert("Utilize CTRL+C/CMD+C para copiar o endereço da imagem.")},a.addImage=function(b){var c={image:b,thumbnail:b,description:b};a.images.push(c)}}]),app.controller("PostsCtrl",["$scope","$rootScope","_","Post",function(a,b,c,d){b.github.get("/repos/movimento-sem-terra/site-novo/contents/_drafts").done(function(e){b.posts=c.map(e,d.makePost),a.$apply()})}]),app.controller("AuthCtrl",["$scope","$rootScope","$location","oauth",function(a,b,c,d){a.authenticate=function(){d.popup("github",function(d,e){return d?alert(d):(b.github=e,c.path("/posts"),void a.$apply())})}}]),app.factory("oauth",function(){var a=window.OAuth;return a.initialize("S2shWzj2Cp87Mg4estazc6DFGQc"),a}),app.directive("ckEditor",function(){return{require:"?ngModel",link:function(a,b,c,d){var e=window.CKEDITOR.replace(b[0]);e.on("instanceReady",function(){e.setData(d.$viewValue)}),e.on("pasteState",function(){a.$apply(function(){d.$setViewValue(e.getData())})}),d.$render=function(){e.setData(d.$modelValue)}}}}),app.directive("selectOnFocus",function(){return{restrict:"A",link:function(a,b){b.on("focus",function(){this.select()})}}}),app.factory("_",function(){return window._}),app.factory("Image",["$http","$rootScope","IMAGE_SERVICE_URL","FormDataObject",function(a,b,c,d){var e={send:function(e,f){a({url:c,method:"POST",transformRequest:d,headers:{"Content-Type":void 0},data:{token:b.github.access_token,myfile:e}}).success(function(a,b,c,d){console.log("success"),console.log(a),console.log(b),console.log(c),console.log(d),f(a)}).error(function(a,b,c){console.log("error"),console.log(a),console.log(b),console.log(c)})}};return e}]),app.factory("FormDataObject",function(){return function(a){var b=new FormData;return angular.forEach(a,function(a,c){b.append(c,a)}),b}}),app.service("Post",["_","jsyaml",function(a,b){return{makePost:function(c){var d={};return a.extend(d,c),d.loadContentFromJekyllData=function(a){var c=decodeURIComponent(escape(a)).split("---");d.content={text:c.pop().replace(/^\n/,""),meta:b.load(c.pop())}},d.convertContentToJekyllData=function(){if(!d.content)return"";var a=["---",b.dump(d.content.meta),"---",d.content.text].join("\n");return unescape(encodeURIComponent(a))},d.commitData=function(){return{sha:d.sha,content:btoa(d.convertContentToJekyllData()),message:"commit from cms"}},d.setMenuItem=function(b){d.content&&(d.content.meta.tags=a.filter(d.content.meta.tags,function(a){return!/^menu:/.test(a)}),b&&d.content.meta.tags.push("menu:"+b))},d.setLabel=function(a){return d.content?a?void(d.content.meta.label=a.value):void(d.content.meta.label=""):void 0},d.setSection=function(a){return d.content?a?void(d.content.meta.section=a.value):void(d.content.meta.section=""):void 0},d.setImagesHD=function(a){return d.content?a?void(d.content.meta.images_hd=a):void(d.content.meta.images_hd=""):void 0},d.addNewTag=function(a){d.content.meta.tags&&(a="personalizada:"+a,d.content.meta.tags.push(a))},d}}}]),app.factory("jsyaml",function(){return window.jsyaml});