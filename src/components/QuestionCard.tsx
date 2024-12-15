import { Card, CardContent,Typography } from '@mui/material';

const QuestionCard = ({ children, number }: { children: React.ReactNode; number: number }) => {
  return (
    <Card variant="outlined" sx={{borderRadius:4, mt:4}}>
        <CardContent  sx={{position:"relative"}}>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                {`${number}.`}
            </Typography>
             {children}
        </CardContent>
    </Card>
  );
};

export default QuestionCard;