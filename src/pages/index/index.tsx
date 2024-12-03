import { Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.css'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import { CssBaseline } from '@mui/material';
import HeaderBar from '../../components/HeaderBar';
export function BasicButtons() {
  return (
    <Stack spacing={5} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained" sx={{ fontSize: '24px' ,padding: '10px 20px'}}>完 成</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}

const NumOfQuestions = 9;//这个问卷有多少个问题、
const Answered = 5;//已经回答了

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <Container maxWidth="xl" sx={{bgcolor: '#fff', p: 0}}>
      <CssBaseline />
      <AppBar position="sticky" sx={{bgcolor: '#fff', p: 0 ,width: '100%'}}>
        <HeaderBar progress={Answered/NumOfQuestions*100} />
      </AppBar>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <Text>Hello world!</Text>
      <BasicButtons />
    </Container>
  )
}
