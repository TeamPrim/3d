// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

// Cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Controles
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Iluminación
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

// Cargar modelo FBX
const loader = new THREE.FBXLoader();
loader.load('3d.fbx', (fbx) => {
    // Ajustar escala si es necesario
    fbx.scale.set(0.1, 0.1, 0.1); // Ajusta estos valores según tu modelo
    scene.add(fbx);
}, 
(xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% cargado');
},
(error) => {
    console.error('Error al cargar el modelo:', error);
});

// Ajustar al tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animación
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
