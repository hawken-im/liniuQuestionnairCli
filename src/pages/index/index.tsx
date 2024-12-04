import { SetStateAction, useState } from 'react';
import { useLoad } from '@tarojs/taro'
import './index.css'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import { Box, Button, Card, CardContent, CssBaseline, Typography } from '@mui/material';
import HeaderBar from '../../components/HeaderBar';
import MapContainer from '@/components/MapContainer';
import LocationPicker from '@/components/LocationPicker';
import LocationPicker2 from '@/components/LocationPicker2';
import BottomSheet from '@/components/BottomSeet';


const NumOfQuestions = 9;//这个问卷有多少个问题、
const Answered = 5;//已经回答了

export default function Index () {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mapCenter, setMapCenter] = useState([116.397428, 39.90923]);

  const handleCenterChange = (center: [number, number]) => {
    setMapCenter(center);
    console.log('新的中心点坐标：', center);
  };
  
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleLocationSelected = (locationData: {
    name: string;
    location: string;
    address: string;
  }) => {
    setSelectedLocation(locationData as any);
  };
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <Container maxWidth="xl" disableGutters sx={{bgcolor: '#f3f3f3'}}>
      <CssBaseline />
      <AppBar 
        position="sticky" 
        sx={{bgcolor: '#fff', mx: 0, px: 0 , width: '100%'}}>
        <HeaderBar progress={Answered/NumOfQuestions*100} />
      </AppBar>
      <Box sx={{px: 4, py: 2, bgcolor: '#f3f3f3'}}>

      <Card sx={{width: '100%', height: '800px', bgcolor: '#fff', mb: 2}}>
          <CardContent>
            <Typography variant="h6" sx={{fontSize: '24px', fontWeight: 'regular', color: '#292929'}}>hello</Typography>
            <Typography variant="h6" sx={{fontSize: '24px', fontWeight: 'regular', color: '#292929'}}>{mapCenter}</Typography>
            <LocationPicker2 onCenterChange={handleCenterChange} />
            <div id="location-info">
              {selectedLocation ? (
                <div>
                  <p>您选择了: {(selectedLocation as any).name}</p>
                  <p>地址: {(selectedLocation as any).address}</p>
                  <p>坐标: {(selectedLocation as any).location}</p>
                </div>
              ) : (
                <p>请选择地址</p>
              )}
            </div>
          </CardContent>
        </Card>
        <Typography variant="h6" sx={{fontSize: '24px', fontWeight: 'regular', color: '#292929', my: 2}}>基本信息</Typography>
        <Card sx={{width: '100%', height: '400px', bgcolor: '#fff', mb: 2}}>
          <CardContent>
            <Button onClick={() => handleOpenModal()}>显示底部弹窗</Button>
            <Typography variant="h6" sx={{fontSize: '24px', fontWeight: 'regular', color: '#292929'}}>hello</Typography>
            <MapContainer />
          </CardContent>
        </Card>

        
        
      </Box>
      <BottomSheet show={showModal} onClose={handleCloseModal}>
        <h2>底部弹出框标题</h2>
        <LocationPicker onLocationSelected={handleLocationSelected} />
        <button onClick={handleCloseModal}>关闭</button>
      </BottomSheet>
    </Container>
  )
}
