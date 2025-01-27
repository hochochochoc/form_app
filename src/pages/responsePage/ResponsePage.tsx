import React, { useState } from "react";

export default function ResponsePage() {
  const [image, setImage] = useState<File | null>(null);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:3000/analyze-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResponse(data.analysis);
    } catch (error) {
      setResponse("Error analyzing image");
    }
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full rounded border p-2"
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white"
        >
          Analyze Form
        </button>
      </form>

      <div className="mt-4 min-h-[100px] rounded border p-4">{response}</div>
    </div>
  );
}
