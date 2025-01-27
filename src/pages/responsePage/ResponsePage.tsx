import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { Plus } from "lucide-react";

interface AnalysisResponse {
  analysis: string;
}

export default function ResponsePage() {
  const [image, setImage] = useState<File | null>(null);
  const [response, setResponse] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:3000/analyze-image", {
        method: "POST",
        body: formData,
      });
      const data: AnalysisResponse = await res.json();
      setResponse(data.analysis);
    } catch (error) {
      setResponse("Error analyzing image");
    }
  };

  return (
    <div className="mx-auto h-screen max-w-md bg-gradient-to-br from-sky-400 via-sky-500 to-sky-200 px-6 py-2">
      <div>
        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Formly.ai
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative h-64 w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-500 bg-transparent transition-colors hover:bg-gray-100"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <Plus className="mb-2 h-12 w-12 text-gray-400" />
              <p className="text-sm text-gray-500">Tap to add an image</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!image}
          className="w-full rounded bg-sky-600 p-2 text-white disabled:bg-blue-300"
        >
          Analyze Form
        </button>
      </form>
      <div className="mt-4 min-h-[250px] rounded border border-gray-500 bg-white/30 p-4">
        {response}
      </div>

      <div>
        <h1 className="mt-4 text-center text-xs text-white">
          Exercise at your own risk. Formly does not replace professional
          guidance.
        </h1>
      </div>
    </div>
  );
}
