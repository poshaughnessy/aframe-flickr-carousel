AFRAME.registerPrimitive('a-flickr-carousel', extend({}, meshMixin, {
  // Preset default components. These components and component properties will be attached to the entity out-of-the-box.
  defaultComponents: {
    container: {}
  },
  // Defined mappings from HTML attributes to component properties (using dots as delimiters). If we set `depth="5"` in
  // HTML, then the primitive will automatically set `geometry="depth: 5"`.
  mappings: {
    type: 'container.layout.type',
    radius: 'container.layout.radius',
    position: 'container.layout.width'
  }
}));

// To generate an API URL, visit: https://www.flickr.com/services/api/explore/flickr.photos.search
var API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e0a100af1e50282bf685a422d5aa22c4&text=llama+farm&safe_search=&per_page=15&format=json&nojsoncallback=1';

var NUM_PHOTOS = 15;
var DEGS_TO_RADIANS = Math.PI / 180;
var CAROUSEL_ROTATE_RADIANS = 360 * DEGS_TO_RADIANS / NUM_PHOTOS;

var scene = document.getElementById('scene');
var assets = document.querySelector('a-assets');
var imageContainer = document.getElementById('imageContainer');

var currentRotationY = 18 * DEGS_TO_RADIANS;
var imageSrcArray = [];

var carouselTween;

//      <a-entity id="imageContainer" layout="type: circle; radius: 3" position="0 0.75 0" rotation="0 18 0"></a-entity>





function animate(time) {
  if (carouselTween) {
    carouselTween.update(time);
  }
  requestAnimationFrame(animate);
}

function setupTween() {

  var targetRotation = currentRotationY + CAROUSEL_ROTATE_RADIANS;

  carouselTween = new AFRAME.TWEEN.Tween(imageContainer.object3D.rotation)
    .to({y: targetRotation}, 500)
    .onComplete(function() {
      currentRotationY = targetRotation;
    });
}

function setupAnimation() {

  scene.addEventListener('click', function () {
    setupTween();
    carouselTween.start();
  });

  requestAnimationFrame(animate);

}


function init() {
  setupAnimation();
  fetchImages();
}

init();
