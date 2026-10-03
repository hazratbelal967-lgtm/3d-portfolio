/* =========================================================
   HAZRAT BELAL — INTERACTIVE 3D PORTFOLIO
   ========================================================= */


/* =========================================================
   CUSTOM CURSOR
   ========================================================= */

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    cursorRing.style.left = e.clientX + "px";
    cursorRing.style.top = e.clientY + "px";

});


const interactiveElements =
    document.querySelectorAll(
        "a, button, .skill-card, .project-card, .info-card"
    );


interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        cursorRing.classList.add("active");

    });

    element.addEventListener("mouseleave", () => {

        cursorRing.classList.remove("active");

    });

});


/* =========================================================
   CLICK FLASH EFFECT
   ========================================================= */

const clickFlash =
    document.querySelector(".click-flash");


document.addEventListener("click", (e) => {

    clickFlash.style.left =
        e.clientX + "px";

    clickFlash.style.top =
        e.clientY + "px";

    clickFlash.classList.remove("active");

    void clickFlash.offsetWidth;

    clickFlash.classList.add("active");

});


/* =========================================================
   THREE.JS BACKGROUND
   ========================================================= */

const container =
    document.getElementById("three-background");


if (container && typeof THREE !== "undefined") {


    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            50,
            window.innerWidth /
            window.innerHeight,
            0.1,
            1000
        );


    camera.position.z = 8;


    const renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    container.appendChild(
        renderer.domElement
    );


    /* =====================================================
       LIGHTS
       ===================================================== */

    const ambient =
        new THREE.AmbientLight(
            0xffffff,
            0.7
        );

    scene.add(ambient);


    const redLight =
        new THREE.PointLight(
            0xff1738,
            5,
            20
        );

    redLight.position.set(
        4,
        2,
        5
    );

    scene.add(redLight);


    const purpleLight =
        new THREE.PointLight(
            0x8b36ff,
            4,
            20
        );

    purpleLight.position.set(
        -5,
        -2,
        4
    );

    scene.add(purpleLight);


    /* =====================================================
       GEAR
       ===================================================== */

    const gearShape =
        new THREE.Shape();


    const teeth = 18;

    const outerRadius = 2.15;

    const innerRadius = 1.65;

    const step =
        Math.PI * 2 / teeth;


    for (
        let i = 0;
        i < teeth;
        i++
    ) {

        const angle =
            i * step;


        const points = [

            {
                r: innerRadius,
                a: angle
            },

            {
                r: outerRadius,
                a: angle + step * 0.20
            },

            {
                r: outerRadius,
                a: angle + step * 0.42
            },

            {
                r: innerRadius,
                a: angle + step * 0.58
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

                    gearShape.moveTo(
                        x,
                        y
                    );

                } else {

                    gearShape.lineTo(
                        x,
                        y
                    );

                }

            }
        );

    }


    gearShape.closePath();


    /* center hole */

    const hole =
        new THREE.Path();


    const holeRadius = 0.65;


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


    gearShape.holes.push(hole);


    const gearGeometry =
        new THREE.ExtrudeGeometry(
            gearShape,
            {
                depth: 0.55,

                bevelEnabled: true,

                bevelSegments: 3,

                bevelSize: 0.07,

                bevelThickness: 0.06
            }
        );


    gearGeometry.center();


    const gearMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xffffff,

            metalness: 0.9,

            roughness: 0.22

        });


    const gear =
        new THREE.Mesh(
            gearGeometry,
            gearMaterial
        );


    gear.scale.set(
        1.35,
        1.35,
        1.35
    );


    gear.position.set(
        2.7,
        0.2,
        -1
    );


    gear.rotation.x =
        0.55;

    gear.rotation.y =
        0.35;


    scene.add(gear);


    /* =====================================================
       SECOND GEAR
       ===================================================== */

    const gear2 =
        new THREE.Mesh(
            gearGeometry,
            gearMaterial
        );


    gear2.scale.set(
        0.55,
        0.55,
        0.55
    );


    gear2.position.set(
        4.1,
        -1.3,
        -1.5
    );


    gear2.rotation.x =
        -0.4;


    scene.add(gear2);


    /* =====================================================
       PARTICLES
       ===================================================== */

    const particleCount = 900;


    const positions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        positions[i * 3] =
            (Math.random() - 0.5) *
            16;

        positions[i * 3 + 1] =
            (Math.random() - 0.5) *
            10;

        positions[i * 3 + 2] =
            (Math.random() - 0.5) *
            8;

    }


    const particleGeometry =
        new THREE.BufferGeometry();


    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0xffffff,

            size: 0.018,

            transparent: true,

            opacity: 0.55

        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    scene.add(particles);


    /* =====================================================
       WIREFRAME SPHERE
       ===================================================== */

    const sphereGeometry =
        new THREE.IcosahedronGeometry(
            2.8,
            2
        );


    const sphereMaterial =
        new THREE.MeshBasicMaterial({

            color: 0xff1738,

            wireframe: true,

            transparent: true,

            opacity: 0.055

        });


    const sphere =
        new THREE.Mesh(
            sphereGeometry,
            sphereMaterial
        );


    sphere.position.set(
        -3.5,
        1.5,
        -2
    );


    scene.add(sphere);


    /* =====================================================
       MOUSE MOVEMENT
       ===================================================== */

    let mouseX = 0;
    let mouseY = 0;

    let targetX = 0;
    let targetY = 0;


    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                (event.clientX /
                    window.innerWidth -
                    0.5) *
                2;

            mouseY =
                (event.clientY /
                    window.innerHeight -
                    0.5) *
                2;

        }
    );


    /* =====================================================
       ANIMATION
       ===================================================== */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const time =
            clock.getElapsedTime();


        targetX +=
            (mouseX - targetX) *
            0.025;

        targetY +=
            (mouseY - targetY) *
            0.025;


        /* main gear */

        gear.rotation.z +=
            0.003;


        gear.rotation.y +=
            0.001;


        gear.position.y =
            0.2 +
            Math.sin(time * 0.7) *
            0.08;


        /* second gear */

        gear2.rotation.z -=
            0.006;


        /* particles */

        particles.rotation.y =
            time * 0.008;


        particles.rotation.x =
            targetY * 0.04;


        /* sphere */

        sphere.rotation.x +=
            0.0008;

        sphere.rotation.y +=
            0.001;


        /* camera movement */

        camera.position.x +=
            (
                targetX * 0.25 -
                camera.position.x
            ) * 0.02;


        camera.position.y +=
            (
                -targetY * 0.18 -
                camera.position.y
            ) * 0.02;


        camera.lookAt(
            0,
            0,
            0
        );


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* =====================================================
       RESIZE
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;


            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
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


/* =========================================================
   PROJECT / CARD CLICK BLINK
   ========================================================= */

const cards =
    document.querySelectorAll(
        ".project-card, .skill-card, .info-card"
    );


cards.forEach((card) => {

    card.addEventListener(
        "click",
        () => {

            card.classList.remove(
                "card-click"
            );

            void card.offsetWidth;

            card.classList.add(
                "card-click"
            );

        }
    );

});


/* =========================================================
   ACTIVE NAV ON SCROLL
   ========================================================= */

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
                    section.offsetTop - 250;

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
                    "rgba(255,255,255,0.65)";


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


/* =========================================================
   IMAGE LOAD EFFECT
   ========================================================= */

const profileImage =
    document.querySelector(
        ".profile-card img"
    );


if (profileImage) {

    profileImage.addEventListener(
        "load",
        () => {

            profileImage.style.opacity =
                "1";

        }
    );

}
