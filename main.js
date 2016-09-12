// To generate an API URL, visit: https://www.flickr.com/services/api/explore/flickr.photos.search
var API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=caa934e3ee0864ccdd36a5e671ab5563&tags=llama&per_page=10&format=json&nojsoncallback=1&api_sig=05bc4e460ee7a5602d96989cc5d1b898';

var scene = document.getElementById('scene');
var assets = document.getElementById('assets');

var testEntity = document.getElementById('test-entity');

var imageSrcArray = [];

function generateImage(id, src) {

  var imgEl = document.createElement('img');
  imgEl.id = 'img' + id;
  imgEl.setAttribute('src', src);

  assets.appendChild(imgEl);

  var aframeImageEl = document.createElement('a-image');
  aframeImageEl.setAttribute('src', '#img' + id);
  aframeImageEl.setAttribute('height', 1);
  aframeImageEl.setAttribute('width', 1);

  var entityEl = document.createElement('a-entity');
  entityEl.setAttribute('position', {x: id - 5, y: 1, z: -3});

  entityEl.appendChild(aframeImageEl);

  scene.appendChild(entityEl);

}

function processUrls(photos) {

  imageSrcArray = [];

  for (var i=0; i < photos.length; i++) {

    var photo = photos[i];

    // For URL format details, see: https://www.flickr.com/services/api/misc.urls.html
    imageSrcArray.push(`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`);

  }

  console.log('Processed URLs');

}

function generateImages() {

  for (var i=0; i < imageSrcArray.length; i++) {
    generateImage(i, imageSrcArray[i]);
  }

  console.log('Generated images');

}

fetch(API_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log('JSON response', json);
    processUrls(json.photos.photo);
    generateImages();
  })
  .catch(function (err) {
    console.error('Unable to fetch photos', err);
  });


// TODO: Arrange in a sphere - borrowing this from: http://threejs.org/examples/css3d_periodictable.html

/*
var vector = new THREE.Vector3();

for ( var i = 0, l = objects.length; i < l; i ++ ) {

  var phi = Math.acos( -1 + ( 2 * i ) / l );
  var theta = Math.sqrt( l * Math.PI ) * phi;

  var object = new THREE.Object3D();

  object.position.x = 800 * Math.cos( theta ) * Math.sin( phi );
  object.position.y = 800 * Math.sin( theta ) * Math.sin( phi );
  object.position.z = 800 * Math.cos( phi );

  vector.copy( object.position ).multiplyScalar( 2 );

  object.lookAt( vector );

  targets.sphere.push( object );

}
*/
