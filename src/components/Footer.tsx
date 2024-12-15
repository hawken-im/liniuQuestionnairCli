import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6, display:"flex", justifyContent:"center", mt:'auto' }}>
      <TextField>称呼</TextField>
      <TextField>先生？女士？</TextField>
        <Button variant='contained'>提交报名</Button>
    </Box>
  );
}