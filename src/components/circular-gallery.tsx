import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useRef } from "react";

type GL = Renderer["gl"];

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: any): void {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function getFontSize(font: string): number {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}

function createTextTexture(
  gl: GL,
  text: string,
  font: string = "bold 30px monospace",
  color: string = "black",
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get 2d context");
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const fontSize = getFontSize(font);
  const textHeight = Math.ceil(fontSize * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

interface TitleProps {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor?: string;
  font?: string;
}

class Title {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor: string;
  font: string;
  mesh!: Mesh;

  constructor({
    gl,
    plane,
    renderer,
    text,
    textColor = "#545050",
    font = "30px sans-serif",
  }: TitleProps) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor,
    );
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeightScaled = this.plane.scale.y * 0.15;
    const textWidthScaled = textHeightScaled * aspect;
    this.mesh.scale.set(textWidthScaled, textHeightScaled, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeightScaled * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

interface ScreenSize {
  width: number;
  height: number;
}
interface Viewport {
  width: number;
  height: number;
}

interface MediaProps {
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  text: string;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius?: number;
  font?: string;
  onClick?: (index: number) => void;
}

class Media {
  extra: number = 0;
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  text: string;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius: number;
  font?: string;
  onClick?: (index: number) => void;
  program!: Program;
  plane!: Mesh;
  title!: Title;
  scale!: number;
  padding!: number;
  width!: number;
  widthTotal!: number;
  x!: number;
  speed: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;
  fallbackImage: string = "";

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
    onClick,
  }: MediaProps) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.fallbackImage = `https://picsum.photos/seed/${index + 10}/800/600`;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.onClick = onClick;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    const loadImage = (src: string, attemptFallback = true) => {
      const img = new Image();

      // Use anonymous CORS mode for cross-origin images
      img.crossOrigin = "anonymous";

      const cleanup = () => {
        img.onload = null;
        img.onerror = null;
      };

      img.onload = () => {
        cleanup();
        texture.image = img;
        this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
      };

      img.onerror = () => {
        cleanup();
        if (attemptFallback && src !== this.fallbackImage) {
          console.warn(`Failed to load image: ${src}. Falling back to placeholder.`);
          loadImage(this.fallbackImage, false);
        }
      };

      // Add cache-busting parameter to avoid cached CORS issues
      const cacheBustedSrc = src.includes("?")
        ? `${src}&_cb=${Date.now()}`
        : `${src}?_cb=${Date.now()}`;
      img.src = cacheBustedSrc;
    };

    loadImage(this.image);
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
    });
  }

  update(scroll: { current: number; last: number }, direction: "right" | "left") {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }
    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;
    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [
          this.viewport.width,
          this.viewport.height,
        ];
      }
    }
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

interface AppConfig {
  items?: { image: string; text: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  onItemClick?: (index: number) => void;
}

class App {
  container: HTMLElement;
  scrollSpeed: number;
  scroll: { ease: number; current: number; target: number; last: number; position?: number };
  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  medias: Media[] = [];
  mediasImages: { image: string; text: string }[] = [];
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf: number = 0;
  isVisible: boolean = true;
  visibilityObserver!: IntersectionObserver;
  boundOnResize!: () => void;
  boundOnWheel!: (e: Event) => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!: (e: MouseEvent | TouchEvent) => void;
  isInteracting: boolean = false;
  start: number = 0;
  startY: number = 0;
  onItemClick?: (index: number) => void;

