console.log('Hello World');

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(1200, 500);
renderer.outputEncoding = THREE.sRGBEncoding;

// Canvas Element
const canvas = renderer.domElement;
document.querySelector('#canvas').appendChild(canvas);

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x999999);

// Camera
const camera = new THREE.PerspectiveCamera(40, 1200 / 500);
camera.position.set(1, 2, 2);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Controls
const controls = new THREE.OrbitControls(camera, canvas);

// Lights
const ambientLight = new THREE.AmbientLight(0x888888);
scene.add(ambientLight);

// dat.GUI
const gui = new dat.GUI();
const guiRotation = gui.addFolder('Lowki Rotation');
guiRotation.open()

// Loaders
const loader = new THREE.GLTFLoader();
loader.load(
  'assets/models/lowki.gltf',
  gltf => {
    scene.add(gltf.scene);
    lock = gltf.scene;
  },
  xhr => {
    console.info(`${xhr.loaded/xhr.total*100}% loaded`);
  },
  error => {
    console.error(error);
  }
);


let speed = { increment: .01 };
gui
  .add(speed, 'increment', 0, 1, .01)
  .name('Rotation Speed');

function rotate_lock() {
  if (typeof lock == 'object') {
    speed 
    lock.rotation.y += speed.increment;
    lock.rotation.x += 0.003;
    
  }
}

// Animation Loop
(function animate() {
  requestAnimationFrame(animate);
  // Render
  renderer.render(scene, camera);
  rotate_lock();
})();