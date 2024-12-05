import { useEffect, useRef, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

interface Props {
  onCenterChange: (center: [number, number]) => void;
}

export default function MapContainer({ onCenterChange }: Props) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);
    //const centerRef = useRef<[number, number]>([103.874848, 30.617516]);
    //const [center, setCenter] = useState<[number, number]>([103.874848, 30.617516]);
    const placeSearchRef = useRef<any>(null); // PlaceSearch as ref
    let map: any = null; 
    let marker: any = null; 
  //let placeSearch: any = null; // 声明 placeSearch 变量

  useEffect(() => {
    (window as any)._AMapSecurityConfig = {
      securityJsCode: "e9941671b66fd29b59a139e6e9964bb4",
    };

    AMapLoader.load({
      key: "e8e3d1c789450d00a7c069de53019f6a",
      version: "",
      plugins: ["AMap.Scale", "AMap.PlaceSearch", "AMap.CitySearch"],
    })
      .then((AMap) => {
        if (mapContainerRef.current) {
          map = new AMap.Map(mapContainerRef.current, {
            viewMode: "3D",
            zoom: 16,
          });

          //centerRef.current = map.getCenter();

          marker = new AMap.Marker({
            position: [103.874848, 30.617516],
          });
          marker.setMap(map);

          const citySearch = new AMap.CitySearch();
          // 获取用户所在城市信息
          const getPlaceSearch = () => {
            citySearch.getLocalCity(function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.city) {
                    if (placeSearchRef.current) {   
                        placeSearchRef.current.clear();
                    }
                    placeSearchRef.current = new AMap.PlaceSearch({
                    type: '商务住宅',
                    pageSize: 20,
                    pageIndex: 1,
                    city: result.city, 
                    citylimit: false, 
                    map: map,
                    //panel: "panel",
                    autoFitView: false
                  });
                  console.log("city:", result.city);
                }
              } else {
                console.error('获取城市信息失败', result);
              }
            });
          };

          getPlaceSearch(); // 初始化时获取城市信息

          const searchNearby = (lng: number, lat: number) => {
            if (placeSearchRef.current) { // 确保 placeSearch 已经初始化
              placeSearchRef.current.searchNearBy('', [lng, lat], 500, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  setNearbyPlaces(result.poiList.pois);
                  console.log("nearbyPlaces:", result.poiList.pois);
                } else {
                  console.error('附近地点搜索失败', result);
                }
              });
            }
          };

          //searchNearby(); // 初始化时搜索附近地点

          map.on('complete', function () {
            const newCenter = map.getCenter();
            marker.setPosition(newCenter);
            searchNearby(newCenter.lng, newCenter.lat);
          });


          map.on('dragend', () => {
            const newCenter = map.getCenter();
            marker.setPosition(newCenter);
            //setCenter([newCenter.lng, newCenter.lat]);
            onCenterChange([newCenter.lng, newCenter.lat]);
            searchNearby(newCenter.lng, newCenter.lat); 
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
        map.destroy();
      }
    };
  }, []); 

  return (
    <div>
      <div
        ref={mapContainerRef}
        id="container"
        style={{ height: "400px", width: '100%' }}
      />
      <div id="nearbyPlaces">
        {nearbyPlaces.map((place) => (
          <div key={place.id}>
            <h5>{place.name}</h5>
            <p>{place.address}</p>
          </div>
        ))}
      </div>
      {/* <div id="panel">
      </div> */}
    </div>
  );
}

