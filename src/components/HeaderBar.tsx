import liniuLogo from '@/resources/liniuLogo.png';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { themeConsts } from './ThemeWrapper';
import { Stack } from '@mui/material';

//import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
// import { styled } from '@mui/material';
// import { blue } from '@mui/material/colors';

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 2,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor: theme.palette.grey[200],
//     ...theme.applyStyles('dark', {
//       backgroundColor: theme.palette.grey[200],
//     }),
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     backgroundColor: blue[500],
//     ...theme.applyStyles('dark', {
//       backgroundColor: blue[500],
//     }),
//   },
// }));

function HeaderBar({progress}: {progress: number}) {

  return (
      <Container maxWidth="xl" disableGutters sx={{bgcolor: themeConsts.bgWhite, width: '100%', p:0}}>
        <Stack direction="row" spacing={2} 
            sx={{
              bgcolor: themeConsts.bgWhite, 
              width: '100%', 
              py:0,px:2, 
              alignItems: 'center',
              justifyContent: 'space-between',}}>
          <Box
            sx={{
              backgroundImage: `url(${liniuLogo})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: {xs:'80px', md:'120px'},
              height: {xs:'36px', md:'54px'},
              m:0
            }} />
          <Box> 
            <Typography sx={{ 
              fontSize: {xs:'16px', md:'24px'},
              fontWeight: 'thin', 
              textAlign: 'right', 
              color: themeConsts.textBlack, 
              m: 0}}> 
              「常态焕新」定制清洁服务
            </Typography>
          </Box>
          </Stack>
        {/* <BorderLinearProgress variant="determinate" value={progress} /> */}
      </Container>
  );
}
export default HeaderBar;
