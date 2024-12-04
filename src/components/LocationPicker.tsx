// LocationPicker.tsx
import { useRef, useEffect } from 'react';

interface LocationData {
  name: string;
  location: string;
  address: string;
}

interface LocationPickerProps {
  onLocationSelected: (locationData: LocationData) => void;
}

function LocationPicker({ onLocationSelected }: LocationPickerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const src = `https://m.amap.com/picker/?key=e8e3d1c789450d00a7c069de53019f6a&jscode=e9941671b66fd29b59a139e6e9964bb4`; 

  useEffect(() => {

    const handleMessage = (e: MessageEvent) => {
      if (e.origin === 'https://m.amap.com') {
        const locationData = e.data as LocationData;
        onLocationSelected(locationData);
      }
    };

    if (iframeRef.current) {
      window.addEventListener('message', handleMessage);
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onLocationSelected]);

  return (
    <iframe
      id="test"
      src={src} // 直接设置 src 属性
      ref={iframeRef}
      width="100%"
      height="400px"
      title="高德地图选址"
    />
  );
}

export default LocationPicker;