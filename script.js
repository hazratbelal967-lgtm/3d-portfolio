/* =====================================================
   MECHFORGE
   3D MECHANICAL ENGINEERING PORTFOLIO
   Built by Hazrat Belal
   ===================================================== */


/* =====================================================
   THREE.JS 3D ENGINE
   ===================================================== */

const container =
    document.getElementById("three-model");


if (
    container &&
    typeof THREE !== "undefined"
) {

    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            45,
            container.clientWidth /
            container.clientHeight,
            0.1,
            1000
        );


    camera.position.set(
        0,
        0,
        7
    );


    const renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });


    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    container.appendChild(
        renderer.domElement
    );


    /* ================= LIGHTS ================= */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            1.4
        );


    scene.add(
        ambientLight
    );


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


    scene.add(
        whiteLight
    );


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


    scene.add(
        redLight
    );


    /* ================= GEAR SHAPE ================= */

    function createGear(
        teeth,
        outerRadius,
        innerRadius,
        holeRadius
    ) {

        const shape =
            new THREE.Shape();


        const step =
            (Math.PI * 2) /
            teeth;


        for (
            let i = 0;
            i < teeth;
            i++
        ) {

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


            points.forEach(
                (point, index) => {

                    const x =
                        Math.cos(point.a) *
                        point.r;


                    const y =
                        Math.sin(point.a) *
                        point.r;


                    if (
                        i === 0 &&
                        index === 0
                    ) {

                        shape.moveTo(
                            x,
                            y
                        );

                    } else {

                        shape.lineTo(
                            x,
                            y
                        );

                    }

                }
            );

        }


        /* CENTER HOLE */

        const hole =
            new THREE.Path();


        for (
            let i = 0;
            i <= 64;
            i++
        ) {

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

                hole.moveTo(
                    x,
                    y
                );

            } else {

                hole.lineTo(
                    x,
                    y
                );

            }

        }


        shape.holes.push(
            hole
        );


        const geometry =
            new THREE.ExtrudeGeometry(
                shape,
                {
                    depth: .55,

                    bevelEnabled: true,

                    bevelSegments: 4,

                    bevelSize: .08,

                    bevelThickness: .08
                }
            );


        geometry.center();


        return geometry;

    }


    /* ================= MAIN GEAR ================= */

    const mainGearGeometry =
        createGear(
            18,
            2.15,
            1.65,
            .72
        );


    const mainGearMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xd9d9d9,

            metalness: .9,

            roughness: .22
        });


    const mainGear =
        new THREE.Mesh(
            mainGearGeometry,
            mainGearMaterial
        );


    mainGear.scale.set(
        1.15,
        1.15,
        1.15
    );


    mainGear.rotation.x =
        .35;


    mainGear.rotation.y =
        .2;


    scene.add(
        mainGear
    );


    /* ================= INNER GEAR ================= */

    const innerGearGeometry =
        createGear(
            12,
            1.0,
            .72,
            .30
        );


    const innerGearMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xff1734,

            metalness: .85,

            roughness: .25
        });


    const innerGear =
        new THREE.Mesh(
            innerGearGeometry,
            innerGearMaterial
        );


    innerGear.scale.set(
        .55,
        .55,
        .55
    );


    innerGear.position.z =
        .38;


    scene.add(
        innerGear
    );


    /* ================= CENTER RING ================= */

    const centerRing =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                .72,
                .055,
                12,
                64
            ),

            new THREE.MeshStandardMaterial({

                color: 0xff1734,

                metalness: .9,

                roughness: .2
            })

        );


    centerRing.position.z =
        .45;


    scene.add(
        centerRing
    );


    /* ================= OUTER RINGS ================= */

    const outerRing =
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


    outerRing.rotation.x =
        Math.PI / 2.4;


    scene.add(
        outerRing
    );


    const redRing =
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


    redRing.rotation.y =
        Math.PI / 3;


    scene.add(
        redRing
    );


    /* ================= PARTICLES ================= */

    const particleCount =
        350;


    const particleGeometry =
        new THREE.BufferGeometry();


    const positions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const radius =
            3.2 +
            Math.random() * 2.5;


        const angle =
            Math.random() *
            Math.PI *
            2;


        const height =
            (Math.random() - .5) *
            5;


        positions[
            i * 3
        ] =
            Math.cos(angle) *
            radius;


        positions[
            i * 3 + 1
        ] =
            height;


        positions[
            i * 3 + 2
        ] =
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


    scene.add(
        particles
    );


    /* ================= MOUSE MOVEMENT ================= */

    let mouseX = 0;
    let mouseY = 0;


    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                (
                    event.clientX /
                    window.innerWidth
                ) * 2 - 1;


            mouseY =
                (
                    event.clientY /
                    window.innerHeight
                ) * 2 - 1;

        }
    );


    /* ================= ANIMATION ================= */

    function animate() {

        requestAnimationFrame(
            animate
        );


        mainGear.rotation.z +=
            .004;


        innerGear.rotation.z -=
            .009;


        centerRing.rotation.z -=
            .015;


        outerRing.rotation.z +=
            .002;


        outerRing.rotation.x +=
            .0005;


        redRing.rotation.z -=
            .003;


        particles.rotation.y +=
            .0005;


        mainGear.rotation.x +=
            (
                mouseY * .25 -
                mainGear.rotation.x
            ) * .015;


        mainGear.rotation.y +=
            (
                mouseX * .25 -
                mainGear.rotation.y
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


            if (
                !width ||
                !height
            ) {
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
   ACTIVE NAVIGATION
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

                link.style.color =
                    "";


                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    "#" + current
                ) {

                    link.style.color =
                        "#ffffff";

                }

            }
        );

    }
);


/* =====================================================
   HERO LOAD
   ===================================================== */

window.addEventListener(
    "load",
    () => {

        document
            .querySelector(
                ".hero-content"
            )
            ?.classList.add(
                "loaded"
            );

    }
);
