"use client";

import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  FeatureGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import georaster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import L from "leaflet";
import { ChevronLeftOutline, LocationMarker } from "heroicons-react";
import { useRouter } from "next/navigation";
import { getAWS } from "@/app/(web)/sumber/aws/AwsData";
import { getAWL } from "@/app/(web)/sumber/awl/AwlData";

const TiffMap = () => {
  const router = useRouter();
  const mapRef = React.useRef<any>();
  const [tiffLayers, setTiffLayers] = useState<any[]>([]);
  const fileInputRef = React.useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aws, setAWS] = useState<any[]>([]);

  const getAWSData = useCallback(() => {
    setIsLoading(true);
    getAWS()
      .then((res) => {
        if (res?.data) {
          setAWS(
            res.data.filter((x: any) => x.latitude != "0" && x.longitide != "0")
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const [awl, setAWL] = useState<any[]>([]);

  const getAWLData = useCallback(() => {
    setIsLoading(true);
    getAWL()
      .then((res) => {
        if (res?.data) {
          setAWL(
            res.data.filter((x: any) => x.latitude != "0" && x.longitide != "0")
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processTiffFiles(files);
  };

  const processTiffFiles = async (files: File[]) => {
    const layers = await Promise.all(
      files.map((file) => {
        return new Promise(async (resolve) => {
          const reader = new FileReader();
          reader.onload = async (e: any) => {
            const arrayBuffer = e.target.result;
            try {
              const raster = await georaster(arrayBuffer);
              const geoRasterLayer = new GeoRasterLayer({
                georaster: raster,
                opacity: 0.7,
                resolution: 256,
              });

              // Add layer to map if it exists
              if (mapRef.current) {
                geoRasterLayer.addTo(mapRef.current);
                const bounds = geoRasterLayer.getBounds();
                resolve({ id: file.name, layer: geoRasterLayer, bounds });
              }
            } catch (error) {
              console.error("Error processing TIFF:", error);
              alert("Failed to load TIFF file. Please check the format.");
              resolve(null); // Resolve with null on error
            }
          };
          reader.readAsArrayBuffer(file);
        });
      })
    );

    // Filter out any null layers
    const validLayers = layers.filter((layer) => layer !== null) as any[];

    // Update state with valid layers
    setTiffLayers((prevLayers) => [...prevLayers, ...validLayers]);

    if (mapRef.current && validLayers.length > 0) {
      const boundsList = validLayers.map((layer) => layer.bounds);
      const combinedBounds = L.latLngBounds(boundsList);
      mapRef.current.fitBounds(combinedBounds); // Fit to the combined bounds of all layers
    }
  };

  const removeLayer = (id: string) => {
    setTiffLayers((prevLayers) => {
      const layerToRemove = prevLayers.find((layer) => layer.id === id);
      if (layerToRemove && mapRef.current) {
        mapRef.current.removeLayer(layerToRemove.layer);
      }
      return prevLayers.filter((layer) => layer.id !== id);
    });
  };

  useEffect(() => {
    getAWSData();
    getAWLData();
  }, []);

  return (
    <div className="relative text-gray-60">
      <div
        className="absolute z-50 p-4 bg-white rounded shadow-md flex space-y-2 flex-col"
        style={{ top: "10px", left: "10px" }}>
        <div
          className="flex space-x-4 mb-4 hover:underline cursor-pointer"
          onClick={() => {
            router.replace("/dashboard");
          }}>
          <ChevronLeftOutline
            className={"h-[20px] w-[20px] text-gray-100"}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <div className="text-sm h-[20px]"> Back to Dashboard</div>
        </div>
        <h1 className="text-lg">Carbon Stock Map</h1>
        <input
          type="file"
          accept=".tiff,.tif"
          onChange={handleFileChange}
          multiple
          className="mb-2"
          ref={fileInputRef}
        />
      </div>
      <div
        className="absolute z-50 p-4 bg-white rounded shadow-md"
        style={{ top: "10px", right: "10px" }}>
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          <h2 className="text-md">Added Layers:</h2>
          <div>
            {tiffLayers.map((layer) => (
              <div key={layer.id} className="flex ">
                <div className="flex-grow">{layer.id} </div>
                <button
                  onClick={() => {
                    if (fileInputRef?.current) {
                      fileInputRef.current.value = null;
                    }

                    removeLayer(layer.id);
                  }}
                  className="text-red-500 mx-2">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map */}
      <MapContainer
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
        center={[-6.5597191, 106.7255352]}
        zoom={5}
        scrollWheelZoom={true}
        ref={mapRef}>
        <LayersControl position="topright">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {aws.length && awl.length && (
            <NewMarkers markers={[...aws, ...awl]} />
          )}
        </LayersControl>
      </MapContainer>
    </div>
  );
};

const NewMarkers = ({ markers }: any) => {
  const groupRef = React.useRef<any>();
  const map = useMap();
  console.log("markers", markers);

  React.useEffect(() => {
    if (map && markers) {
      map
        .fitBounds(
          markers.map((x: any) => [Number(x.latitude), Number(x.longitide)])
        )
        .setMaxZoom(17);
    }
  }, [map, markers]);

  const icon = new L.Icon({
    iconUrl: "/marker.svg",
    iconSize: new L.Point(20, 25),
  });

  return (
    <FeatureGroup ref={groupRef}>
      {markers &&
        markers.map((x: any, i: number) => {
          return (
            <Marker
              opacity={100}
              key={i}
              position={[Number(x.latitude), Number(x.longitide)]}
              icon={icon}
              eventHandlers={{
                click: (e) => {},
              }}>
              <Popup>
                <div className="border border-solid border-m3 w-44">
                  <div className="border-b border-solid border-m3 w-full flex items-center justify-center"></div>
                  <div className="w-full flex flex-col px-2 pt-2">
                    <div className="font-medium mr-2">{x.name}</div>
                    <div className="font-medium text-sm leading-none">
                      {x.detailName}
                    </div>
                    <div>Status: {x.status}</div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
    </FeatureGroup>
  );
};

export default TiffMap;
