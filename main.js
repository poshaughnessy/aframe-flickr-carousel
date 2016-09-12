// To generate an API URL, visit: https://www.flickr.com/services/api/explore/flickr.photos.search
var API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=89a4669c0553d3d254b50803bff8f692&tags=llama&per_page=20&format=json&nojsoncallback=1&api_sig=77f7464dbc94fddf7655511f30f34496';

var scene = document.getElementById('scene');
var assets = document.getElementById('assets');

var testEntity = document.getElementById('test-entity');

var imageSrcArray = [
  'images/barnyz_11129952164_e10c4ec600_k.jpg'
  //'images/ifenyu_9265105553_cc2286fdce_o.jpg',
  //'images/oneras_5142031622_7676650034_o.jpg'
];

function prepareImage(id, src) {

  var imgEl = document.createElement('img');
  imgEl.id = 'img' + id;
  imgEl.setAttribute('src', src);
  imgEl.setAttribute('crossorigin', 'crossorigin');

  assets.appendChild(imgEl);

  var aframeImageEl = document.createElement('a-image');
  aframeImageEl.setAttribute('src', '#img' + id);
  aframeImageEl.setAttribute('height', 1);
  aframeImageEl.setAttribute('width', 1);

  var entityEl = document.createElement('a-entity');
  entityEl.setAttribute('position', {x: 1, y: 1, z: -3});

  entityEl.appendChild(aframeImageEl);

  scene.appendChild(entityEl);

}

function processUrls(photos) {

  imageSrcArray = [];

  for (var i=0; i < photos.length; i++) {

    var photo = photos[i];

    // For URL format details, see: https://www.flickr.com/services/api/misc.urls.html
    var photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`;

    imageSrcArray.append(photoUrl);

  }

  console.log('Processed URLs');

}

function generateImages() {

  for (var i=0; i < imageSrcArray.length; i++) {
    prepareImage(i, imageSrcArray[i]);
  }

  console.log('Generated images');

}

fetch(API_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log('JSON response', json);
    //processUrls(json.photos.photo);
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
