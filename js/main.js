// To generate an API URL, visit: https://www.flickr.com/services/api/explore/flickr.photos.search
var API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d02d27104d6cb6d8d9124917feedf869&tags=llama&per_page=9&format=json&nojsoncallback=1';

var CAROUSEL_ROTATE_Y_CHANGE = 360 / 9;

var scene = document.getElementById('scene');
var assets = document.getElementById('assets');
var imageContainer = document.getElementById('imageContainer');
var carouselAnimation = document.getElementById('carouselAnimation');

var currentRotationY = 10;
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

  // Rotate the images to face the user in the centre
  entity.setAttribute('look-at', '0 0.75 0');

  imageContainer.appendChild(entity);

}

function generateImages() {

  for (var i=0; i < imageSrcArray.length; i++) {
    generateImage(i, imageSrcArray[i]);
  }

  console.log('Generated images');

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

function updateAnimation() {

  currentRotationY += CAROUSEL_ROTATE_Y_CHANGE;

  carouselAnimation.setAttribute('from', '0 ' + currentRotationY + ' 0');
  carouselAnimation.setAttribute('to', '0 ' + (currentRotationY + CAROUSEL_ROTATE_Y_CHANGE) + ' 0');

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
    })
    .catch(function (err) {
      console.error('Unable to fetch photos', err);
    });

}

function init() {
  carouselAnimation.addEventListener('animationend', updateAnimation);
  fetchImages();
}

init();
