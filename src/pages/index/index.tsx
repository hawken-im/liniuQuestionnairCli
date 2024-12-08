import { useEffect, useState } from 'react';
import { useLoad } from '@tarojs/taro'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import { Box, Button, Card, CardContent, CssBaseline, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import HeaderBar from '../../components/HeaderBar';
import MapContainer from '@/components/MapContainer';
import CheckButton from '@/components/CheckButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClearIcon from '@mui/icons-material/Clear';
import LocationPicker2 from '@/components/LocationPicker2';
import BottomSheet from '@/components/BottomSheet';
import QuestionCard from '@/components/QuestionCard';
import Grid2 from '@mui/material/Grid2';


const NumOfQuestions = 9;//这个问卷有多少个问题
const HouseModelChoices = ["跃层", "一楼或顶楼带花园", "别墅"];

export default function Index () {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  //const [mapCenter, setMapCenter] = useState([116.397428, 39.90923]);

  const [place, setPlace] = useState("选择楼盘");//1
  const [area, setArea] = useState<number | null>(null);//2
  const [houseModelCheck, setHouseModelCheck] = useState<boolean[]>([]);//2
  const [familyMember, setFamilyMember] = useState<number[] | null>(null);//3

  const [answered, setAnswered] = useState("");

  const handleCenterChange = (name:string, address:string) => {
    setPlace(`${name}`);
  };
  
  const handleHouseModelCheck = (index: number) => {
    const checked = [...houseModelCheck];
    checked[index] = !checked[index];
    setHouseModelCheck(checked);
  }

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(()=>{
    function houseModelToIndex() {
      const checked = HouseModelChoices.map(() => false); 
      setHouseModelCheck(checked);
    }

    houseModelToIndex();

    function replaceCharAt(str, P) {
      if (P < 0 || P >= str.length) {
        return "位置超出字符串范围"; 
      }
      return str.substring(0, P) + 'A' + str.substring(P + 1);
    }

    if (place !== "选择楼盘"){setAnswered(replaceCharAt(answered, 0))};
    if (area !== null){setAnswered(replaceCharAt(answered, 1))};
 
  },[place,area])

  useEffect(()=>{
    setAnswered("N".repeat(NumOfQuestions));
  },[])

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <Container maxWidth="xl" disableGutters sx={{bgcolor: '#f3f3f3'}}>
      <CssBaseline />
      <AppBar 
        position="sticky" 
        sx={{bgcolor: '#fff', mx: 0, px: 0 , width: '100%'}}>
        <HeaderBar progress={((answered.match(/A/g) || []).length)/NumOfQuestions*100} />
      </AppBar>
      <Box sx={{px: 4, py: 2, bgcolor: '#f3f3f3'}}>
        <Typography variant="h6" sx={{fontSize: '24px', fontWeight: 'regular', color: '#292929', mt: 2}}>基本信息</Typography>
        <QuestionCard number={1}>
          <Grid2 container spacing={1} alignItems={"center"}>
            <Grid2>
              <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}>房屋坐落于</Typography>
            </Grid2>
            <Grid2 size={8}>
            <TextField
              onFocus={handleOpenModal}
              id="input-place" defaultValue={place} value={place} size="small"
              sx={{'& .MuiInputBase-input': {  //  更具体的 CSS 选择器
                fontSize: '18px'
                }
              }}
              slotProps={{
                input: {startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="primary" sx={{fontSize:"24px"}} />
                    </InputAdornment>
                  ),},
                }}
              variant="outlined"
            />
            </Grid2>
          </Grid2>
        </QuestionCard>
        <QuestionCard number={2}>
          <Stack spacing={2}>
          <Grid2 container spacing={1} alignItems={"center"}>
            <Grid2 size="auto">
              <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}>{`建筑面积约为`}</Typography>
            </Grid2>
            <Grid2 size={7}>
            <TextField
              //onFocus={}
              onChange={(event) => {
                const inputValue = event.target.value.replace(/[^0-9]/g, ''); // 只保留数字
                setArea(inputValue ? Number(inputValue) : null); 
              }}
              id="input-area" placeholder='输入整数' value={area === null ? '' : area} size="small" type="tel"
              sx={{'& .MuiInputBase-input': {  //  更具体的 CSS 选择器
                fontSize: '18px'}
              }}
              slotProps={{
                input: {endAdornment: (
                    <InputAdornment position="end">
                      <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}>平方米</Typography>
                    </InputAdornment>
                  ),},
                }}
              variant="outlined"
            />
            </Grid2>
          </Grid2>
          <Grid2 container spacing={1} alignItems={"center"}>
            <Grid2 size="grow">
              <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}>{`房屋是否为(可多选)`}</Typography>
            </Grid2>
            <Grid2 size="auto">
              <Button
                onClick={() => {
                  setHouseModelCheck(HouseModelChoices.map(() => false));
                }}
                variant="outlined" color="inherit" size='small' startIcon={<ClearIcon sx={{fontSize:'14px'}} />} 
                sx={{fontSize: '14px', fontWeight: 'regular', color: '#4d7261', borderRadius:'20px'}}>
                  清除选项
              </Button>
            </Grid2>
          </Grid2>
          <Grid2 container spacing={2} alignItems={"center"}>
              {HouseModelChoices.map((choice, index) => (
                <Grid2 key={index} size="auto">
                  <CheckButton checked={houseModelCheck[index]} onClick={()=>{
                    handleHouseModelCheck(index)
                  }}>
                    {choice}
                  </CheckButton>
                </Grid2>
              ))}
          </Grid2>

          </Stack>
        </QuestionCard>

        <QuestionCard number={3}>
          <Stack spacing={2}>
          <Grid2 container spacing={1} alignItems={"center"}>
            <Grid2 size="auto">
              <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}>{`建筑面积约为`}</Typography>
            </Grid2>
            <Grid2 size={7}>
            <TextField
              //onFocus={}
              onChange={(event) => {
                const inputValue = event.target.value.replace(/[^0-9]/g, ''); // 只保留数字
                setArea(inputValue ? Number(inputValue) : null); 
              }}
              id="input-area" placeholder='输入整数' value={area === null ? '' : area} size="small" type="tel"
              sx={{'& .MuiInputBase-input': {  //  更具体的 CSS 选择器
                fontSize: '18px'}
              }}
              slotProps={{
                input: {endAdornment: (
                    <InputAdornment position="end">
                      <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}>平方米</Typography>
                    </InputAdornment>
                  ),},
                }}
              variant="outlined"
            />
            </Grid2>
          </Grid2>
          </Stack>
        </QuestionCard>

      <Card sx={{width: '100%', height: '800px', bgcolor: '#fff', mb: 2}}>
          <CardContent>
            <Typography variant="h6" sx={{fontSize: '24px', fontWeight: 'regular', color: '#292929'}}>hello</Typography>
            <Typography variant="h6" sx={{fontSize: '24px', fontWeight: 'regular', color: '#292929'}}>{place}</Typography>
            <div id="location-info">
              {selectedLocation ? (
                <div>
                  <p>您选择了: {(selectedLocation as any).name}</p>
                  <p>地址: {(selectedLocation as any).address}</p>
                  <p>坐标: {(selectedLocation as any).location}</p>
                </div>
              ) : (
                <p>请选择地址  完成</p>
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
        <button onClick={handleCloseModal}>关闭</button>
        <LocationPicker2 onPlaceChange={handleCenterChange} />
        <button onClick={handleCloseModal}>关闭</button>
      </BottomSheet>
    </Container>
  )
}
