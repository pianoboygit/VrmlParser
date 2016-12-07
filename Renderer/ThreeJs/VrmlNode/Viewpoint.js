/**
 * @author Bart McLeod, mcleod@spaceweb.nl
 * @since September 1, 2016
 *
 * Conversion of a VRML 97 Viewpoint node to a ThreeJs camera
 */

VrmlParser.Renderer.ThreeJs.VrmlNode[ 'Viewpoint' ] = function (originalNode, debug) {
	// inherit from VrmlNode
	VrmlParser.Renderer.ThreeJs.VrmlNode.apply(this, arguments);
}

VrmlParser.Renderer.ThreeJs.VrmlNode.Viewpoint.prototype.parse = function (scene) {
	var fov, aspect, near, far;
	fov    = Math.round(180 / Math.PI * this.node.fieldOfView);
	aspect = window.innerWidth / window.innerHeight;
	near   = 0.01;
	far    = 1e5;

	// @todo: support for jump (bool)

	var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

	var surroundingGroup = new THREE.Group();
	surroundingGroup.add(camera);

	if ( this.node.has('name') ) {
		camera.name = this.node.name;
	} else {
		camera.name = this.node.description;
	}

	surroundingGroup.getCamera = function () {
		return this.children[ 0 ];
	}

	var p = this.node.position;
	surroundingGroup.position.set(p.x, p.y, p.z);

	var o       = this.node.orientation;
	var vector3 = new THREE.Vector3(o.x, o.y, o.z);
	surroundingGroup.quaternion.setFromAxisAngle(vector3, o.radians);

	return surroundingGroup;
};
