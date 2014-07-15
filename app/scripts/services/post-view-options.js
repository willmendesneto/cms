'use strict';

angular.module('cmsApp').factory('PostViewOptions', function () {

  var menuTagOptions = [
    'agricultura camponesa',
    'agronegócio',
    'direitos humanos',
    'educação, cultura e comunicação',
    'lutas e mobilizações',
    'solidariedade internacional',
    'meio ambiente',
    'projeto popular',
    'reforma agrária',
    'transgênicos'
  ];

  var sectionOptions = [
    {label: 'Capa', value: 'cover'},
    {label: 'Destaque', value: 'featured-news'},
    {label: 'VÍDEO', value: 'tv'}
  ];

  var labelOptions = [
    {label: 'Artigo', value: 'articles'},
    {label: 'Entrevista', value: 'interviews'},
    {label: 'Reportagens Especiais', value: 'special-stories'}
  ];

  var PostViewOptions = {
    getMenuTagOptions: function() {
      return menuTagOptions;
    },

    getSectionOptions: function() {
      return sectionOptions;
    },

    getLabelOptions: function() {
      return labelOptions;
    }
  };

  return PostViewOptions;
});
