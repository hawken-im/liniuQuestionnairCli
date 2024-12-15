import { Button, TextField, Typography, Box, Stack, InputAdornment, IconButton, Switch } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { themeConsts } from './ThemeWrapper';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useRef, useState } from 'react';
// import { styled } from '@mui/material';
import { SmallTextButton } from './CustomButton';

// const GenderSwitch = styled(Switch)(({ theme }) => ({
//   '& .MuiSwitch-switchBase.Mui-checked': {
//     color: pink[600],
//     '&:hover': {
//       backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
//     },
//   },
//   '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//     backgroundColor: pink[600],
//   },
// }));

export default function Footer({
  available,
  onSubmit,
  ...rest}: {available: boolean, onSubmit: (telNum:number, name:string, gender:number) => void} & any) {
  const [telNum, setTelNum] = useState<number | null>(null);
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<boolean>(false);
  const [localAvailable, setLocalAvailable] = useState<boolean>(false);

  // const [isTelFocused, setIsTelFocused] = useState<boolean>(false);
  // const [isNameFocused, setIsNameFocused] = useState<boolean>(false);

  const telInputRef = useRef<HTMLInputElement>(null);    
  const handleClearClick = () => {
    setTelNum(null);
    if (telInputRef.current) {
      telInputRef.current.focus(); 
    }
  };

  const nameInputRef = useRef<HTMLInputElement>(null);
  const handleNameClearClick = () => {
    setName('');
    if (nameInputRef.current) {
      nameInputRef.current.focus(); 
    }
  };

  const handleGenderSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.checked);
  }

  useEffect(() => {
    if (telNum && String(telNum).length === 11 && name !== '' && available) {
      setLocalAvailable(true);
    } else {
      setLocalAvailable(false);
    }
  }, [telNum,name]);

  return (
    <Box 
      sx={{ 
        bgcolor: 'background.paper', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        py: 2,
        px: 4, 
        mt: 0,
        mb: 4,
      }}
      {...rest}
    >
      <Stack spacing={2}>
            <Typography sx={{fontSize: '18px', fontWeight: 'medium', color: themeConsts.textBlack}}>联系方式</Typography>
            <Grid2 container spacing={0}>
              <Grid2 size='grow'>
              <TextField
                ref={nameInputRef}
                onChange={(event) => {
                  setName(event.target.value); 
                }}
                id="input-area-name" placeholder='称呼' value={name} type="text"
                color={"info"}
                sx={{'& .MuiInputBase-input': {  //  更具体的 CSS 选择器
                  fontSize: '14px'}
                }}
                slotProps={{
                  input: {
                    endAdornment: ( name !== '' && (
                      <InputAdornment position="end">
                          <IconButton onClick={()=>{
                              handleNameClearClick();
                          }}>
                          <ClearIcon sx={{ color: themeConsts.primaryBlack, fontSize:"20px" }}/>
                        </IconButton>
                      </InputAdornment>
                    )),},
                  }}
                variant="standard"
              />
              </Grid2>
              <Grid2 size='auto'>
                <Stack direction="row" spacing={0}>
                <SmallTextButton checked={!gender} onClick={() => setGender(false)}>女士</SmallTextButton>
                <Switch size='medium' checked={gender} onChange={handleGenderSwitch} color='default'></Switch>
                <SmallTextButton checked={gender} onClick={() => setGender(true)}>先生</SmallTextButton>
                </Stack>
              </Grid2>
            </Grid2>
            <TextField
                ref={telInputRef}
                onChange={(event) => {
                  const inputValue = event.target.value.replace(/[^0-9]/g, ''); // 只保留数字
                  setTelNum(inputValue ? Number(inputValue) : null); 
                }}
                id="input-area" placeholder='输入手机号' value={telNum === null ? '' : telNum} type="tel"
                color={(String(telNum).length === 11) ? "success" : "error"}
                sx={{'& .MuiInputBase-input': {  //  更具体的 CSS 选择器
                  fontSize: '14px'}
                }}
                slotProps={{
                  input: {startAdornment: (
                      <InputAdornment position="start">
                        <PhoneAndroidIcon fontSize='small' sx={{fontSize:'18px'}}/> <Typography fontSize={"14px"}>+86</Typography>
                      </InputAdornment>
                    ),
                    endAdornment: ( telNum && (
                      <InputAdornment position="end">
                        <IconButton onClick={()=>{
                              handleClearClick();
                            }}>
                          <ClearIcon sx={{ color: themeConsts.primaryBlack, fontSize:"20px" }}/>
                        </IconButton>
                      </InputAdornment>
                    )),},
                  }}
                variant="standard"
              />
              <Button disabled={!localAvailable} variant="contained" onClick={()=>{onSubmit(telNum, name, Number(gender))}} sx={{
                color: localAvailable ? themeConsts.bgWhite : themeConsts.checkBtnBg,
                backgroundColor: localAvailable ? themeConsts.primaryBlack : themeConsts.borderGrey,
                }}>提交报名</Button>
              <Typography sx={{fontSize:"16px", 
                color: localAvailable ? themeConsts.textBlack : themeConsts.textGrey, 
                textAlign:"center",
                my:1}}>{localAvailable? "完成并提交报名信息" : "请先完善报名信息"}</Typography>
          </Stack>
    </Box>
  );
}

    // <Box sx={{ bgcolor: 'background.paper', p: 6, display:"flex", justifyContent:"center", mt:'auto' }}>
    //   <TextField>称呼</TextField>
    //   <TextField>先生？女士？</TextField>
    //     <Button variant='contained'>提交报名</Button>
    // </Box>