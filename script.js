/* =====================================================
   LOADER
===================================================== */

let loaderPercent = 0;

const loader =
    document.getElementById("loader");

const loaderNumber =
    document.getElementById("loaderPercent");

const loaderBar =
    document.querySelector(".loader-line span");


const loaderInterval =
    setInterval(() => {

        loaderPercent += Math.floor(
            Math.random() * 8
        ) + 2;

        if (loaderPercent >= 100) {

            loaderPercent = 100;

            clearInterval(loaderInterval);

            setTimeout(() => {

                loader.style.opacity = "0";
                loader.style.pointerEvents = "none";

                setTimeout(() => {

                    loader.remove();

                }, 500);

            }, 400);

        }

        loaderNumber.textContent =
            loaderPercent;

        loaderBar.style.width =
            loaderPercent + "%";

    }, 70);


/* =====================================================
   CURSOR
===================================================== */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorRing =
    document.querySelector(".cursor-ring");


document.addEventListener(
    "mousemove",
    (event) => {

        cursorDot.style.left =
            event.clientX + "px";

        cursorDot.style.top =
            event.clientY + "px";

        cursorRing.animate(
            {
                left: event.clientX - 14 + "px",
                top: event.clientY - 14 + "px"
            },
            {
                duration: 180,
                fill: "forwards"
            }
        );

    }
);


/* =====================================================
   CLICK FLASH
===================================================== */

const clickFlash =
    document.getElementById("clickFlash");


document.addEventListener(
    "click",
    () => {

        clickFlash.classList.remove(
            "active"
        );

        void clickFlash.offsetWidth;

        clickFlash.classList.add(
            "active"
        );

    }
);


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


menuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "active"
        );

    }
);


document.querySelectorAll(
    ".mobile-menu a"
).forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "active"
                );

            }
        );

    }
);


/* =====================================================
   TYPING EFFECT
===================================================== */

const typingElement =
    document.getElementById("typingText");


const typingWords = [

    "MECHANICAL ENGINEERING STUDENT",
    "CAD & 3D DESIGN LEARNER",
    "ARDUINO ENGINEERING ENTHUSIAST",
    "FUTURE OIL & GAS ENGINEER"

];


let wordIndex = 0;
let characterIndex = 0;
let deleting = false;


function typingEffect() {

    const currentWord =
        typingWords[wordIndex];

    if (!deleting) {

        characterIndex++;

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex
            );

        if (
            characterIndex ===
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typingEffect,
                1500
            );

            return;

        }

    } else {

        characterIndex--;

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex
            );

        if (characterIndex === 0) {

            deleting = false;

            wordIndex++;

            if (
                wordIndex >=
                typingWords.length
            ) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(
        typingEffect,
        deleting ? 35 : 65
    );

}

typingEffect();


/* =====================================================
   TERMINAL TEXT
===================================================== */

const terminalText =
    document.getElementById("terminalText");


const terminalMessages = [

    "ENGINEERING SYSTEM READY...",
    "MECHANICAL CORE INITIALIZED...",
    "CAD MODULE STANDBY...",
    "ARDUINO MODULE ONLINE...",
    "PROJECT DATABASE LOADED...",
    "CAREER PATH: OIL & GAS...",
    "SYSTEM STATUS: OPERATIONAL..."

];


let terminalIndex = 0;


setInterval(() => {

    terminalText.style.opacity = "0";

    setTimeout(() => {

        terminalIndex++;

        if (
            terminalIndex >=
            terminalMessages.length
        ) {

            terminalIndex = 0;

        }

        terminalText.textContent =
            terminalMessages[
                terminalIndex
            ];

        terminalText.style.opacity = "1";

    }, 250);

}, 2600);


/* =====================================================
   3D CARD TILT
===================================================== */

const tiltCards =
    document.querySelectorAll(
        ".tilt-card"
    );


tiltCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -4;

                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    4;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =====================================================
   THREE.JS
===================================================== */

const container =
    document.getElementById(
        "three-container"
    );


