import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";
import gsap from "gsap";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    if (canvasDiv.current) {
      let isDisposed = false;
      let isInViewport = true;
      let isReady = false;
      let animationFrame = 0;
      let resizeHandler: (() => void) | undefined;
      let touchMoveTarget: HTMLElement | null = null;
      let clearHoverListeners: (() => void) | undefined;
      let introTimeout: number | undefined;
      let sceneTimelineContext: gsap.Context | undefined;
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then((gltf) => {
        if (gltf && !isDisposed) {
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) {
            clearHoverListeners = animations.hover(gltf, hoverDivRef.current);
          }
          mixer = animations.mixer;
          let character = gltf.scene;
          scene.add(character);
          isReady = true;
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;
          sceneTimelineContext = gsap.context(() => {
            setCharTimeline(character, camera);
            setAllTimeline();
          });
          progress.loaded().then(() => {
            if (isDisposed) return;
            introTimeout = window.setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
          resizeHandler = () => handleResize(renderer, camera, canvasDiv);
          window.addEventListener("resize", resizeHandler);
          startRendering();
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      const onTouchMove = (event: TouchEvent) => {
        handleTouchMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        touchMoveTarget = event.target as HTMLElement;
        debounce = setTimeout(() => {
          touchMoveTarget?.addEventListener("touchmove", onTouchMove);
        }, 200);
      };

      const onTouchEnd = () => {
        touchMoveTarget?.removeEventListener("touchmove", onTouchMove);
        touchMoveTarget = null;
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      landingDiv?.addEventListener("touchstart", onTouchStart);
      landingDiv?.addEventListener("touchend", onTouchEnd);
      const animate = () => {
        animationFrame = 0;
        if (isDisposed) return;
        if (!isReady || !isInViewport || document.hidden) return;
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
        animationFrame = window.requestAnimationFrame(animate);
      };

      const startRendering = () => {
        if (
          !animationFrame &&
          !isDisposed &&
          isReady &&
          isInViewport &&
          !document.hidden
        ) {
          animationFrame = window.requestAnimationFrame(animate);
        }
      };
      const stopRendering = () => {
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
      };
      const onVisibilityChange = () => {
        if (document.hidden) stopRendering();
        else startRendering();
      };
      const visibilityObserver = "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => {
            isInViewport = entry.isIntersecting;
            if (isInViewport) startRendering();
            else stopRendering();
          })
        : undefined;
      visibilityObserver?.observe(canvasDiv.current);
      document.addEventListener("visibilitychange", onVisibilityChange);
      startRendering();

      return () => {
        isDisposed = true;
        stopRendering();
        visibilityObserver?.disconnect();
        document.removeEventListener("visibilitychange", onVisibilityChange);
        if (resizeHandler) window.removeEventListener("resize", resizeHandler);
        clearTimeout(introTimeout);
        progress.cancel();
        sceneTimelineContext?.revert();
        clearTimeout(debounce);
        scene.clear();
        renderer.dispose();
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        document.removeEventListener("mousemove", onMouseMove);
        landingDiv?.removeEventListener("touchstart", onTouchStart);
        landingDiv?.removeEventListener("touchend", onTouchEnd);
        touchMoveTarget?.removeEventListener("touchmove", onTouchMove);
        clearHoverListeners?.();
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
