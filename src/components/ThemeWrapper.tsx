// theme.ts
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const themeCustomized = createTheme({
  palette: {
    primary: {
      main: '#01080f', 
      dark: '#000',
    },
  },
  typography: {
    allVariants: {
      color: '#01080f',
    },
  },
});

export const themeConsts = {
  textBlack: '#01080f',
  textGrey: '#acacac',
  bgGrey: "#f2f2f8",
  bgWhite: "#fff",
  borderGrey: "#c6c6cc",
  primaryBlack: '#000',
  checkBtnBg: '#f5f5f5'
};



const ThemeWrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <ThemeProvider theme={themeCustomized}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;