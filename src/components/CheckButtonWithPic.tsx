import { Button, ButtonProps } from '@mui/material';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import img0 from '@/resources/houseStyle/0.png';
import img1 from '@/resources/houseStyle/1.png';
import img2 from '@/resources/houseStyle/2.png';
import img3 from '@/resources/houseStyle/3.png';
import img4 from '@/resources/houseStyle/4.png';

const bgList = [img0, img1, img2, img3, img4];

const CheckButtonWithPic = ({ 
  children, 
  checked, 
  bg,
  ...rest  //  使用 ...rest 捕获所有其他 props
}: { children: React.ReactNode; checked: boolean; bg: number } & ButtonProps) => { // 使用 ButtonProps 类型
  return (
    <Button 
      variant="outlined" 
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'flex-end',
        pb: {xs:0, md:2},
        borderRadius: 4, 
        borderWidth: checked ? "3px" : "1px", 
        borderColor: checked ? "primary.main" : "#828282",
        color: "#fff",
        fontSize: '18px',
        fontWeight: 'bold',
        width: {xs:'133px', md:'266px'},
        height: {xs:'95px', md:'190px'},
        backgroundImage: `url(${bgList[bg]})`,
        backgroundSize: {xs:'133px', md:'266px'}, 
        backgroundRepeat: 'no-repeat' 
      }}
      {...rest} // 将所有其他 props 传递给 Button 组件
    >
      {children}
      {checked && <BeenhereIcon sx={{color: 'primary.main', fontSize: '24px', position:"absolute", top:-2, right:3}} />}
    </Button>
  );
};

export default CheckButtonWithPic;