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
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import georaster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import L from "leaflet";
import { ChevronLeftOutline, LocationMarker } from "heroicons-react";
import { useRouter } from "next/navigation";
import { getAWS } from "@/app/(web)/sumber/aws/AwsData";
import { getAWL } from "@/app/(web)/sumber/awl/AwlData";
import { DefaultBoundary } from "@/dummy/DefaultBoundary";
import {
  resultRendah,
  resultBerat,
  resultSedang,
  resultSangatRendah,
  resultSangatBerat,
} from "@/dummy/DummyResult";
const { BaseLayer } = LayersControl;

const TiffMap = () => {
  const router = useRouter();
  const mapRef = React.useRef<any>();
  const [tiffLayers, setTiffLayers] = useState<any[]>([]);
  const fileInputRef = React.useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aws, setAWS] = useState<any[]>([]);
  const [isResult, setIsResult] = useState(false);

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
    // setIsResult(false);
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
    // setIsResult(false);
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
          <div className="">
            <div>
              {tiffLayers.length == 2 && !isResult && (
                <button
                  onClick={() => {
                    setIsResult(true);
                  }}
                  className="bg-blue-500 text-white px-2 py-1 rounded">
                  Show Result
                </button>
              )}
            </div>
            <div>
              {isResult && (
                <button
                  onClick={() => {
                    setIsResult(false);
                  }}
                  className="bg-blue-500 text-white px-2 py-1 rounded">
                  Reset Resutl
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      {!isLoading && (
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
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
          {isResult && (
            <LayersControl position="topright">
              {/* Overlay layers */}
              <LayersControl.Overlay checked name="Sangat Tinggi (> 150 C/ha)">
                <JSONResult data={resultSangatBerat} map={mapRef.current} />
              </LayersControl.Overlay>

              <LayersControl.Overlay checked name="Tinggi (100 - 150 C/ha)">
                <JSONResult data={resultBerat} map={mapRef.current} />
              </LayersControl.Overlay>

              <LayersControl.Overlay checked name="Sedang (50 - 100 C/ha)">
                <JSONResult data={resultSedang} map={mapRef.current} />
              </LayersControl.Overlay>

              <LayersControl.Overlay checked name="Rendah (20 - 50 C/ha)">
                <JSONResult data={resultRendah} map={mapRef.current} />
              </LayersControl.Overlay>

              <LayersControl.Overlay checked name="Sangat Rendah (< 20 C/ha)">
                <JSONResult data={resultSangatRendah} map={mapRef.current} />
              </LayersControl.Overlay>
            </LayersControl>
          )}

          {aws.length && awl.length && (
            <NewMarkers markers={[...aws, ...awl]} />
          )}
          <GeoJSONBoundary data={DefaultBoundary} map={mapRef.current} />
        </MapContainer>
      )}
    </div>
  );
};

const JSONResult = ({ data, map }: any) => {
  const getFeatureStyle = (feature: any) => {
    let color;
    switch (feature.properties.Kelas_A) {
      case "Berat":
        color = "#b7de1b";
        break;
      case "Rendah":
        color = "#db6b0f";
        break;
      case "Sangat Berat":
        color = "#02ed22";
        break;
      case "Sedang":
        color = "#a4a832";
        break;
      case "Sangat Rendah":
        color = "#e62102";
        break;
      default:
        color = "gray";
    }

    return {
      color: color,
      weight: 2,
      opacity: 1,
      fillOpacity: 0.5,
    };
  };
  useEffect(() => {
    if (data && map) {
      const geoJsonLayer = L.geoJSON(data);

      const bounds = geoJsonLayer.getBounds();

      if (bounds.isValid()) {
        map.fitBounds(bounds);
      }
    }
  }, [data, map]);

  return <GeoJSON data={data} style={getFeatureStyle} />;
};

const GeoJSONBoundary = ({ data, map }: any) => {
  useEffect(() => {
    if (data && map) {
      const geoJsonLayer = L.geoJSON(data);

      const bounds = geoJsonLayer.getBounds();

      if (bounds.isValid()) {
        map.fitBounds(bounds);
      }
    }
  }, [data, map]);

  return (
    <GeoJSON
      data={data as any}
      style={{
        stroke: true,
        color: "#000000",
        fillColor: "#000000",
      }}
    />
  );
};

const NewMarkers = ({ markers }: any) => {
  const groupRef = React.useRef<any>();

  const icon = new L.Icon({
    iconUrl: "/marker.svg",
    iconSize: new L.Point(20, 25),
  });

  const iconAwl = new L.Icon({
    iconUrl: "/marker_awl.svg",
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
              icon={x.name === "AWS" ? icon : iconAwl}
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
