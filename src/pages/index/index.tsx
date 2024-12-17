import { useEffect, useRef, useState } from 'react';
import { useLoad } from '@tarojs/taro'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import { Box, Button, CssBaseline, Divider, IconButton, InputAdornment, sliderClasses, Stack, TextField, Toolbar, Typography } from '@mui/material';
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

  const [telNum, setTelNum] = useState<String | null>(null);
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<number>(0);
  const [answered, setAnswered] = useState<number>(0);

  const data = {
    userName: name,//用户姓名 string
    userTel: telNum,//用户电话 string
    userGender: gender,//用户性别 number
    placeName: place,//小区名称 string
    placeAddress: address,//小区地址 string
    area: area,//面积 number
    remodelingYear: remodelingYear,//装修年限 index number
    houseStyle: houseStyle,//风格 index number
    hallFloor: hallFloor,//地面铺装 index number
    houseSystem: houseSystem,//全屋系统 index number
  };

  /*
  {
  "userName": "爱坤1",
  "userTel": "666666",
  "userGender": 1,
  "placeName": "小区名称长度为3-100",
  "placeAddress": "小区地址长度为3-100",
  "area": 100,
  "remodelingYear": 5,
  "houseStyle": 1,
  "hallFloor": 1,
  "houseSystem": 1
}
  */

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFailed, setIsFailed] = useState(false); //如果失败就重试，或返回

  const handleSubmit = async (telNum:string, name:string, gender:number) => {
    setIsSubmitting(true);
    console.log("submit");
    console.log("data:", data);
    setTelNum(telNum);
    setName(name);
    setGender(gender);

    try {
      await postData(data);
      // jump to success page
      Taro.navigateTo({ 
        url: '/pages/success/index' 
      });  
    } catch (error) {
      console.error("Error submitting data:", error);
      // jump to error page
      setIsFailed(true);
    } finally {
      setIsSubmitting(false); 
    }
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

  useEffect(() => {
    // 计算已回答的问题数量
    let count = 0;
    if (place !== "选择小区") count++;
    if (area !== null) count++;
    if (remodelingYear !== null) count++;
    if (houseStyle !== null) count++;
    if (hallFloor.size > 0) count++;
    if (houseSystem.size > 0) count++;
    setAnswered(count);
  }), [place, area, remodelingYear, houseStyle, hallFloor, houseSystem];

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 当 answered 等于 NumOfQuestions 时，滚动到页面底部
    if (answered === NumOfQuestions && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [answered]);

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
          {!showModal && <HeaderBar progress={answered/NumOfQuestions*100} />}
      </AppBar>
      <Box sx={{px: 4, py: 2, bgcolor: themeConsts.bgGrey, mb:{xs: 4, md: 8}}}>
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
                setArea( inputValue ? Number(inputValue) : null);
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
                <SmallIconButton onClick={() => {
                  setHallFloor(new Set());
                  }}>
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

      {/* 在 Footer 组件下方添加一个空的 div，并设置 ref 属性 */}
      <div ref={bottomRef}></div> 

      <Footer available={answered >= NumOfQuestions} onSubmit={(telNum: number, name: string, gender: number) => { handleSubmit(String(telNum), name, gender) }} />

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
          <IconButton onClick={handleCloseModal} size='small' sx={{color:themeConsts.primaryBlack, fontSize:'14px'}}><KeyboardArrowDownIcon /></IconButton>
        </Box>
        <LocationPicker2 onPlaceChange={handleCenterChange} />
      </BottomSheet>
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        bgcolor: 'rgba(0,0,0,0.5)',
        display: isSubmitting ? 'flex' : 'none',
        zIndex: 9999,
      }}>
        {
          !isFailed && (
            <Box sx={{
              margin: 'auto',
              padding: '24px',
              bgcolor: '#fff',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <Stack direction={'column'} spacing={2} sx={{alignItems: 'center'}}>
                <Box sx={{mb: 4}}>
                  <img src={require('@/resources/loading.gif')} alt='loading' />
                </Box>
                <Typography variant='h6' sx={{fontSize: '24px', fontWeight: 'medium', color: themeConsts.textBlack, mb: 2}}>提交中...</Typography>
                <Typography variant='body1' sx={{fontSize: '18px', fontWeight: 'regular', color: themeConsts.textBlack}}>请稍后，正在提交您的数据</Typography>
              </Stack>
            </Box>
          )
        }
        {
          isFailed && (
              <Box sx={{
                  margin: 'auto',
                  padding: '24px',
                  bgcolor: '#fff',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                    <Stack direction={'column'} spacing={2} sx={{alignItems: 'center'}}>
                      <Typography variant='body1' sx={{fontSize: '18px', fontWeight: 'regular', color: themeConsts.textBlack, mb: 2}}>提交失败，请重试</Typography>
                      <Button variant="contained" sx={{color:themeConsts.bgWhite, backgroundColor:themeConsts.primaryBlack}} onClick={() => {
                        setIsFailed(false);
                        handleSubmit(String(telNum), name, gender);
                      }
                      }>重试</Button>
                      <Button variant="text" sx={{color:themeConsts.textBlack}} onClick={() => {
                        setIsFailed(false);
                        setIsSubmitting(false);
                        Taro.navigateTo({
                          url: '/pages/failed/index'
                        });
                      }}>取消</Button>
                    </Stack>
               </Box>
          )
        }
        
      </Box>
    </Container>
  )
}
