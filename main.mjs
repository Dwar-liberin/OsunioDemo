import { MindARThree } from "mindar-image-three";
import * as THREE from "three";
import { videoLoader } from "./libs/videoLoader/videoLoader.js";
import { loadTexture } from "./libs/loader.js";
// import { imageLoader } from "./libs/imageLoader/imageLoader.js";

document.addEventListener("DOMContentLoaded", () => {
  const start = async () => {
    const mindarThree = new MindARThree({
      container: document.body,
      imageTargetSrc: "./assets/targets/osunioDemo.mind",
    });
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);

    const { videoPlane, video } = await videoLoader({
      path: "./assets/videos/iplreal.mp4",
    });
    const isIOS = navigator.appVersion.indexOf("Mac") != -1 ? true : false;
    video.muted = isIOS;

    // const { planeMesh } = await imageLoader({
    //   src: "./assets/logo/Button.png",
    // });

    const iconGeometry = new THREE.PlaneGeometry(1.3, 0.4);

    const textureLoader = new THREE.TextureLoader();

    const iconTexture = textureLoader.load("./assets/logo/iconCal3.png");

    const imageMesh = new THREE.MeshBasicMaterial({
      map: iconTexture,
    });

    const planeMesh = new THREE.Mesh(iconGeometry, imageMesh);

    planeMesh.scale.set(0.5, 0.5, 0.5);

    // videoPlane.position.set(0, 0, 0);

    videoPlane.userData.clickable = true; // set the user Data to clickable.
    // videoPlane.scale.set(2, 2, 2);

    planeMesh.position.set(0, -1, 0);
    planeMesh.userData.clickable = true;

    // const raccoon = await loadGLTF(
    //   "./assets/models/musicband-raccoon/scene.gltf"
    // );

    // raccoon.scene.scale.set(0.1, 0.1, 0.1);
    // raccoon.scene.position.set(0, 1, 0);

    scene.add(light);

    // const anchor = mindarThree.addAnchor(1);

    const anchorVideo = mindarThree.addAnchor(0);

    // anchor.group.add(raccoon.scene);

    anchorVideo.group.add(videoPlane);

    anchorVideo.group.add(planeMesh);

    // planeMesh.userData.clickable = true;

    // anchorVideo.group.add(raccoon.scene);

    // const image = mindarThree.addAnchor(0);
    // image.group.add(planeMesh);

    anchorVideo.onTargetFound = () => {
      video.play();
    };

    anchorVideo.onTargetLost = () => {
      video.pause();
    };

    document.body.addEventListener("click", (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        let o = intersects[0].object;

        while (o.parent && !o.userData.clickable) {
          o = o.parent;
        }

        if (o.userData.clickable && o === planeMesh) {
          window.location.href = "https://dl.osunio.com/tbCg";
        }
      }
    });

    // video.addEventListener("play", () => {
    //   video.currentTime = 6;
    // });

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };
  start();
});
