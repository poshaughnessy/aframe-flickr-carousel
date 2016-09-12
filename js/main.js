// To generate an API URL, visit: https://www.flickr.com/services/api/explore/flickr.photos.search
var API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d02d27104d6cb6d8d9124917feedf869&tags=llama&extras=o_dims&per_page=10&format=json&nojsoncallback=1';

var scene = document.getElementById('scene');
var assets = document.getElementById('assets');
var imageContainer = document.getElementById('imageContainer');

var testEntity = document.getElementById('test-entity');

var imageSrcArray = [];

function generateImage(id, src) {

  var imgEl = document.createElement('img');
  imgEl.id = 'img' + id;
  imgEl.crossOrigin = "anonymous";
  imgEl.setAttribute('src', src);

  assets.appendChild(imgEl);

  var aframeImageEl = document.createElement('a-image');
  aframeImageEl.setAttribute('src', '#img' + id);
  aframeImageEl.setAttribute('width', 1.25);
  aframeImageEl.setAttribute('height', 1);

  var entity = document.createElement('a-entity');
  entity.appendChild(aframeImageEl);
  entity.setAttribute('look-at', '0 0.75 0');

  imageContainer.appendChild(entity);

}

function generateImages() {

  for (var i=0; i < imageSrcArray.length; i++) {
    generateImage(i, imageSrcArray[i]);
  }

  console.log('Generated images');

}

/**
 * The aframe-layout-component positions the images, but does not rotate them for us.
 */
function rotateImages() {

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

function fetchImages() {

  fetch(API_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log('JSON response', json);
      processUrls(json.photos.photo);
      generateImages();
      rotateImages();
    })
    .catch(function (err) {
      console.error('Unable to fetch photos', err);
    });

}

function onAssetsLoaded() {

  console.log('Assets loaded!');

}

function init() {

  assets.addEventListener('loaded', onAssetsLoaded);

  scene.addEventListener('loaded', function() {
    console.log('Scene loaded');
  });

  fetchImages();

}

init();


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
