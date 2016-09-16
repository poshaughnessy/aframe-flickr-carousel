AFRAME.registerPrimitive('a-flickrcarousel', {
  defaultComponents: {
    'flickr-search': {
      search: '',
      apiKey: '',
      numResults: 15
    },
    'rotate-on-click': {},
    'layout': {type: 'circle'}
  },
  mappings: {
    numResults: 'flickr-search.numResults',
    apiKey: 'flickr-search.apiKey',
    degrees: 'rotate-on-click.degrees',
    duration: 'rotate-on-click.duration',
    radius: 'layout.radius',
    search: 'flickr-search.search'
  }
});
