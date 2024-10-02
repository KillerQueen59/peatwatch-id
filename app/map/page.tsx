import dynamic from "next/dynamic";

const TiffMap = dynamic(() => import("../../components/Map"), {
  ssr: false,
});
const Map = () => {
  return (
    <div>
      <TiffMap />
    </div>
  );
};
export default Map;
