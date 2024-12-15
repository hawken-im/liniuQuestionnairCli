import { useEffect, useRef, useState } from 'react';
import { useLoad } from '@tarojs/taro'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import { Box, Button, CssBaseline, Divider, InputAdornment, Stack, TextField, Toolbar, Typography } from '@mui/material';
import HeaderBar from '../../components/HeaderBar';
import CheckButton, { SmallIconButton, TextButton, CheckButtonWithPic } from '@/components/CustomButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationPicker2 from '@/components/LocationPicker2';
import BottomSheet from '@/components/BottomSheet';
import QuestionCard from '@/components/QuestionCard';
import Grid2 from '@mui/material/Grid2';
import { themeCustomized as theme, themeConsts } from '@/components/ThemeWrapper';
import Footer from '@/components/Footer';
import Taro from '@tarojs/taro';

import { postData } from '@/utils/apiServices';

const NumOfQuestions = 6;//这个问卷有多少个问题
//const HouseModelChoices = ["跃层", "一楼或顶楼带花园", "别墅"];
const RemodelingYearChoices = ["2 年以内", "2 - 5 年", "5 - 8 年", "8 年以上"];
//const HouseStyleChoices = ["简约轻奢", "传统中式", "欧美复古", "古典欧式", "其它风格"];
const HouseStyleChoices = ["简约轻奢", "传统中式", "欧美复古", "古典欧式"];
const HallFloorChoices = ["大理石", "瓷砖", "地毯", "实木地板", "复合地板"];
const HouseSystemChoices = ["新风", "全屋软水"];
//注意最后在提交的时候对应选项提交完整的string

/*
{
"user":{
name: 大伯四
tel: 13000000000
gender: 0/1
}
  "place": {
    "name": "小区名称",
    "address": "小区地址"
  },
  "area": "产权面积",
  "remodelingYear": "装修年限",
  "houseStyle": "装修风格",
  "hallFloor": "客厅地面",
  "houseSystem": "全屋系统"
}
*/

