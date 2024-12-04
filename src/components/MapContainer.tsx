import { useEffect, useRef } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

export default function MapContainer() {
  const mapContainerRef = useRef(null);
  let map = null;

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
        // 确保 mapContainerRef.current 已经存在
        if (mapContainerRef.current) {
          map = new AMap.Map(mapContainerRef.current, {
            viewMode: "3D",
            zoom: 11,
            center: [116.397428, 39.90923],
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
  }, []);

  return (
    <div 
      ref={mapContainerRef} 
      id="container" // 添加 id 属性
      style={{ height: "400px", width: '100%' }} 
    />
  );
}