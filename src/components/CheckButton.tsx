import { Button, ButtonProps } from '@mui/material';

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
        borderWidth: checked ? "2px" : "1px", 
        borderColor: checked ? "primary.main" : "#828282",
        color: "#292929",
        fontSize: '18px',
      }}
      {...rest} // 将所有其他 props 传递给 Button 组件
    >
      {children}
    </Button>
  );
};

export default CheckButton;