import React,{ useState } from "react";
import Webcam from "react-webcam";
import { Camera, RotateCcw, X, Check } from "lucide-react";

const angles = ["Front", "Left", "Right"];

function FaceGuide({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Start face scan"
      className="group flex flex-col items-center gap-4"
    >
      <svg
        viewBox="0 0 180 220"
        className="w-44 transition-transform duration-300 group-hover:scale-105"
        fill="none"
      >
        <path
          d="M90 16 C48 16 29 49 31 91
             L36 135 C39 168 61 195 90 201
             C119 195 141 168 144 135
             L149 91 C151 49 132 16 90 16Z"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeDasharray="5 6"
          strokeLinecap="round"
        />
        <path
          d="M57 91 Q67 83 77 91 M103 91 Q113 83 123 91"
          stroke="#60a5fa"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M90 94 L84 123 L96 123 M73 148 Q90 161 107 148"
          stroke="#60a5fa"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      <span className="text-sm text-blue-500 font-semibold">
        Click to start face scan
      </span>
    </button>
  );
}

export default function FaceScan({ onComplete }) {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const webcamRef = React.useRef(null);

  const capture = () => {
    const image = webcamRef.current?.getScreenshot();

    if (!image) {
      setError("Unable to capture image. Please try again.");
      return;
    }

    const updatedPhotos = [...photos, image];
    setPhotos(updatedPhotos);
    setError("");

    if (step < 2) {
      setStep(step + 1);
    } else {
      setActive(false);
      onComplete?.(updatedPhotos);
    }
  };

  const reset = () => {
    setPhotos([]);
    setStep(0);
    setError("");
    setActive(false);
  };

  return (
    <div>
      <div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">
              {photos.length === 3 && !active
                ? "Face scan complete"
                : "Scan your face"}
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Capture your face from three angles.
            </p>
          </div>

          {active && (
            <button
              type="button"
              onClick={() => setActive(false)}
              aria-label="Close camera"
            >
              <X />
            </button>
          )}
        </div>

        <div className="flex gap-2 mb-6">
          {angles.map((angle, index) => (
            <div
              key={angle}
              className={`flex-1 rounded-lg p-2 text-center text-xs border ${
                photos[index]
                  ? "border-emerald-500 text-emerald-400"
                  : active && step === index
                  ? "border-blue-500 text-blue-400"
                  : "border-white/10 text-gray-500"
              }`}
            >
              {photos[index] ? "✓ " : `${index + 1}. `}
              {angle}
            </div>
          ))}
        </div>

        {!active && photos.length === 0 && (
          <div className="py-6 flex justify-center">
            <FaceGuide onClick={() => setActive(true)} />
          </div>
        )}

        {active && (
          <>
            <h3 className="text-center text-lg font-medium mb-2">
              {angles[step]} face
            </h3>

            <p className="text-center text-sm text-gray-400 mb-4">
              {step === 0
                ? "Look straight at the camera."
                : step === 1
                ? "Turn your head to your left."
                : "Turn your head to your right."}
            </p>

            <div className="relative overflow-hidden rounded-xl bg-black">
              <Webcam
                ref={webcamRef}
                audio={false}
                mirrored
                screenshotFormat="image/jpeg"
                screenshotQuality={0.9}
                videoConstraints={{
                  facingMode: "user",
                  width: 640,
                  height: 640,
                }}
                onUserMediaError={() =>
                  setError("Camera access denied or unavailable.")
                }
                className="w-full aspect-[4/5] object-cover"
              />

              <svg
                viewBox="0 0 180 220"
                className="absolute inset-0 w-full h-full pointer-events-none"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M90 12 C48 12 28 48 31 91
                     L36 135 C39 168 61 195 90 201
                     C119 195 141 168 144 135
                     L149 91 C152 48 132 12 90 12Z"
                  stroke="#60a5fa"
                  strokeWidth="2"
                  strokeDasharray="4 5"
                />
              </svg>
            </div>

            {error && (
              <p className="text-red-400 text-sm mt-3">{error}</p>
            )}

            <button
              type="button"
              onClick={capture}
              className="mt-5 w-full rounded-lg bg-blue-600 hover:bg-blue-500 p-3 flex justify-center items-center gap-2"
            >
              <Camera size={18} />
              Capture {angles[step]} view
            </button>
          </>
        )}

        {photos.length > 0 && !active && (
          <div className="grid grid-cols-3 gap-3">
            {photos.map((photo, index) => (
              <div key={angles[index]}>
                <img
                  src={photo}
                  alt={`${angles[index]} face`}
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
                <p className="text-xs text-center text-gray-400 mt-2">
                  {angles[index]}
                </p>
              </div>
            ))}
          </div>
        )}

        {photos.length > 0 && !active && (
          <div className="flex gap-3 mt-5">
            <button
              type="button"
              onClick={reset}
              className="flex-1 border border-white/20 rounded-lg p-3 flex justify-center gap-2"
            >
              <RotateCcw size={18} /> Retake
            </button>

            {photos.length === 3 && (
              <button
                type="button"
                onClick={() => onComplete?.(photos)}
                className="flex-1 bg-blue-600 rounded-lg p-3 flex justify-center gap-2"
              >
                <Check size={18} /> Continue
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}