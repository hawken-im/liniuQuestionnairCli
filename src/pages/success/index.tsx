import { useEffect, useRef, useState } from 'react';
import { useLoad } from '@tarojs/taro'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import { Box, Button, CssBaseline, Divider, IconButton, InputAdornment, Stack, TextField, Toolbar, Typography } from '@mui/material';
import HeaderBar from '@/components/HeaderBar';
import CheckButton, { SmallIconButton, TextButton, CheckButtonWithPic } from '@/components/CustomButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AccessTimeIcon from '@mui/icons-material/AccessTime';

import QuestionCard from '@/components/QuestionCard';
import Grid2 from '@mui/material/Grid2';
import { themeCustomized as theme, themeConsts } from '@/components/ThemeWrapper';



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
              <Button variant="text" startIcon={<ArrowBackIcon />}></Button>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="h6" sx={{fontSize: '20px', fontWeight: 'regular', color: themeConsts.textBlack,ml:-4}}>选择小区</Typography>
              <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
        
      </AppBar>
      <Box sx={{px: 4, py: 2, bgcolor: themeConsts.bgGrey, mb:{xs: 14, md: 24}}}>
        <Typography sx={{fontSize: '30px', fontWeight: 'medium', color: themeConsts.textBlack, my: 2}}>开启体验</Typography>
        <Typography sx={{fontSize: '18px', fontWeight: 'medium', color: themeConsts.textBlack, mt: 2}}>{`定制问卷 (Part 1)`}</Typography>
        <Stack direction="row" spacing={0.5} sx={{mt: 1, alignItems:'center'}}>
          <AccessTimeIcon sx={{ color: themeConsts.textGrey, fontSize:"18px"}} />
          <Typography sx={{fontSize: '14px', fontWeight: 'regular', color: themeConsts.textGrey, pt:'1px' }}>预计用时 1-2 分钟</Typography>
        </Stack>
        <QuestionCard number={1}>
            清洁顾问将在 2 小时内来电。

            如有任何问题请扫码或致电联系里牛客服。
        </QuestionCard>
      </Box>
    </Container>
  )
}
