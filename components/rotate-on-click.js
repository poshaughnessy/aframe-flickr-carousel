var DEGS_TO_RADIANS = Math.PI / 180;

AFRAME.registerComponent('rotate-on-click', {
  schema: {
    degrees: {default: 90},
    duration: {default: 500}
  },
  init: function() {

    var self = this;

    this.el.addEventListener('click', this.onClick.bind(this));

  },
  onClick: function() {

    var targetRotation = this.el.object3D.rotation.y + this.data.degrees * DEGS_TO_RADIANS;

    new AFRAME.TWEEN.Tween(this.el.object3D.rotation)
      .to({y: targetRotation}, this.data.duration)
      .start();

  }
});
