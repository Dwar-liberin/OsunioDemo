import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

//const THREE = window.MINDAR.IMAGE? window.MINDAR.IMAGE.THREE: window.MINDAR.FACE.THREE;

export const loadGLTF = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      resolve(gltf);
    });
  });
};

export const loadAudio = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.AudioLoader();
    loader.load(path, (buffer) => {
      resolve(buffer);
    });
  });
};

export const loadVideo = (path) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    //video.addEventListener('loadeddata', () => {
    video.addEventListener("loadedmetadata", () => {
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("loop", "");
      resolve(video);
    });
    video.src = path;
  });
};

/**
 * @param {string} path The date
 * @return {Promise<THREE.Texture>}
 */

export const loadTexture = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.load(path, (texture) => {
      resolve(texture);
    });
  });
};

/**
 * @param {string[]} paths The date
 * @return {Promise<THREE.Texture>[]}
 */
export const loadTextures = (paths) => {
  const loader = new THREE.TextureLoader();
  const promises = [];
  for (let i = 0; i < paths.length; i++) {
    promises.push(
      new Promise((resolve, reject) => {
        loader.load(paths[i], (texture) => {
          resolve(texture);
        });
      })
    );
  }
  return Promise.all(promises);
};
