import React from "react";
import {
  UploadCloud,
} from "lucide-react";

export default function CreateFictionPage() {
  return (
      <div>
      {/* Main content */}
      <main className="flex-1 flex justify-center py-12 px-4">
        <div className="w-full max-w-2xl bg-white shadow rounded-xl p-8">
          <h1 className="text-2xl font-bold mb-2">Create New Fiction</h1>
          <p className="text-sm text-gray-600 mb-8">
            Start crafting your story with our AI-powered writing assistant
          </p>

          {/* Form */}
          <form className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter your fiction title"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="genre">
                Genre
              </label>
              <select
                id="genre"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              >
                <option>Fantasy</option>
                <option>Sci-Fi</option>
                <option>Romance</option>
                <option>Horror</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Brief description of your story"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              ></textarea>
            </div>

            {/* Cover Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">Cover Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center py-10 text-sm text-gray-500 bg-gray-50">
                <div className="text-center flex flex-col items-center space-y-2">
                  <UploadCloud className="w-6 h-6" />
                  <p>Drop your cover image here or browse</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
              >
                Create Fiction
              </button>
            </div>
          </form>
        </div>
      </main>

      </div>
  );
}
