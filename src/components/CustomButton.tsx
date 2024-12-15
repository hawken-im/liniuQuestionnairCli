import { Box, Button, ButtonProps, Typography } from '@mui/material';
import { themeConsts } from './ThemeWrapper';
import img0 from '@/resources/houseStyle/0.png';
import img1 from '@/resources/houseStyle/1.png';
import img2 from '@/resources/houseStyle/2.png';
import img3 from '@/resources/houseStyle/3.png';
//import img4 from '@/resources/houseStyle/4.png';
//const bgList = [img0, img1, img2, img3, img4];
const bgList = [img0, img1, img2, img3];

export const CheckButtonWithPic = ({ 
  children, 
  checked, 
  bg,
  onClick,
  ...rest  //  使用 ...rest 捕获所有其他 props
}: { children: React.ReactNode; checked: boolean; bg: number; onClick?:()=>void } & ButtonProps) => { // 使用 ButtonProps 类型
  return (
    <Box sx={{position:"relative"}} onClick={onClick}>
      <Button 
        variant="outlined" 
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'flex-end',
          pb: {xs:0, md:1},
          borderRadius: 4, 
          borderWidth: '1px', 
          boxShadow: checked ? `0 0 0 1px ${themeConsts.primaryBlack}` : "none",
          borderColor: checked ? themeConsts.primaryBlack : themeConsts.borderGrey,
          color: themeConsts.textBlack,
          fontSize: '16px',
          fontWeight: 'medium',
          width: {xs:'133px', md:'266px'},
          height: {xs:'95px', md:'190px'},
          backgroundImage: `url(${bgList[bg]})`,
          backgroundSize: {xs:'133px', md:'266px'}, 
          backgroundRepeat: 'no-repeat' 
        }}
        {...rest} // 将所有其他 props 传递给 Button 组件
      >
        {/* {checked && <BeenhereIcon sx={{color: 'primary.main', fontSize: '24px', position:"absolute", top:-2, right:3}} />} */}
      </Button>
      <Box sx={{
        position:"absolute", 
        bottom:'1px', left:'0.5%', 
        width:'99%', height:'30%', 
        borderBottomLeftRadius: 16, borderBottomRightRadius: 16,
        backgroundColor:themeConsts.bgGrey,
        opacity: 0.7}}>
        <Typography sx={{
          color: themeConsts.textBlack, 
          fontSize: '16px', 
          fontWeight: 'medium',
          textAlign: 'center', p:0}}>{children}
        </Typography>
      </Box>
    </Box>
  );
};

export const SmallIconButton = ({ 
  children, 
  ...rest  //  使用 ...rest 捕获所有其他 props
}: { children: React.ReactNode; } & ButtonProps) => { // 使用 ButtonProps 类型
  return (
    <Button 
      variant="outlined" 
      sx={{
        borderRadius: 10, 
        borderWidth: "1px", 
        borderColor: themeConsts.primaryBlack,
        backgroundColor: themeConsts.bgWhite,
        color: themeConsts.textBlack,
        fontSize: '14px',
        fontWeight: 'regular',
        py: '0px',
        px: '8px',
      }}
      {...rest} // 将所有其他 props 传递给 Button 组件
    >
      {children}
    </Button>
  );
};

export const TextButton = ({ 
  children, 
  checked, 
  ...rest  //  使用 ...rest 捕获所有其他 props
}: { children: React.ReactNode; checked: boolean } & ButtonProps) => { // 使用 ButtonProps 类型
  return (
    <Button 
      variant="outlined" 
      sx={{
        borderRadius: 4, 
        borderWidth: "1px", 
        boxShadow: checked ? `0 0 0 1px ${themeConsts.primaryBlack}` : "none",
        borderColor: checked ? themeConsts.primaryBlack : themeConsts.borderGrey,
        backgroundColor: themeConsts.bgWhite,
        color: themeConsts.textBlack,
        fontSize: '16px',
        fontWeight: 'medium',
      }}
      {...rest} // 将所有其他 props 传递给 Button 组件
    >
      {children}
    </Button>
  );
};

export const SmallTextButton = ({ 
  children, 
  checked, 
  ...rest  //  使用 ...rest 捕获所有其他 props
}: { children: React.ReactNode; checked: boolean } & ButtonProps) => { // 使用 ButtonProps 类型
  return (
    <Button 
      variant="text" 
      sx={{
        p: 0,
        color: checked? themeConsts.textBlack: themeConsts.textGrey,
        fontSize: checked? '15px': '15px',
        fontWeight: checked? 'medium' : 'regular',
      }}
      {...rest} // 将所有其他 props 传递给 Button 组件
    >
      {children}
    </Button>
  );
};

const CheckButton = ({ 
  children, 
  checked, 
  ...rest  //  使用 ...rest 捕获所有其他 props
}: { children: React.ReactNode; checked: boolean } & ButtonProps) => { // 使用 ButtonProps 类型
  return (
    <Button 
      variant="outlined" 
      sx={{
        borderRadius: 4, 
        borderWidth: "1px", 
        boxShadow: checked ? `0 0 0 1px ${themeConsts.primaryBlack}` : "none",
        borderColor: checked ? themeConsts.primaryBlack : themeConsts.borderGrey,
        backgroundColor: themeConsts.checkBtnBg,
        color: themeConsts.textBlack,
        fontSize: '16px',
        fontWeight: 'medium',
      }}
      {...rest} // 将所有其他 props 传递给 Button 组件
    >
      {children}
    </Button>
  );
};

export default CheckButton;