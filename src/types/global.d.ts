import "react";

type ModelViewerAttributes = {
  src?: string;
  alt?: string;
  poster?: string;
  ar?: boolean | string;
  "ar-modes"?: string;
  "camera-controls"?: boolean | string;
  "auto-rotate"?: boolean | string;
  "shadow-intensity"?: string;
  "environment-image"?: string;
  exposure?: string;
  loading?: "auto" | "lazy" | "eager";
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  id?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}
