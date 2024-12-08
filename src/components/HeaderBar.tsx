import liniuLogo from '@/resources/liniuLogo.png';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';

function HeaderBar({progress}: {progress: number}) {
  return (
      <Container maxWidth="xl" disableGutters sx={{bgcolor: '#fff', width: '100%'}}>
        <Toolbar sx={{height: '60px', display: 'flex', justifyContent: 'space-between'}}>
          <Box
            sx={{
              backgroundImage: `url(${liniuLogo})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: {xs:'80px', md:'120px'},
              height: {xs:'36px', md:'54px'},
            }} />

          <Box sx={{ flex: 1 }}> 
            <Typography variant="body2" sx={{ fontSize: {xs:'18px', md:'28px'},fontWeight: 'regular', textAlign: 'right', color: '#292929', mr: 1}}> 
              「常态焕新」定制清洁服务
            </Typography>
          </Box>
        </Toolbar>
        <LinearProgress variant="determinate" value={progress} />
      </Container>
  );
}
export default HeaderBar;
