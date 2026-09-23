const container = document.getElementById("three-container");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

camera.position.z = 7;


const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);


// LIGHTS

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.5
);

scene.add(ambientLight);


const light = new THREE.DirectionalLight(
    0xffffff,
    3
);

light.position.set(5, 5, 5);

scene.add(light);


// CREATE GEAR

const gearShape = new THREE.Shape();

const teeth = 16;

const outerRadius = 2;
const innerRadius = 1.55;

for (let i = 0; i < teeth; i++) {

    const angle = (i / teeth) * Math.PI * 2;

    const nextAngle = ((i + 1) / teeth) * Math.PI * 2;

    const points = [
        [outerRadius, angle],
        [outerRadius, angle + 0.08],
        [innerRadius, angle + 0.13],
        [innerRadius, nextAngle - 0.13],
        [outerRadius, nextAngle - 0.08],
        [outerRadius, nextAngle]
    ];

    for (const point of points) {

        const radius = point[0];
        const a = point[1];

        const x = Math.cos(a) * radius;
        const y = Math.sin(a) * radius;

        if (i === 0 && point === points[0]) {
            gearShape.moveTo(x, y);
        } else {
            gearShape.lineTo(x, y);
        }
    }
}


// CENTER HOLE

const hole = new THREE.Path();

const holeRadius = 0.7;

for (let i = 0; i <= 64; i++) {

    const angle = (i / 64) * Math.PI * 2;

    const x = Math.cos(angle) * holeRadius;
    const y = Math.sin(angle) * holeRadius;

    if (i === 0) {
        hole.moveTo(x, y);
    } else {
        hole.lineTo(x, y);
    }
}

gearShape.holes.push(hole);


// EXTRUDE 3D SHAPE

const geometry = new THREE.ExtrudeGeometry(
    gearShape,
    {
        depth: 0.7,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 0.08,
        bevelThickness: 0.08
    }
);


const material = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    metalness: 0.8,
    roughness: 0.25
});


const gear = new THREE.Mesh(
    geometry,
    material
);

gear.rotation.x = Math.PI / 2;

scene.add(gear);


// ANIMATION

function animate() {

    requestAnimationFrame(animate);

    gear.rotation.z += 0.008;

    renderer.render(
        scene,
        camera
    );
}

animate();


// RESPONSIVE

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            container.clientWidth /
            container.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );

    }
);
