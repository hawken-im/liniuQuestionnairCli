import * as React from 'react';
import liniuLogo from '../resources/liniuLogo.png';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';

function HeaderBar({progress}: {progress: number}) {
  return (
      <Container maxWidth="xl" sx={{bgcolor: '#fff', p: 0}}>
        <Toolbar>
          <Box
            sx={{
              backgroundImage: `url(${liniuLogo})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '100px',
              height: '100px'
            }} />

          <Box sx={{ flexGrow: 0 }}>
            <Typography variant="h6" noWrap>
              「常态焕新」定制清洁服务
            </Typography>
          </Box>
        </Toolbar>
        <LinearProgress variant="determinate" value={progress} />
      </Container>
  );
}
export default HeaderBar;
