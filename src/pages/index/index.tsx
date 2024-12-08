import { useEffect, useState } from 'react';
import { useLoad } from '@tarojs/taro'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import { Box, Button, Card, CardContent, CssBaseline, FormControl, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import HeaderBar from '../../components/HeaderBar';
import MapContainer from '@/components/MapContainer';
import CheckButton from '@/components/CheckButton';
import CheckButtonWithPic from '@/components/CheckButtonWithPic';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClearIcon from '@mui/icons-material/Clear';
import LocationPicker2 from '@/components/LocationPicker2';
import BottomSheet from '@/components/BottomSheet';
import QuestionCard from '@/components/QuestionCard';
import Grid2 from '@mui/material/Grid2';


const NumOfQuestions = 9;//这个问卷有多少个问题
const HouseModelChoices = ["跃层", "一楼或顶楼带花园", "别墅"];
const RemodelingYearChoices = ["2 年（含）以内", "2 - 5 年", "5 - 8 年", "8 年以上"];
const HouseStyleChoices = ["简约轻奢", "传统中式", "欧美复古", "古典欧式", "其它风格"];
const HallFloorChoices = ["瓷砖", "大理石", "复合地板", "实木地板", "地毯", "其他"];
//注意最后在提交的时候对应选项提交完整的string

export default function Index () {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  //const [mapCenter, setMapCenter] = useState([116.397428, 39.90923]);

  const [place, setPlace] = useState("选择楼盘");//1
  const [area, setArea] = useState<number | null>(null);//2
  const [houseModelCheck, setHouseModelCheck] = useState<boolean[]>([]);//2
  const [familyMember, setFamilyMember] = useState<(number | null)[]| null>(null);//3
  const [remodelingYear, setRemodelingYear] = useState<number | null>(null);//4
  const [houseStyle, setHouseStyle] = useState<number | null>(null);//5

  const [answered, setAnswered] = useState("");

  const handleCenterChange = (name:string, address:string) => {
    setPlace(`${name}`);
  };
  
  const handleHouseModelCheck = (index: number) => {
    const checked = [...houseModelCheck];
    checked[index] = !checked[index];
    setHouseModelCheck(checked);
  }

  const handleRemodelingYearCheck = (index: number) => {
    setRemodelingYear(index);
  };

  const handleHouseStyleCheck = (index: number) => {
    setHouseStyle(index);
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(()=>{

    function progressCheck() {
      let answered ="";
      if (place !== "选择楼盘"){answered+='A';};
      if (area !== null){answered+='A';}
        else{answered+='N';};
      if (familyMember !== null && familyMember[0] !== null){answered+='A';} 
        else{answered+='N';};
      if (remodelingYear !== null){answered+='A';} 
      setAnswered(answered);
    }
    progressCheck();
  
  },[place,area,familyMember])

  useEffect(()=>{
    function houseModelToIndex() {
      const checked = HouseModelChoices.map(() => false); 
      setHouseModelCheck(checked);
    }
    houseModelToIndex();
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
      <Box sx={{height: '60px'}}>{answered} + {area}</Box>
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
              <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}>{`家庭常驻`}</Typography>
            </Grid2>
            <Grid2 size={7}>
            <TextField
              //onFocus={}
              onChange={(event) => {
                const inputValue = event.target.value.replace(/[^0-9]/g, ''); // 只保留数字
                setFamilyMember([inputValue ? Number(inputValue) : null , familyMember && familyMember[1]]);
              }}
              id="input-area" placeholder='输入整数' value={familyMember && familyMember[0] === null ? '' : familyMember && familyMember[0]} size="small" type="tel"
              sx={{'& .MuiInputBase-input': {  //  更具体的 CSS 选择器
                fontSize: '18px'}
              }}
              slotProps={{
                input: {endAdornment: (
                    <InputAdornment position="end">
                      <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}>人</Typography>
                    </InputAdornment>
                  ),},
                }}
              variant="outlined"
            />
            </Grid2>
          </Grid2>
          {familyMember !== null && familyMember[0] !== null && Number(familyMember[0]) > 1 &&(
            <Grid2 container spacing={1} alignItems={"center"}>
              <Grid2 size="auto">
                <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}>{`其中学龄前儿童`}</Typography>
              </Grid2>
              <Grid2 size="auto">
                <FormControl sx={{minWidth:'80px'}}>
                  <Select
                    onChange={(event) => {
                      setFamilyMember([familyMember && familyMember[0], Number(event.target.value)]);
                    }}
                    defaultValue={0}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    size='small'
                    sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}
                    >
                    <MenuItem value={0}>
                      <em>没有</em>
                    </MenuItem>
                    {Array.from({ length: familyMember[0]-1 }, (_, i) => (
                      <MenuItem key={i} value={i+1}>{i+1}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid2>
              {familyMember[1] !== null && Number(familyMember[1])>0 &&(
                <Grid2 size="auto">
                  <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}>人</Typography>
                </Grid2>
                )}
            </Grid2>
          )}
          </Stack>
        </QuestionCard>

        <Typography variant="h6" sx={{fontSize: '24px', fontWeight: 'regular', color: '#292929', mt: 2}}>基本信息</Typography>

        <QuestionCard number={4}>
          <Stack spacing={2}>
          <Grid2 container spacing={1} alignItems={"center"}>
            <Grid2 size="grow">
              <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}>{`最近一次装修是在：`}</Typography>
            </Grid2>
          </Grid2>
          <Grid2 container spacing={2} alignItems={"center"}>
              {RemodelingYearChoices.map((choice, index) => (
                <Grid2 key={index} size="auto">
                  <CheckButton checked={index===remodelingYear} onClick={()=>{
                    handleRemodelingYearCheck(index);
                  }}>
                    {choice}
                  </CheckButton>
                </Grid2>
              ))}
          </Grid2>
          </Stack>
        </QuestionCard>

        <QuestionCard number={5}>
          <Stack spacing={2}>
          <Grid2 container spacing={1} alignItems={"center"}>
            <Grid2 size="grow">
              <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}>{`请选择符合贵府家装风格的图片：`}</Typography>
            </Grid2>
          </Grid2>
          <Grid2 container spacing={2} alignItems={"center"}>
              {HouseStyleChoices.map((choice, index) => (
                <Grid2 key={index} size="auto">
                  <CheckButtonWithPic checked={index===houseStyle} bg={index} onClick={()=>{
                    handleHouseStyleCheck(index);
                  }}>
                    {choice}
                    {index === 4 && <Typography sx={{fontSize: '14px', fontWeight: 'regular', color: '#fff', mb:1}}>和风、工业风...</Typography>}
                  </CheckButtonWithPic>
                </Grid2>
              ))}
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
