alert("NEW SCRIPT IS RUNNING");
const container = document.getElementById("three-container");


// ===============================
// SCENE
// ===============================

const scene = new THREE.Scene();


// ===============================
// CAMERA
// ===============================

const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 7);


// ===============================
// RENDERER
// ===============================

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

container.appendChild(renderer.domElement);


// ===============================
// LIGHTING
// ===============================

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.8
);

scene.add(ambientLight);


const mainLight = new THREE.DirectionalLight(
    0xffffff,
    3
);

mainLight.position.set(
    5,
    5,
    8
);

scene.add(mainLight);


const sideLight = new THREE.DirectionalLight(
    0x00ffff,
    2
);

sideLight.position.set(
    -5,
    2,
    5
);

scene.add(sideLight);


// ===============================
// CREATE MECHANICAL GEAR
// ===============================

const gearShape = new THREE.Shape();

const teeth = 16;

const outerRadius = 2.0;
const innerRadius = 1.55;

const toothWidth = 0.055;

for (let i = 0; i < teeth; i++) {

    const baseAngle =
        (i / teeth) * Math.PI * 2;

    const step =
        (Math.PI * 2) / teeth;


    // Four main points for each tooth

    const points = [

        {
            radius: innerRadius,
            angle: baseAngle
        },

        {
            radius: outerRadius,
            angle: baseAngle + step * 0.18
        },

        {
            radius: outerRadius,
            angle: baseAngle + step * 0.42
        },

        {
            radius: innerRadius,
            angle: baseAngle + step * 0.58
        }

    ];


    points.forEach((point, index) => {

        const x =
            Math.cos(point.angle) *
            point.radius;

        const y =
            Math.sin(point.angle) *
            point.radius;


        if (i === 0 && index === 0) {

            gearShape.moveTo(x, y);

        } else {

            gearShape.lineTo(x, y);

        }

    });


    // Small gap before next tooth

    const gapAngle =
        baseAngle + step * 0.95;

    const gapX =
        Math.cos(gapAngle) *
        innerRadius;

    const gapY =
        Math.sin(gapAngle) *
        innerRadius;

    gearShape.lineTo(
        gapX,
        gapY
    );
}


// ===============================
// CENTER HOLE
// ===============================

const hole = new THREE.Path();

const holeRadius = 0.65;

for (let i = 0; i <= 64; i++) {

    const angle =
        (i / 64) * Math.PI * 2;

    const x =
        Math.cos(angle) *
        holeRadius;

    const y =
        Math.sin(angle) *
        holeRadius;


    if (i === 0) {

        hole.moveTo(x, y);

    } else {

        hole.lineTo(x, y);

    }

}

gearShape.holes.push(hole);


// ===============================
// 3D EXTRUSION
// ===============================

const geometry =
    new THREE.ExtrudeGeometry(
        gearShape,
        {
            depth: 0.75,

            bevelEnabled: true,

            bevelSegments: 4,

            bevelSize: 0.09,

            bevelThickness: 0.09
        }
    );


// Center the geometry

geometry.center();


// ===============================
// MATERIAL
// ===============================

const material =
    new THREE.MeshStandardMaterial({

        color: 0x00dfe6,

        metalness: 0.85,

        roughness: 0.22
    });


// ===============================
// CREATE GEAR MESH
// ===============================

const gear =
    new THREE.Mesh(
        geometry,
        material
    );


// Front-facing position

gear.rotation.x = 0;

gear.rotation.y = 0.25;

gear.rotation.z = 0;


// Slight size adjustment

gear.scale.set(
    1.05,
    1.05,
    1.05
);


scene.add(gear);


// ===============================
// INNER HUB RING
// ===============================

const ringGeometry =
    new THREE.RingGeometry(
        0.66,
        0.82,
        64
    );

const ringMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x00ffff,

        metalness: 0.9,

        roughness: 0.2,

        side: THREE.DoubleSide
    });

const ring =
    new THREE.Mesh(
        ringGeometry,
        ringMaterial
    );

ring.position.z = 0.4;

scene.add(ring);


// ===============================
// ANIMATION
// ===============================

function animate() {

    requestAnimationFrame(animate);


    // Main gear rotation

    gear.rotation.z += 0.006;


    // Inner ring rotates slightly

    ring.rotation.z -= 0.008;


    renderer.render(
        scene,
        camera
    );
}


animate();


// ===============================
// RESPONSIVE
// ===============================

window.addEventListener(
    "resize",
    () => {

        const width =
            container.clientWidth;

        const height =
            container.clientHeight;


        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();


        renderer.setSize(
            width,
            height
        );

    }
);