  constructor(
    container: HTMLElement,
    {
      items,
      bend = 1,
      textColor = "#ffffff",
      borderRadius = 0,
      font = "bold 30px sans-serif",
      scrollSpeed = 2,
      scrollEase = 0.05,
      onItemClick,
    }: AppConfig,
  ) {
    document.documentElement.classList.remove("no-js");
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onItemClick = onItemClick;
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
    this.addVisibilityObserver();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
    this.camera.position.y = -2;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });
  }

  createMedias(
    items: { image: string; text: string }[] | undefined,
    bend: number,
    textColor: string,
    borderRadius: number,
    font: string,
  ) {
    const galleryItems = items && items.length ? items : [];
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map(
      (data, index) =>
        new Media({
          geometry: this.planeGeometry,
          gl: this.gl,
          image: data.image,
          index,
          length: this.mediasImages.length,
          renderer: this.renderer,
          scene: this.scene,
          screen: this.screen,
          text: data.text,
          viewport: this.viewport,
          bend,
          textColor,
          borderRadius,
          font,
          onClick: this.onItemClick,
        }),
    );
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isInteracting = true;
    // Use scroll.target (not scroll.current) so we don't drift on quick taps mid-lerp
    this.scroll.position = this.scroll.target;
    this.start = "touches" in e ? e.touches[0].clientX : e.clientX;
    this.startY = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isInteracting) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const rawDx = x - this.start;
    // Only move gallery once drag clearly exceeds tap threshold
    if (Math.abs(rawDx) < 10) return;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  }

  onTouchUp(e: MouseEvent | TouchEvent) {
    if (!this.isInteracting) return;
    this.isInteracting = false;
    // Compute displacement here — the only reliable place on mobile
    const endX = "changedTouches" in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
    const endY = "changedTouches" in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;
    const dx = Math.abs(endX - this.start);
    const dy = Math.abs(endY - this.startY);
    const isTap = dx < 12 && dy < 12;
    if (isTap) {
      // Restore exactly — no movement, no snap
      this.scroll.target = this.scroll.position ?? this.scroll.target;
    }
    if (isTap && this.onItemClick) {
      const rect = this.container.getBoundingClientRect();
      const tapNdcX = ((endX - rect.left) / rect.width) * 2 - 1;
      const fov = (this.camera.fov * Math.PI) / 180;
      const vpW =
        2 * Math.tan(fov / 2) * this.camera.position.z * (this.screen.width / this.screen.height);
      let closest: { media: Media; dist: number } | null = null;
      this.medias.forEach((media) => {
        const screenNdcX = media.plane.position.x / (vpW / 2);
        const dist = Math.abs(tapNdcX - screenNdcX);
        if (!closest || dist < closest.dist) closest = { media, dist };
      });
      if (closest) {
        const originalIndex =
          (closest as { media: Media; dist: number }).media.index % (this.mediasImages.length / 2);
        // Suppress the ghost click that mobile browsers synthesize after touchend
        const suppress = (ev: Event) => {
          ev.stopPropagation();
          ev.preventDefault();
        };
        window.addEventListener("click", suppress, { capture: true, once: true });
        setTimeout(() => window.removeEventListener("click", suppress, { capture: true }), 400);
        this.onItemClick(originalIndex);
      }
      // Don't snap on a tap — gallery position must not change
      return;
    }
    // Swipe ended — no snapping, let inertia settle naturally
  }

  onWheel(e: Event) {
    const wheelEvent = e as WheelEvent;
    const delta = wheelEvent.deltaY || (wheelEvent as any).wheelDelta || (wheelEvent as any).detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
  }

  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias)
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport }),
      );
  }

  addVisibilityObserver() {
    this.visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        this.isVisible = entry?.isIntersecting ?? true;
        if (this.isVisible && this.raf === 0) {
          this.raf = window.requestAnimationFrame(this.update.bind(this));
        }
      },
      { rootMargin: "200px" },
    );
    this.visibilityObserver.observe(this.container);
  }

  update() {
    this.raf = 0;
    if (!this.isVisible) return;
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    if (this.medias) this.medias.forEach((media) => media.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener("resize", this.boundOnResize);
    // All pointer events scoped to container only
    this.container.addEventListener("wheel", this.boundOnWheel as any);
    this.container.addEventListener("mousedown", this.boundOnTouchDown as any);
    this.container.addEventListener("touchstart", this.boundOnTouchDown as any, { passive: true });
    // touch move/end follow the touchstart element automatically — keep on container
    this.container.addEventListener("touchmove", this.boundOnTouchMove as any, { passive: true });
    this.container.addEventListener("touchend", this.boundOnTouchUp as any);
    // mouse move/up on window so mouse drags work when cursor leaves container
    window.addEventListener("mousemove", this.boundOnTouchMove as any);
    window.addEventListener("mouseup", this.boundOnTouchUp as any);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    this.visibilityObserver?.disconnect();
    window.removeEventListener("resize", this.boundOnResize);
    this.container.removeEventListener("wheel", this.boundOnWheel as any);
    this.container.removeEventListener("mousedown", this.boundOnTouchDown as any);
    this.container.removeEventListener("touchstart", this.boundOnTouchDown as any);
    this.container.removeEventListener("touchmove", this.boundOnTouchMove as any);
    this.container.removeEventListener("touchend", this.boundOnTouchUp as any);
    window.removeEventListener("mousemove", this.boundOnTouchMove as any);
    window.removeEventListener("mouseup", this.boundOnTouchUp as any);
    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas as HTMLCanvasElement);
    }
  }
}

export interface CircularGalleryProps {
  items?: { image: string; text: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  onItemClick?: (index: number) => void;
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px sans-serif",
  scrollSpeed = 2,
  scrollEase = 0.05,
  onItemClick,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Stable ref so App always calls the latest callback without re-creating itself
  const onItemClickRef = useRef(onItemClick);
  useEffect(() => {
    onItemClickRef.current = onItemClick;
  }, [onItemClick]);

  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
      onItemClick: (i: number) => onItemClickRef.current?.(i),
    });
    return () => {
      app.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);
  return (
    <div
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      ref={containerRef}
    />
  );
}
