"use client";

import { useEffect, useState, useRef } from "react";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'a-scene': any;
        'a-assets': any;
        'a-asset-item': any;
        'a-camera': any;
        'a-entity': any;
        'a-gltf-model': any;
      }
    }
  }
}

interface MindARViewerProps {
  targetsUrl: string;
  onTargetFound: (index: number) => void;
  onTargetLost: (index: number) => void;
  onClose: () => void;
}

export default function MindARViewer({
  targetsUrl,
  onTargetFound,
  onTargetLost,
  onClose,
}: MindARViewerProps) {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;

    const loadScripts = async () => {
      if ((window as any).AFRAME && (window as any).MINDAR) {
        if (active) setLoaded(true);
        return;
      }

      // Load A-Frame
      if (!(window as any).AFRAME) {
        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = "https://aframe.io/releases/1.5.0/aframe.min.js";
          script.onload = () => resolve();
          document.head.appendChild(script);
        });
      }

      // Load MindAR A-Frame plugin
      if (!(window as any).MINDAR) {
        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js";
          script.onload = () => resolve();
          document.head.appendChild(script);
        });
      }

      // Register drag-rotate component
      if ((window as any).AFRAME && !(window as any).AFRAME.components["drag-rotate-component"]) {
        (window as any).AFRAME.registerComponent("drag-rotate-component", {
          schema: { speed: { default: 2.0 } },
          init: function () {
            this.ifMouseDown = false;
            this.x_cord = 0;
            this.y_cord = 0;
            
            this.OnDocumentMouseDown = this.OnDocumentMouseDown.bind(this);
            this.OnDocumentMouseUp = this.OnDocumentMouseUp.bind(this);
            this.OnDocumentMouseMove = this.OnDocumentMouseMove.bind(this);
            this.OnDocumentTouchStart = this.OnDocumentTouchStart.bind(this);
            this.OnDocumentTouchEnd = this.OnDocumentTouchEnd.bind(this);
            this.OnDocumentTouchMove = this.OnDocumentTouchMove.bind(this);

            document.addEventListener("mousedown", this.OnDocumentMouseDown);
            document.addEventListener("mouseup", this.OnDocumentMouseUp);
            document.addEventListener("mousemove", this.OnDocumentMouseMove);
            document.addEventListener("touchstart", this.OnDocumentTouchStart);
            document.addEventListener("touchend", this.OnDocumentTouchEnd);
            document.addEventListener("touchmove", this.OnDocumentTouchMove);
          },
          remove: function () {
            document.removeEventListener("mousedown", this.OnDocumentMouseDown);
            document.removeEventListener("mouseup", this.OnDocumentMouseUp);
            document.removeEventListener("mousemove", this.OnDocumentMouseMove);
            document.removeEventListener("touchstart", this.OnDocumentTouchStart);
            document.removeEventListener("touchend", this.OnDocumentTouchEnd);
            document.removeEventListener("touchmove", this.OnDocumentTouchMove);
          },
          OnDocumentMouseDown: function (event: any) {
            this.ifMouseDown = true;
            this.x_cord = event.clientX;
            this.y_cord = event.clientY;
          },
          OnDocumentMouseUp: function () {
            this.ifMouseDown = false;
          },
          OnDocumentMouseMove: function (event: any) {
            if (this.ifMouseDown) {
              const temp_x = event.clientX - this.x_cord;
              const temp_y = event.clientY - this.y_cord;
              this.el.object3D.rotation.y += (temp_x * this.data.speed) / 100;
              this.el.object3D.rotation.x += (temp_y * this.data.speed) / 100;
              this.x_cord = event.clientX;
              this.y_cord = event.clientY;
            }
          },
          OnDocumentTouchStart: function (event: any) {
            if (event.touches.length > 0) {
              this.ifMouseDown = true;
              this.x_cord = event.touches[0].clientX;
              this.y_cord = event.touches[0].clientY;
            }
          },
          OnDocumentTouchEnd: function () {
            this.ifMouseDown = false;
          },
          OnDocumentTouchMove: function (event: any) {
            if (this.ifMouseDown && event.touches.length > 0) {
              const temp_x = event.touches[0].clientX - this.x_cord;
              const temp_y = event.touches[0].clientY - this.y_cord;
              this.el.object3D.rotation.y += (temp_x * this.data.speed) / 100;
              this.el.object3D.rotation.x += (temp_y * this.data.speed) / 100;
              this.x_cord = event.touches[0].clientX;
              this.y_cord = event.touches[0].clientY;
            }
          },
        });
      }

      if (active) setLoaded(true);
    };

    loadScripts();

    return () => {
      active = false;
      const sceneEl = document.querySelector("a-scene") as any;
      if (sceneEl && sceneEl.systems && sceneEl.systems["mindar-image-system"]) {
        try {
          sceneEl.systems["mindar-image-system"].stop();
        } catch (e) {
          console.error(e);
        }
      }
      const aframeCanvas = document.querySelector(".a-canvas");
      if (aframeCanvas) aframeCanvas.remove();
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const sceneEl = document.querySelector("a-scene");
    if (!sceneEl) return;

    const handleTargetFound = (e: any) => {
      const targetStr = e.target.getAttribute("mindar-image-target");
      const match = targetStr?.match(/targetIndex:\s*(\d+)/);
      if (match) {
        onTargetFound(parseInt(match[1], 10));
      }
    };

    const handleTargetLost = (e: any) => {
      const targetStr = e.target.getAttribute("mindar-image-target");
      const match = targetStr?.match(/targetIndex:\s*(\d+)/);
      if (match) {
        onTargetLost(parseInt(match[1], 10));
      }
    };

    const targets = document.querySelectorAll("[mindar-image-target]");
    targets.forEach((target) => {
      target.addEventListener("targetFound", handleTargetFound);
      target.addEventListener("targetLost", handleTargetLost);
    });

    return () => {
      targets.forEach((target) => {
        target.removeEventListener("targetFound", handleTargetFound);
        target.removeEventListener("targetLost", handleTargetLost);
      });
    };
  }, [loaded, onTargetFound, onTargetLost]);

  if (!loaded) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-50 text-slate-350 px-6 text-center">
        <div className="w-10 h-10 border-4 border-inacap-blue border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-bold">Cargando motor de Realidad Aumentada...</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 z-50 bg-black overflow-hidden mindar-viewer-container">
      <style>{`
        .a-enter-vr, .a-enter-ar { display: none !important; }
      `}</style>      <a-scene
        mindar-image={`imageTargetSrc: ${targetsUrl}; autoStart: true; maxTrack: 1; filterMinCF: 0.0001; filterBeta: 0.001`}
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights: true"
        gltf-model="dracoDecoderPath: https://www.gstatic.com/draco/versioned/decoders/1.5.6/;"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        style={{ width: "100%", height: "100%" }}
      >
        <a-assets>
          <a-asset-item id="model-0" src="/cepillo.glb"></a-asset-item>
          <a-asset-item id="model-1" src="/deWalt.glb"></a-asset-item>
          <a-asset-item id="model-2" src="/ingleteadora.glb"></a-asset-item>
          <a-asset-item id="model-3" src="/estacion_total.glb"></a-asset-item>
          <a-asset-item id="model-4" src="/soldadora.glb"></a-asset-item>
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        {/* Target 0: Cepillo */}
        <a-entity mindar-image-target="targetIndex: 0">
          <a-gltf-model
            src="#model-0"
            position="0 0 0"
            rotation="90 0 0"
            scale="6 6 6"
            drag-rotate-component=""
          ></a-gltf-model>
        </a-entity>

        {/* Target 1: DeWalt Drill */}
        <a-entity mindar-image-target="targetIndex: 1">
          <a-gltf-model
            src="#model-1"
            position="0 0 0"
            rotation="90 0 0"
            scale="5 5 5"
            drag-rotate-component=""
          ></a-gltf-model>
        </a-entity>

        {/* Target 2: Ingleteadora */}
        <a-entity mindar-image-target="targetIndex: 2">
          <a-gltf-model
            src="#model-2"
            position="0 0 0"
            rotation="90 0 0"
            scale="4.5 4.5 4.5"
            drag-rotate-component=""
          ></a-gltf-model>
        </a-entity>

        {/* Target 3: Estacion Total */}
        <a-entity mindar-image-target="targetIndex: 3">
          <a-gltf-model
            src="#model-3"
            position="0 0 0"
            rotation="90 0 0"
            scale="3.5 3.5 3.5"
            drag-rotate-component=""
          ></a-gltf-model>
        </a-entity>

        {/* Target 4: Soldadora */}
        <a-entity mindar-image-target="targetIndex: 4">
          <a-gltf-model
            src="#model-4"
            position="0 0 0"
            rotation="90 0 0"
            scale="2 2 2"
            drag-rotate-component=""
          ></a-gltf-model>
        </a-entity>
      </a-scene>
    </div>
  );
}
