import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";

const App = () => {
  const [userData, setUserData] = useState([]);

  const [index, setIndex] = useState(1);

  const [savedImages, setSavedImages] = useState(() => {
    const stored = localStorage.getItem("savedImages");
    return stored ? JSON.parse(stored) : [];
  });

  const handleSave = (image) => {
    const alreadySaved = savedImages.find((img) => img.id === image.id);
    if (!alreadySaved && savedImages.length < 8) {
      setSavedImages([...savedImages, image]);
    }
  };
  const getData = async () => {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=16`
    );
    setUserData(response.data);
  };

  useEffect(
    function () {
      getData();
    },
    [index]
  );

  useEffect(() => {
    localStorage.setItem("savedImages", JSON.stringify(savedImages));
  }, [savedImages]);

  useEffect(() => {
    const storedImages = localStorage.getItem("savedImages");
    if (storedImages) {
      setSavedImages(JSON.parse(storedImages));
    }
  }, []);

  let printUserData = (
    <h3 className="text-gray-300 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
      Loading...
    </h3>
  );

  if (userData.length > 0) {
    printUserData = userData.map(function (elem, idx) {
      return (
        <div key={idx}>
          <Card elem={elem} onSave={handleSave} />
        </div>
      );
    });
  }

  return (
    <div className="bg-black overflow-auto h-screen p-4 text-white">
      <div className="mb-4">
        <div className="flex items-center justify-between gap-4 mb-2">
          <h2 className="text-white text-lg font-bold">
            Saved Images (8 Images at a time at max)
          </h2>
          <button
            className="bg-red-500 text-white text-xs px-3 py-1 rounded"
            onClick={() => {
              setSavedImages([]);
              localStorage.removeItem("savedImages");
            }}
          >
            Clear Saved Images
          </button>
        </div>

        {savedImages.length === 0 ? (
          <h3 className="text-gray-400 text-sm">No saved images</h3>
        ) : (
          <>
            <div className="flex gap-2 overflow-x-auto mb-1">
              {savedImages.map((img) => (
                <a href={img.url} target="_blank" key={img.id}>
                  <img
                    src={img.download_url}
                    alt={img.author}
                    className="h-20 w-20 object-cover rounded-md border-2 border-amber-400"
                  />
                </a>
              ))}
            </div>
            {savedImages.length === 8 && (
              <h3 className="text-red-500 text-sm">
                No more images can be saved...
              </h3>
            )}
          </>
        )}
      </div>

      <div className="flex h-[72%] flex-wrap gap-4 p-2">{printUserData}</div>

      <div className="flex justify-center gap-6 items-center p-4">
        <button
          style={{ opacity: index == 1 ? 0.6 : 1 }}
          className="bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold"
          onClick={() => {
            if (index > 1) {
              setIndex(index - 1);
              setUserData([]);
            }
          }}
        >
          Prev
        </button>
        <h4>Page {index}</h4>
        <button
          className="bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold"
          onClick={() => {
            setUserData([]);

            setIndex(index + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