export default function Index () {
  const [showModal, setShowModal] = useState(false);

  const [place, setPlace] = useState("选择小区");//1
  const [address, setAddress] = useState("");//1
  const [area, setArea] = useState<number | null>(null);//2
  // const [addArea, setAddArea] = useState<number | null>(null);//2
  const [remodelingYear, setRemodelingYear] = useState<number | null>(null);//3
  const [houseStyle, setHouseStyle] = useState<number | null>(null);//4
  //const [hallFloor, setHallFloor] = useState<number | null>(null);//5
  const [hallFloor, setHallFloor] = useState<Set<number>>(new Set());//5
  const [houseSystem, setHouseSystem] = useState<Set<number>>(new Set());//6

  const [telNum, setTelNum] = useState<number | null>(null);
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<number>(0);

  const [answered, setAnswered] = useState("");

  const data = {
    userName: name,
    userTel: telNum,
    userGender: gender,
    placeName: place,
    placeAddress: address,
    area: area,
    remodelingYear: remodelingYear,
    houseStyle: houseStyle,
    hallFloor: hallFloor,
    houseSystem: houseSystem,
  };

  const handleSubmit = (telNum:number, name:string, gender:number) => {
    console.log("submit");
    console.log("place:", place);
    console.log("area:", area);
    console.log("remodelingYear:", remodelingYear);
    console.log("houseStyle:", houseStyle);
    console.log("hallFloor:", hallFloor);
    console.log("houseSystem:", houseSystem);
    setTelNum(telNum);
    setName(name);
    setGender(gender);
    postData(data);
    //jump to success page
    Taro.redirectTo({
      url: '/pages/success/index'
    });
  }


  const handleCenterChange = (name:string, address:string) => {
    setPlace(`${name}`);
    setAddress(`${address}`);
  };
  
  const handleRemodelingYearCheck = (index: number) => {
    setRemodelingYear(index);
  };

  const handleHouseStyleCheck = (index: number) => {
    setHouseStyle(index);
  };

  const handleHallFloorCheck = (index: number) => {
    // 修改 handleHallFloorCheck 函数，使用 Set 来存储选中的选项
    setHallFloor(prev => {
      const newSet = new Set(prev); // 复制之前的 Set
      if (newSet.has(index)) { 
        newSet.delete(index); // 如果已选中，则取消选中
      } else {
        newSet.add(index); // 否则，选中该选项
      }
      return newSet; // 返回新的 Set
    });
  };

  const handleHouseSystemCheck = (index: number) => {
    setHouseSystem(prev => {
      const newSet = new Set(prev);
      if (index === HouseSystemChoices.length) {
        newSet.clear();
        newSet.add(index);
      } else {
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
          newSet.delete(HouseSystemChoices.length);
        }
      }
      return newSet;
    });
  }

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(()=>{

    function progressCheck() {
      let answered ="";
      if (place !== "选择小区"){answered+='A';};
      if (area !== null){answered+='A';}
        else{answered+='N';};
      if (remodelingYear !== null){answered+='A';} 
      if (houseStyle !== null){answered+='A';}
      if (hallFloor.size>0){answered+='A';}
      if (houseSystem.size>0){answered+='A';}
      setAnswered(answered);
    }
    progressCheck();
  
  },[place,area,remodelingYear,houseStyle,hallFloor,houseSystem]);

  useLoad(() => {
    console.log('Page loaded.');
  })

  return (
    <Container maxWidth="xl" disableGutters sx={{bgcolor: themeConsts.bgGrey}}>
      <CssBaseline />
      <AppBar 
        position="sticky" 
        sx={{bgcolor: '#fff', mx: 0, px: 0 , width: '100%', zIndex:999}}>
          {showModal && (
            <Toolbar onClick={handleCloseModal} sx={{alignItems:"center"}}>
              <Button variant="text" startIcon={<ArrowBackIcon />} onClick={handleCloseModal} />
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="h6" sx={{fontSize: '20px', fontWeight: 'regular', color: themeConsts.textBlack,ml:-4}}>选择小区</Typography>
              <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
            )}
          {!showModal && <HeaderBar progress={((answered.match(/A/g) || []).length)/NumOfQuestions*100} />}
      </AppBar>
      <Box sx={{px: 4, py: 2, bgcolor: themeConsts.bgGrey, mb:{xs: 8, md: 12}}}>
        <Typography sx={{fontSize: '30px', fontWeight: 'medium', color: themeConsts.textBlack, my: 2}}>开启体验</Typography>
        <Typography sx={{fontSize: '18px', fontWeight: 'medium', color: themeConsts.textBlack, mt: 2}}>{`定制问卷 (Part 1)`}</Typography>
        <Stack direction="row" spacing={0.5} sx={{mt: 1, alignItems:'center'}}>
          <AccessTimeIcon sx={{ color: themeConsts.textGrey, fontSize:"18px"}} />
          <Typography sx={{fontSize: '14px', fontWeight: 'regular', color: themeConsts.textGrey, pt:'1px' }}>预计用时 1-2 分钟</Typography>
        </Stack>
        <QuestionCard number={1}>
          <Grid2 container spacing={1} alignItems={"center"}>
            <Grid2 size="auto">
              <Typography sx={{fontSize: '16px', fontWeight: 'regular', color: themeConsts.textBlack}}>家宅位置</Typography>
            </Grid2>
            <Grid2 size={place.length > 6 ? 12 : "grow"}>
              <TextButton
                checked={place !== "选择小区"}
                onClick={handleOpenModal}
                startIcon={<LocationOnIcon sx={{ color: theme.palette.primary.main, fontSize:"24px" }} />}
              >
                {place.length > 11 ? place.slice(0, 9) + "..." : place}
              </TextButton>
            </Grid2>
          </Grid2>
        </QuestionCard>
        <QuestionCard number={2}>
          <Grid2 container spacing={1} alignItems={"center"}>
            <Grid2 size="auto">
              <Typography sx={{fontSize: '16px', fontWeight: 'regular', color: themeConsts.textBlack}}>{`产权面积`}</Typography>
            </Grid2>
            <Grid2 size={7}>
            <TextField
              //onFocus={}
              onChange={(event) => {
                const inputValue = event.target.value.replace(/[^0-9]/g, ''); // 只保留数字
                setArea(inputValue ? Number(inputValue) : null); 
              }}
              id="input-area" placeholder='输入整数' value={area === null ? '' : area} size="small" type="tel"
              sx={{
                '& .MuiInputBase-input': {  //  更具体的 CSS 选择器
                fontSize: '16px',},
                '& fieldset': { 
                  borderRadius: 4,}
              }}
              slotProps={{
                input: {endAdornment: (
                    <InputAdornment position="end">
                      <Typography sx={{fontSize: '16px', fontWeight: 'regular', color: themeConsts.textBlack}}>平方米</Typography>
                    </InputAdornment>
                  ),},
                }}
              variant="outlined"
            />
            </Grid2>
          </Grid2>
        </QuestionCard>
        <QuestionCard number={3}>
          <Stack spacing={2}>
          <Grid2 container spacing={1} alignItems={"center"}>
            <Grid2 size="grow">
              <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: themeConsts.textBlack}}>{`装修已入住时间`}</Typography>
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
              <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: themeConsts.textBlack}}>{`请选择与贵府家装风格类似的图片：`}</Typography>
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
          {
            hallFloor.size > 1 && (
              <Box sx={{position:"absolute", top:"10px", right:"10px"}}>
                <SmallIconButton onClick={() => setHallFloor(new Set())}>
                    <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: themeConsts.textBlack}}>{`× `}</Typography>
                    清除选择
                </SmallIconButton>
              </Box>
            )
          }
          <Stack spacing={2}>
          <Grid2 container spacing={1} alignItems={"center"}>
            <Grid2 size="grow">
              <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: themeConsts.textBlack}}>{`客厅地面铺装（可多选）`}</Typography>
            </Grid2>
          </Grid2>
          <Grid2 container spacing={2} alignItems={"center"}>
              {HallFloorChoices.map((choice, index) => (
                <Grid2 key={index} size="auto">
                  <CheckButton checked={hallFloor.has(index)} onClick={()=>{
                    handleHallFloorCheck(index);
                  }}>
                    {choice}
                  </CheckButton>
                </Grid2>
              ))}
          </Grid2>
          </Stack>
        </QuestionCard>

        <QuestionCard number={6}>
          <Stack spacing={2}>
            <Grid2 container spacing={1} alignItems={"center"}>
              <Grid2 size="grow">
                <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: themeConsts.textBlack}}>{`全屋系统（可多选）`}</Typography>
              </Grid2>
            </Grid2>
            <Grid2 container spacing={2} alignItems={"center"}>
                {HouseSystemChoices.map((choice, index) => (
                  <Grid2 key={index} size="auto">
                    <CheckButton checked={houseSystem.has(index)} onClick={()=>{
                      handleHouseSystemCheck(index);
                    }}>
                      {choice}
                    </CheckButton>
                  </Grid2>
                ))}
            </Grid2>
            <Divider variant="middle" />
            <Grid2 container spacing={1} alignItems={"center"} justifyContent={"center"}>
              <CheckButton checked={houseSystem.has(HouseSystemChoices.length)} onClick={()=>{
                handleHouseSystemCheck(HouseSystemChoices.length);
              }}>以上均无</CheckButton>
            </Grid2>
          </Stack>
        </QuestionCard>
      </Box>

      <Footer available={true} onSubmit={(telNum: number, name: string, gender: number) => { handleSubmit(telNum, name, gender) }} />

      <BottomSheet show={showModal} onClose={handleCloseModal}>
        { place !== "选择小区" && (
          <Button variant="contained" size='small'
            sx={{position:"fixed", top:"32px", right:"24px", zIndex:"99999"}}
            onClick={handleCloseModal}>
              完成
          </Button>
        )}
        <Box sx={{display:"flex", flexDirection:"row", height:"24px"}}>
          <Box sx={{flexGrow: 1}} />
          <Button variant="text" size="medium" endIcon={<KeyboardArrowDownIcon fontSize='medium' />} onClick={handleCloseModal}></Button>
        </Box>
        <LocationPicker2 onPlaceChange={handleCenterChange} />
      </BottomSheet>
    </Container>
  )
}
