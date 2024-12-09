import { Button } from '@mui/material';
import Box from '@mui/material/Box';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6, display:"flex", justifyContent:"center", mt:'auto' }}>
        <Button variant='contained'>报名清洁定制体验官</Button>
    </Box>
  );
}