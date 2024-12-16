import { useEffect, useRef, useState } from 'react';
import Taro, { useLoad } from '@tarojs/taro'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import { Box, Button, CssBaseline, Divider, IconButton, InputAdornment, Stack, TextField, Toolbar, Typography } from '@mui/material';
import YardIcon from '@mui/icons-material/Yard';
// import CheckButton, { SmallIconButton, TextButton, CheckButtonWithPic } from '@/components/CustomButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QuestionCard from '@/components/QuestionCard';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import Grid2 from '@mui/material/Grid2';
import { themeCustomized as theme, themeConsts } from '@/components/ThemeWrapper';
import qrCode from '@/resources/qrcode.png';



export default function Index () {
  useLoad(() => {
    console.log('Page loaded.');
  })

  return (
    <Container maxWidth="xl" disableGutters sx={{bgcolor: themeConsts.bgGrey}}>
      <CssBaseline />
      <AppBar 
        position="sticky" 
        sx={{bgcolor: '#fff', mx: 0, px: 0 , width: '100%', zIndex:999}}>

            <Toolbar sx={{alignItems:"center"}}>
              <IconButton onClick={()=>{
                  Taro.navigateTo({url: '/pages/index/index'})
                }}><ArrowBackIcon /></IconButton>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="h6" sx={{fontSize: '20px', fontWeight: 'regular', color: themeConsts.textBlack,ml:-4}}>问卷提交失败</Typography>
              <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
      </AppBar>
      <Box sx={{px: 4, py: 2, mb:1, bgcolor: themeConsts.bgGrey, alignItems: 'center'}}>
        <Typography sx={{fontSize: '18px', fontWeight: 'regular', color: themeConsts.textBlack, textAlign:'center'}}>系统维护中...</Typography>
      </Box>
      <Divider />
      <Box sx={{px: 4, py: 2, bgcolor: themeConsts.bgGrey, mb:{xs: 14, md: 24}}}>
        <Typography sx={{fontSize: '30px', fontWeight: 'medium', color: themeConsts.textBlack, my: 2}}>公司简介</Typography>
        <Typography sx={{fontSize: '18px', fontWeight: 'medium', color: themeConsts.textBlack, mt: 2}}>{`这里是公司简介`}</Typography>
        <Stack direction="row" spacing={0.5} sx={{mt: 1, alignItems:'center'}}>
          <YardIcon sx={{ color: themeConsts.textGrey, fontSize:"18px"}} />
          <Typography sx={{fontSize: '14px', fontWeight: 'regular', color: themeConsts.textGrey, pt:'1px' }}>简介次级文本</Typography>
        </Stack>
      </Box>
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
      >
        <Stack spacing={2} sx={{width: '100%', alignItems: 'center'}}>
          <Stack direction="row" spacing={0.5} sx={{mt: 1, alignItems:'center'}}>
            <QrCodeScannerIcon sx={{ color: themeConsts.textGrey, fontSize:"18px"}} />
            <Typography sx={{fontSize: '14px', fontWeight: 'regular', color: themeConsts.textBlack, pt: '1px'}}> 如有任何问题请扫码联系里牛客服</Typography>
          </Stack>
          <Box sx={{
              backgroundImage: `url(${qrCode})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: {xs:'80px', md:'120px'},
              height: {xs:'80px', md:'120px'},
            }}></Box>
        </Stack>
      </Box>
    </Container>
  )
}
