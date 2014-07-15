'use strict';

describe('Service: PostViewOptions',function() {

  beforeEach(module('cmsApp'));

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

  var PostViewOptionsService;
  beforeEach(inject(function (_PostViewOptions_) {
    PostViewOptionsService = _PostViewOptions_;
  }));

  it('#getMenuTagOptions should return menuTagOptions',function(){
    var options = PostViewOptionsService.getMenuTagOptions();

    expect(options).toEqual(menuTagOptions);
  });

  it('#getSectionOptions should return sectionOptions',function(){
    var options = PostViewOptionsService.getSectionOptions();

    expect(options).toEqual(sectionOptions);
  });

  it('#getLabelOptions should return labelOptions',function(){
    var options = PostViewOptionsService.getLabelOptions();

    expect(options).toEqual(labelOptions);
  });
});
