/* =====================================================
   HAZRAT BELAL - 3D ENGINEERING PORTFOLIO
   ===================================================== */


/* ================= THREE.JS ================= */

const container = document.getElementById("three-model");

if (container && typeof THREE !== "undefined") {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    camera.position.set(0, 0, 7);


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


    /* ================= LIGHTS ================= */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            1.4
        );

    scene.add(ambientLight);


    const whiteLight =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );

    whiteLight.position.set(
        5,
        5,
        8
    );

    scene.add(whiteLight);


    const redLight =
        new THREE.PointLight(
            0xff1734,
            7,
            15
        );

    redLight.position.set(
        -4,
        2,
        4
    );

    scene.add(redLight);


    /* ================= GEAR ================= */

    const gearShape =
        new THREE.Shape();

    const teeth = 18;

    const outerRadius = 2.15;
    const innerRadius = 1.65;

    const step =
        (Math.PI * 2) / teeth;


    for (let i = 0; i < teeth; i++) {

        const base =
            i * step;

        const points = [

            {
                r: innerRadius,
                a: base
            },

            {
                r: outerRadius,
                a: base + step * .18
            },

            {
                r: outerRadius,
                a: base + step * .42
            },

            {
                r: innerRadius,
                a: base + step * .58
            }

        ];


        points.forEach((point, index) => {

            const x =
                Math.cos(point.a) *
                point.r;

            const y =
                Math.sin(point.a) *
                point.r;


            if (i === 0 && index === 0) {

                gearShape.moveTo(x, y);

            } else {

                gearShape.lineTo(x, y);

            }

        });

    }


    /* ================= CENTER HOLE ================= */

    const hole =
        new THREE.Path();

    const holeRadius = .72;


    for (let i = 0; i <= 64; i++) {

        const angle =
            (i / 64) *
            Math.PI *
            2;

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


    /* ================= GEAR GEOMETRY ================= */

    const gearGeometry =
        new THREE.ExtrudeGeometry(
            gearShape,
            {
                depth: .55,

                bevelEnabled: true,

                bevelSegments: 4,

                bevelSize: .08,

                bevelThickness: .08
            }
        );


    gearGeometry.center();


    const gearMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xd9d9d9,

            metalness: .9,

            roughness: .22
        });


    const gear =
        new THREE.Mesh(
            gearGeometry,
            gearMaterial
        );


    gear.scale.set(
        1.15,
        1.15,
        1.15
    );


    gear.rotation.x = .35;

    gear.rotation.y = .2;


    scene.add(gear);


    /* ================= INNER GEAR ================= */

    const innerGear =
        gear.clone();

    innerGear.scale.set(
        .48,
        .48,
        .48
    );

    innerGear.material =
        new THREE.MeshStandardMaterial({

            color: 0xff1734,

            metalness: .85,

            roughness: .25
        });


    innerGear.position.z =
        .35;


    scene.add(innerGear);


    /* ================= CENTER RING ================= */

    const ringGeometry =
        new THREE.TorusGeometry(
            .73,
            .055,
            12,
            64
        );


    const ringMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xff1734,

            metalness: .9,

            roughness: .2
        });


    const centerRing =
        new THREE.Mesh(
            ringGeometry,
            ringMaterial
        );


    centerRing.position.z =
        .42;


    scene.add(centerRing);


    /* ================= FLOATING RINGS ================= */

    const ring1 =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                2.8,
                .015,
                8,
                100
            ),

            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: .25
            })

        );


    ring1.rotation.x =
        Math.PI / 2.4;

    scene.add(ring1);


    const ring2 =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                3.2,
                .012,
                8,
                100
            ),

            new THREE.MeshBasicMaterial({
                color: 0xff1734,
                transparent: true,
                opacity: .35
            })

        );


    ring2.rotation.y =
        Math.PI / 3;

    scene.add(ring2);


    /* ================= PARTICLES ================= */

    const particleCount = 350;

    const particleGeometry =
        new THREE.BufferGeometry();

    const positions =
        new Float32Array(
            particleCount * 3
        );


    for (let i = 0; i < particleCount; i++) {

        const radius =
            3.2 + Math.random() * 2.5;

        const angle =
            Math.random() *
            Math.PI *
            2;

        const height =
            (Math.random() - .5) *
            5;


        positions[i * 3] =
            Math.cos(angle) *
            radius;

        positions[i * 3 + 1] =
            height;

        positions[i * 3 + 2] =
            Math.sin(angle) *
            radius;

    }


    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0xff1734,

            size: .025,

            transparent: true,

            opacity: .7
        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    scene.add(particles);


    /* ================= MOUSE MOVEMENT ================= */

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                (event.clientX /
                    window.innerWidth) *
                2 - 1;

            mouseY =
                (event.clientY /
                    window.innerHeight) *
                2 - 1;

        }
    );


    /* ================= ANIMATION ================= */

    function animate() {

        requestAnimationFrame(
            animate
        );


        gear.rotation.z += .004;

        innerGear.rotation.z -= .009;

        centerRing.rotation.z -= .015;

        ring1.rotation.z += .002;

        ring1.rotation.x += .0005;

        ring2.rotation.z -= .003;

        particles.rotation.y += .0005;


        gear.rotation.x +=
            (
                mouseY * .25 -
                gear.rotation.x
            ) * .015;


        gear.rotation.y +=
            (
                mouseX * .25 -
                gear.rotation.y
            ) * .015;


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* ================= RESIZE ================= */

    window.addEventListener(
        "resize",
        () => {

            const width =
                container.clientWidth;

            const height =
                container.clientHeight;


            if (!width || !height) {
                return;
            }


            camera.aspect =
                width / height;

            camera.updateProjectionMatrix();


            renderer.setSize(
                width,
                height
            );


            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    2
                )
            );

        }
    );

}


/* =====================================================
   CLICK BLINK EFFECT
   ===================================================== */

const clickableElements =
    document.querySelectorAll(
        ".clickable"
    );


clickableElements.forEach(
    (element) => {

        element.addEventListener(
            "click",
            () => {

                element.classList.remove(
                    "clicked"
                );


                void element.offsetWidth;


                element.classList.add(
                    "clicked"
                );


                setTimeout(
                    () => {

                        element.classList.remove(
                            "clicked"
                        );

                    },
                    450
                );

            }
        );

    }
);


/* =====================================================
   NAVBAR ACTIVE EFFECT
   ===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        "nav a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(
            (section) => {

                const sectionTop =
                    section.offsetTop - 180;

                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navLinks.forEach(
            (link) => {

                link.style.color = "";

                if (
                    link.getAttribute(
                        "href"
                    ) === "#" + current
                ) {

                    link.style.color =
                        "#ffffff";

                }

            }
        );

    }
);


/* =====================================================
   HERO TEXT ENTRY ANIMATION
   ===================================================== */

window.addEventListener(
    "load",
    () => {

        document
            .querySelector(".hero-content")
            ?.classList.add(
                "loaded"
            );

    }
);
