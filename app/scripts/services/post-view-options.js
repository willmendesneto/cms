'use strict';

angular.module('cmsApp').factory('PostViewOptions', function () {

  var menuTagOptions = [
    {label: 'agricultura camponesa', value: 'agricultura camponesa'},
    {label: 'agronegócio', value: 'agronegócio'},
    {label: 'direitos humanos', value: 'direitos humanos'},
    {label: 'educação, cultura e comunicação', value: 'educação, cultura e comunicação'},
    {label: 'lutas e mobilizações', value: 'lutas e mobilizações'},
    {label: 'solidariedade internacional', value: 'solidariedade'},
    {label: 'meio ambiente', value: 'meio ambiente'},
    {label: 'projeto popular', value: 'projeto popular'},
    {label: 'reforma agrária', value: 'reforma agrária'},
    {label: 'transgênicos', value: 'transgênicos'}
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
