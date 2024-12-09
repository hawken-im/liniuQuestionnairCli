import { useEffect, useState } from 'react';
import { useLoad } from '@tarojs/taro'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import { Box, Button, CssBaseline, InputAdornment, Stack, TextField, Toolbar, Typography } from '@mui/material';
import HeaderBar from '../../components/HeaderBar';
import CheckButton from '@/components/CheckButton';
import CheckButtonWithPic from '@/components/CheckButtonWithPic';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
import LocationPicker2 from '@/components/LocationPicker2';
import BottomSheet from '@/components/BottomSheet';
import QuestionCard from '@/components/QuestionCard';
import Grid2 from '@mui/material/Grid2';


const NumOfQuestions = 5;//这个问卷有多少个问题
//const HouseModelChoices = ["跃层", "一楼或顶楼带花园", "别墅"];
const RemodelingYearChoices = ["2 年（含）以内", "2 - 5 年", "5 - 8 年", "8 年以上"];
const HouseStyleChoices = ["简约轻奢", "传统中式", "欧美复古", "古典欧式", "其它风格"];
const HallFloorChoices = ["瓷砖", "大理石", "复合地板", "实木地板", "其他"];
//注意最后在提交的时候对应选项提交完整的string

export default function Index () {
  const [showModal, setShowModal] = useState(false);
  const [showTelModal, setShowTelModal] = useState(false);

  const [place, setPlace] = useState("选择楼盘");//1
  const [area, setArea] = useState<number | null>(null);//2
  const [addArea, setAddArea] = useState<number | null>(null);//2
  const [remodelingYear, setRemodelingYear] = useState<number | null>(null);//3
  const [houseStyle, setHouseStyle] = useState<number | null>(null);//4
  const [hallFloor, setHallFloor] = useState<number | null>(null);//5

  const [answered, setAnswered] = useState("");

  const handleCenterChange = (name:string, address:string) => {
    setPlace(`${name}`);
  };
  
  const handleRemodelingYearCheck = (index: number) => {
    setRemodelingYear(index);
  };

  const handleHouseStyleCheck = (index: number) => {
    setHouseStyle(index);
  };

  const handleHallFloorCheck = (index: number) => {
    setHallFloor(index);
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenTelModal = () => setShowTelModal(true);
  const handleCloseTelModal = () => setShowTelModal(false);

  useEffect(()=>{

    function progressCheck() {
      let answered ="";
      if (place !== "选择楼盘"){answered+='A';};
      if (area !== null){answered+='A';}
        else{answered+='N';};
      if (remodelingYear !== null){answered+='A';} 
      if (houseStyle !== null){answered+='A';}
      if (hallFloor !== null){answered+='A';}
      setAnswered(answered);
    }
    progressCheck();
  
  },[place,area,remodelingYear,houseStyle,hallFloor])

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <Container maxWidth="xl" disableGutters sx={{bgcolor: '#f3f3f3'}}>
      <CssBaseline />
      <AppBar 
        position="sticky" 
        sx={{bgcolor: '#fff', mx: 0, px: 0 , width: '100%', zIndex:999}}>
          {showModal && (
            <Toolbar onClick={handleCloseModal} sx={{alignItems:"center"}}>
              <Button variant="text" startIcon={<ArrowBackIcon />} onClick={handleCloseModal}></Button>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="h6" sx={{fontSize: '20px', fontWeight: 'regular', color: '#292929',ml:-4}}>选择楼盘</Typography>
              <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
            )}
          {!showModal && <HeaderBar progress={((answered.match(/A/g) || []).length)/NumOfQuestions*100} />}
      </AppBar>
      <Box sx={{px: 4, py: 2, bgcolor: '#f3f3f3', mb:10}}>
        <Typography variant="h6" sx={{fontSize: '20px', fontWeight: 'regular', color: '#292929', mt: 2}}>完善报名信息，</Typography>
        <Typography variant="h6" sx={{fontSize: '19px', fontWeight: 'regular', color: '#292929', mt: 2}}>即可有机会成为里牛清洁定制体验官!</Typography>
        <QuestionCard number={1}>
          <Grid2 container spacing={1} alignItems={"center"}>
            <Grid2 size="auto">
              <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}>房屋坐落于</Typography>
            </Grid2>
            <Grid2 size={place.length > 6 ? 12 : "grow"}>
              <CheckButton
                checked={place !== "选择楼盘"}
                onClick={handleOpenModal}
                startIcon={<LocationOnIcon color="primary" sx={{fontSize:"24px"}} />}
              >
                {place.length > 11 ? place.slice(0, 9) + "..." : place}
              </CheckButton>
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
            <Grid2 size="auto">
              <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}>{`搭建面积约为`}</Typography>
            </Grid2>
            <Grid2 size={7}>
            <TextField
              //onFocus={}
              onChange={(event) => {
                const inputValue = event.target.value.replace(/[^0-9]/g, ''); // 只保留数字
                setAddArea(inputValue ? Number(inputValue) : null); 
              }}
              id="input-area" placeholder='输入整数' value={addArea === null ? '' : addArea} size="small" type="tel"
              sx={{'& .MuiInputBase-input': {  //  更具体的 CSS 选择器
                fontSize: '18px'}
              }}
              slotProps={{
                input: {endAdornment: (
                    <InputAdornment position="end">
                      <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}>{addArea===null ? "无搭建":"平方米"}</Typography>
                    </InputAdornment>
                  ),},
                }}
              variant="outlined"
            />
            </Grid2>
          </Grid2>
          </Stack>
        </QuestionCard>
        <QuestionCard number={3}>
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

        <QuestionCard number={4}>
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

        <QuestionCard number={5}>
          <Stack spacing={2}>
          <Grid2 container spacing={1} alignItems={"center"}>
            <Grid2 size="grow">
              <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: '#292929'}}>{`客厅地面铺装为：`}</Typography>
            </Grid2>
          </Grid2>
          <Grid2 container spacing={2} alignItems={"center"}>
              {HallFloorChoices.map((choice, index) => (
                <Grid2 key={index} size="auto">
                  <CheckButton checked={index===hallFloor} onClick={()=>{
                    handleHallFloorCheck(index);
                  }}>
                    {choice}
                  </CheckButton>
                </Grid2>
              ))}
          </Grid2>
          </Stack>
        </QuestionCard>
      </Box>
      { (!place || !area) && (
        <Box 
          sx={{ 
            bgcolor: 'background.paper', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center',
            p: 3, // 添加 padding
            mb: 4,
          }}
        >
          <Button disabled variant="contained" onClick={handleOpenTelModal}>报名清洁定制体验官</Button>
          <Typography sx={{fontSize:"16px", color:"#828282", my:1}}>请先完善报名信息</Typography>
        </Box>
      )}

      <BottomSheet show={showModal} onClose={handleCloseModal}>
        { place !== "选择楼盘" && (
          <Button variant="contained" size='small'
            sx={{position:"fixed", top:"32px", right:"24px", zIndex:"99999"}}
            onClick={handleCloseModal}>
              完成
          </Button>
        )}
        <Box sx={{display:"flex", flexDirection:"row", height:"24px"}}>
          <Box sx={{flexGrow: 1}} />
          <Button variant="text" size='small' endIcon={<ClearIcon />} onClick={handleCloseModal}></Button>
        </Box>
        <LocationPicker2 onPlaceChange={handleCenterChange} />
      </BottomSheet>
      <BottomSheet show={showTelModal} onClose={handleCloseTelModal}>
        <button onClick={handleCloseTelModal}>关闭</button>
        <Typography>Hello</Typography>
      </BottomSheet>
      {
        place && area && (
          <Box 
            sx={{ 
              bgcolor: 'background.paper', 
              display: 'flex', 
              justifyContent: 'center', 
              position: 'fixed', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              p: 3, // 添加 padding
              zIndex: 10, // 添加 z-index
            }}
          >
          <Button variant="contained" onClick={handleOpenTelModal}>报名清洁定制体验官</Button>
        </Box>
        )
      }
    </Container>
  )
}
