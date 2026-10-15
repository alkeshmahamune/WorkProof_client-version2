
import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Camera, RotateCcw, Check, X } from "lucide-react";

function LiveSelfie({ onCapture, onClose }) {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  const capturePhoto = () => {
    const image = webcamRef.current?.getScreenshot();

    if (image) {
      setPhoto(image);
    } else {
      setError("Unable to capture photo. Please try again.");
    }
  };

  const confirmPhoto = async () => {
    if (!photo) return;

    // Convert the captured image into a File
    const response = await fetch(photo);
    const blob = await response.blob();

    const file = new File(
      [blob],
      "selfie.jpg",
      { type: "image/jpeg" }
    );

    onCapture(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 text-gray-900 shadow-xl">

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Take a selfie
          </h2>

          <button type="button" onClick={onClose} aria-label="Close camera">
            <X size={22} />
          </button>
        </div>

        <div className="overflow-hidden rounded-xl bg-black">
          {photo ? (
            <img
              src={photo}
              alt="Selfie preview"
              className="aspect-[3/4] w-full object-cover"
            />
          ) : (
            <Webcam
              ref={webcamRef}
              audio={false}
              mirrored
              screenshotFormat="image/jpeg"
              screenshotQuality={0.9}
              videoConstraints={{
                facingMode: "user",
                width: { ideal: 1280 },
                height: { ideal: 960 },
              }}
              onUserMediaError={() =>
                setError("Camera access failed. Check browser permissions.")
              }
              className="aspect-[3/4] w-full object-cover"
            />
          )}
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        )}

        <p className="my-3 text-sm text-gray-500">
          Position your face in the center and ensure good lighting.
        </p>

        {photo ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPhoto(null)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border p-3"
            >
              <RotateCcw size={18} />
              Retake
            </button>

            <button
              type="button"
              onClick={confirmPhoto}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 p-3 text-white"
            >
              <Check size={18} />
              Confirm
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={capturePhoto}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 p-3 text-white"
          >
            <Camera size={18} />
            Capture selfie
          </button>
        )}
      </div>
    </div>
  );
}

export default LiveSelfie