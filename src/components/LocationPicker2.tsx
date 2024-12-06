import { useEffect, useRef, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import { Checkbox, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';

interface Props {
  onCenterChange: (center: [number, number]) => void;
}

// 定义 debounce 函数
function debounce(func: any, wait: number) {
  let timeout: any;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

export default function MapContainer({ onCenterChange }: Props) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);
    //const centerRef = useRef<[number, number]>([103.874848, 30.617516]);
    //const [center, setCenter] = useState<[number, number]>([103.874848, 30.617516]);
    const placeSearchRef = useRef<any>(null); // PlaceSearch as ref
    const nearbySearchRef = useRef<any>(null); // NearbySearch as ref
    const handlePlaceClickRef = useRef<(lng: number, lat: number)=>void>();
    let map: any = null; 
    let marker: any = null; 
  //let placeSearch: any = null; // 声明 placeSearch 变量

  const [checked, setChecked] = useState([1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  useEffect(() => {
    (window as any)._AMapSecurityConfig = {
      securityJsCode: "e9941671b66fd29b59a139e6e9964bb4",
    };

    AMapLoader.load({
      key: "e8e3d1c789450d00a7c069de53019f6a",
      version: "",
      plugins: ["AMap.Scale", "AMap.PlaceSearch", "AMap.CitySearch", "AMap.Geolocation"],
    })
      .then((AMap) => {
        if (mapContainerRef.current) {
          map = new AMap.Map(mapContainerRef.current, {
            viewMode: "3D",
            zoom: 16,
          });

          marker = new AMap.Marker({
            position: [103.874848, 30.617516],
          });
          marker.setMap(map);

          //centerRef.current = map.getCenter();

          const citySearch = new AMap.CitySearch();
          // 获取用户所在城市信息
          const getPlaceSearch = () => {
            citySearch.getLocalCity(function (status, result) {
              let city: any=null;
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.city) {
                  city = result.city
                  console.log("city:", city);
                }
              } else {
                console.error('获取城市信息失败', result);
              }
              if (placeSearchRef.current) {   
                placeSearchRef.current.clear();
              }
              placeSearchRef.current = new AMap.PlaceSearch({
                type: '商务住宅',
                pageSize: 20,
                pageIndex: 1,
                city: city==null?"成都市":city, 
                citylimit: false, 
                map: map,
                //panel: "panel",
                autoFitView: false
              })
            });
          };

          getPlaceSearch(); 

          // 监听输入框内容变化事件
          const input = document.getElementById("tip-input") as HTMLInputElement;
          input.addEventListener('input', debounce(() => {
            const keywords = input.value;
            placeSearchRef.current.search(keywords, function (status: any, result: any) {
              if (status === 'complete' && result.info === 'OK') {
                setNearbyPlaces(result.poiList.pois);
              } else {
                console.error('地点搜索失败', result);
              }
            });
          }, 800)); // 设置延迟时间为 800 毫秒

          const getNearbySearch = () => {
            if (nearbySearchRef.current) {   
                nearbySearchRef.current.clear();
            }
            nearbySearchRef.current = new AMap.PlaceSearch({
            type: '商务住宅',
            pageSize: 20,
            pageIndex: 1,
            citylimit: false, 
            map: map,
            autoFitView: false
            });
          };

          getNearbySearch(); 

          const searchNearby = (lng: number, lat: number) => {
            if (nearbySearchRef.current) { // 确保 placeSearch 已经初始化
                //nearbySearchRef.current.clear();
                //getPlaceSearch();
              nearbySearchRef.current.searchNearBy('', [lng, lat], 500, function (status, result) {
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

          const geolocation = new AMap.Geolocation({
            enableHighAccuracy: false,//是否使用高精度定位，默认:true
            //timeout: 10000,          //超过10秒后停止定位，默认：5s
            position:'RB',    //定位按钮的停靠位置
            offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
            zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
          });

          const handlePlaceClick = (lng: number, lat: number) => {
            console.log("place:", lng, lat);
            
            map.setCenter([lng,lat]);
            //how to zoom and center?
            map.setZoom(16);
            marker.setPosition([lng,lat]);
          };
          handlePlaceClickRef.current = handlePlaceClick

          map.on('complete', function () {
            const newCenter = map.getCenter();
            marker.setPosition(newCenter);
            searchNearby(newCenter.lng, newCenter.lat);
            map.addControl(geolocation);
            geolocation.on('complete', function(data) {
                // 定位成功后的回调函数
                console.log('定位成功:', data);
                map.setZoomAndCenter(16, [data.position.lng, data.position.lat]); // 设置地图缩放级别和中心点
              });
            
              geolocation.on('error', function(data) {
                // 定位失败后的回调函数
                console.error('定位失败:', data);
              });
          });


          map.on('moveend', () => {
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
      <TextField id="tip-input" label="请输入地址" variant="outlined" />
      <List dense sx={{ width: '100%', position: 'relative', overflow: 'auto', maxHeight: '200px' }}>
      {nearbyPlaces.map((place) => {
        const labelId = `checkbox-list-secondary-label-${place.id}`;
        return (
        <ListItem
         key={place.id}
         secondaryAction={
           <Checkbox
             edge="end"
             onChange={handleToggle(place.id)}
             checked={checked.includes(place.id)}
             inputProps={{ 'aria-labelledby': labelId }}
           />
         }
         disablePadding
       >
         <ListItemButton onClick={() => handlePlaceClickRef.current?.(place.location.lng, place.location.lat)}>
           <ListItemText id={labelId} primary={`${place.name}`} />
           <ListItemText id={labelId} primary={`${place.address}`} />
         </ListItemButton>
       </ListItem>
        )
      })}
      </List>
      {/* <div id="nearbyPlaces">
        {nearbyPlaces.map((place) => (
          <div key={place.id}>
            <h5>{place.name}</h5>
            <p>{place.address}</p>
          </div>
        ))}
      </div> */}
      {/* <div id="panel">
      </div> */}
    </div>
  );
}

