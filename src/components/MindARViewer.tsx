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
      {/* Header Info Overlay */}
      <div className="absolute top-6 left-6 right-6 z-55 flex justify-between items-center pointer-events-auto">
        <span className="bg-slate-950/80 text-slate-200 font-extrabold text-[10px] px-3.5 py-2 rounded-full border border-slate-800 backdrop-blur-sm shadow-xl">
          Apunta al código QR / Panel físico 🔍
        </span>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-slate-100 flex items-center justify-center active:scale-95 transition-all shadow-lg pointer-events-auto"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <a-scene
        mindar-image={`imageTargetSrc: ${targetsUrl}; autoStart: true; maxTrack: 1; filterMinCF: 0.0001; filterBeta: 0.001`}
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights: true"
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
            position="0 0 0.1"
            rotation="90 0 0"
            scale="0.25 0.25 0.25"
            animation="property: rotation; to: 90 360 0; loop: true; dur: 12000; easing: linear"
          ></a-gltf-model>
        </a-entity>

        {/* Target 1: DeWalt Drill */}
        <a-entity mindar-image-target="targetIndex: 1">
          <a-gltf-model
            src="#model-1"
            position="0 0 0.1"
            rotation="90 0 0"
            scale="0.2 0.2 0.2"
            animation="property: rotation; to: 90 360 0; loop: true; dur: 12000; easing: linear"
          ></a-gltf-model>
        </a-entity>

        {/* Target 2: Ingleteadora */}
        <a-entity mindar-image-target="targetIndex: 2">
          <a-gltf-model
            src="#model-2"
            position="0 0 0.1"
            rotation="90 0 0"
            scale="0.18 0.18 0.18"
            animation="property: rotation; to: 90 360 0; loop: true; dur: 12000; easing: linear"
          ></a-gltf-model>
        </a-entity>

        {/* Target 3: Estacion Total */}
        <a-entity mindar-image-target="targetIndex: 3">
          <a-gltf-model
            src="#model-3"
            position="0 0 0.1"
            rotation="90 0 0"
            scale="0.25 0.25 0.25"
            animation="property: rotation; to: 90 360 0; loop: true; dur: 12000; easing: linear"
          ></a-gltf-model>
        </a-entity>

        {/* Target 4: Soldadora */}
        <a-entity mindar-image-target="targetIndex: 4">
          <a-gltf-model
            src="#model-4"
            position="0 0 0.1"
            rotation="90 0 0"
            scale="0.22 0.22 0.22"
            animation="property: rotation; to: 90 360 0; loop: true; dur: 12000; easing: linear"
          ></a-gltf-model>
        </a-entity>
      </a-scene>
    </div>
  );
}