if (container && typeof THREE !== "undefined") {


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


    camera.position.z = 7;


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


    /* =================================================
       LIGHTS
    ================================================= */

    const ambient =
        new THREE.AmbientLight(
            0xffffff,
            1.8
        );

    scene.add(ambient);


    const greenLight =
        new THREE.PointLight(
            0x00ff9c,
            5,
            20
        );

    greenLight.position.set(
        4,
        3,
        5
    );

    scene.add(greenLight);


    const cyanLight =
        new THREE.PointLight(
            0x00eaff,
            3,
            20
        );

    cyanLight.position.set(
        -4,
        -2,
        4
    );

    scene.add(cyanLight);


    /* =================================================
       GEAR
    ================================================= */

    const gearShape =
        new THREE.Shape();


    const teeth = 18;

    const outerRadius = 2.15;

    const innerRadius = 1.62;

    const step =
        (Math.PI * 2) /
        teeth;


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
                a: angle + step * 0.43
            },

            {
                r: innerRadius,
                a: angle + step * 0.60
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


    /* =================================================
       GEAR HOLE
    ================================================= */

    const hole =
        new THREE.Path();


    const holeRadius =
        0.65;


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


    gearShape.holes.push(
        hole
    );


    /* =================================================
       GEAR GEOMETRY
    ================================================= */

    const gearGeometry =
        new THREE.ExtrudeGeometry(
            gearShape,
            {

                depth: 0.55,

                bevelEnabled: true,

                bevelSegments: 3,

                bevelSize: 0.07,

                bevelThickness: 0.07

            }
        );


    gearGeometry.center();


    const gearMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x00ff9c,

            metalness: 0.85,

            roughness: 0.25

        });


    const gear =
        new THREE.Mesh(
            gearGeometry,
            gearMaterial
        );


    gear.scale.set(
        0.95,
        0.95,
        0.95
    );


    gear.rotation.x =
        Math.PI * 0.22;


    gear.rotation.y =
        Math.PI * 0.15;


    scene.add(gear);


    /* =================================================
       INNER RING
    ================================================= */

    const ringGeometry =
        new THREE.TorusGeometry(
            0.75,
            0.035,
            12,
            64
        );


    const ringMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x00eaff,

            metalness: 0.8,

            roughness: 0.2

        });


    const ring =
        new THREE.Mesh(
            ringGeometry,
            ringMaterial
        );


    ring.position.z =
        0.5;


    scene.add(ring);


    /* =================================================
       ORBIT RING
    ================================================= */

    const orbitGeometry =
        new THREE.TorusGeometry(
            2.65,
            0.012,
            8,
            100
        );


    const orbitMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x00ff9c,

            transparent: true,

            opacity: 0.55

        });


    const orbit =
        new THREE.Mesh(
            orbitGeometry,
            orbitMaterial
        );


    orbit.rotation.x =
        Math.PI / 2.7;


    scene.add(orbit);


    /* =================================================
       PARTICLES
    ================================================= */

    const particleCount =
        300;


    const particleGeometry =
        new THREE.BufferGeometry();


    const particlePositions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particlePositions[
            i * 3
        ] =
            (Math.random() - 0.5) * 8;

        particlePositions[
            i * 3 + 1
        ] =
            (Math.random() - 0.5) * 8;

        particlePositions[
            i * 3 + 2
        ] =
            (Math.random() - 0.5) * 6;

    }


    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            particlePositions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0x00ff9c,

            size: 0.025,

            transparent: true,

            opacity: 0.65

        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    scene.add(particles);


    /* =================================================
       MOUSE MOVEMENT
    ================================================= */

    let mouseX = 0;

    let mouseY = 0;


    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                (event.clientX /
                    window.innerWidth -
                    0.5);

            mouseY =
                (event.clientY /
                    window.innerHeight -
                    0.5);

        }
    );


    /* =================================================
       ANIMATION
    ================================================= */

    function animate() {

        requestAnimationFrame(
            animate
        );


        gear.rotation.z +=
            0.004;


        ring.rotation.z -=
            0.008;


        orbit.rotation.z +=
            0.002;


        particles.rotation.y +=
            0.0004;


        gear.rotation.x +=
            (mouseY * 0.25 -
                gear.rotation.x +
                Math.PI * 0.22) *
            0.025;


        gear.rotation.y +=
            (mouseX * 0.25 -
                gear.rotation.y +
                Math.PI * 0.15) *
            0.025;


        const time =
            Date.now() * 0.001;


        greenLight.position.x =
            Math.sin(time) * 4;

        greenLight.position.y =
            Math.cos(time) * 3;


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* =================================================
       RESIZE
    ================================================= */

    window.addEventListener(
        "resize",
        () => {

            const width =
                container.clientWidth;

            const height =
                container.clientHeight;


            if (
                width === 0 ||
                height === 0
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


    /* =================================================
       CORE DATA
    ================================================= */

    const xValue =
        document.getElementById(
            "xValue"
        );

    const yValue =
        document.getElementById(
            "yValue"
        );

    const zValue =
        document.getElementById(
            "zValue"
        );


    setInterval(
        () => {

            xValue.textContent =
                String(
                    Math.floor(
                        (gear.rotation.x * 100)
                    )
                ).padStart(
                    3,
                    "0"
                );


            yValue.textContent =
                String(
                    Math.floor(
                        (gear.rotation.y * 100)
                    )
                ).padStart(
                    3,
                    "0"
                );


            zValue.textContent =
                String(
                    Math.floor(
                        (gear.rotation.z * 100)
                    )
                ).padStart(
                    3,
                    "0"
                );

        },
        100
    );

}


/* =====================================================
   INTERSECTION OBSERVER
===================================================== */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


document.querySelectorAll(
    ".skill-card, .project-card, .contact-card, .education-card"
).forEach(
    (element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(
            element
        );

    }
);
