import { useEffect, useRef, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

interface Props {
  onCenterChange: (center: [number, number]) => void; // 添加回调函数 props
}

export default function MapContainer({ onCenterChange }: Props) { // 传入回调函数
  const mapContainerRef = useRef(null);
  const [center, setCenter] = useState([116.397428, 39.90923]);
  let map = null;
  let marker = null;

  useEffect(() => {
    (window as any)._AMapSecurityConfig = {
      securityJsCode: "e9941671b66fd29b59a139e6e9964bb4",
    };

    AMapLoader.load({
      key: "e8e3d1c789450d00a7c069de53019f6a",
      version: "", 
      plugins: ["AMap.Scale"],
    })
      .then((AMap) => {
        if (mapContainerRef.current) {
          map = new AMap.Map(mapContainerRef.current, {
            viewMode: "3D",
            zoom: 11,
            center: center,
          });

          marker = new AMap.Marker({
            icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
            position: center,
            offset: new AMap.Pixel(-13, -30)
          });
          // @ts-ignore
          marker.setMap(map);

          // @ts-ignore
          map.on('moveend', () => {
            // @ts-ignore
            const newCenter = map.getCenter();
            const lng = newCenter.lng;
            const lat = newCenter.lat;
            setCenter([lng, lat]); 
            //refresh marker
            // @ts-ignore
            marker.setPosition([lng, lat]);
            onCenterChange([lng, lat]); 
          });
        } else {
          console.error('地图容器未找到');
        }
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      if (map) {
        (map as any).destroy();
      }
    };
  }, []); // 将 onCenterChange 添加到依赖数组中

  return (
    <div 
      ref={mapContainerRef} 
      id="container" 
      style={{ height: "400px", width: '100%' }} 
    />
  );
}