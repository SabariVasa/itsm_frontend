import React from 'react';
import { Avatar, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '../../global/commonComponents/ThemeContext';

export default function AvailablThemeList() {
  // const [selectedTheme, setSelectedTheme] = useState(themes[1]); // Default to current theme
  const { updateTheme } = useTheme();
  const handleThemeChange = ({ mainColor, outerColor }) => {
    console.log(mainColor, outerColor, 'mainColor, outerColor');
    updateTheme({ mainBodyColor: mainColor, outerBodyColor: outerColor });
  };

  const themeList = [
    {
      name: 'Black and White',
      mainColor: 'white',
      outerColor: 'linear-gradient(to right bottom, #0a1f44, #102c5a, #163871, #1d4487, #253f95)',
      avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
    {
      name: 'Current Theme',
      mainColor: '#176deb',
      outerColor: 'linear-gradient(to right bottom, #320046, #50005a, #6e006d, #8c007f, #aa0091)',
      avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
    {
      name: 'Red and White',
      mainColor: 'white',
      outerColor: 'linear-gradient(to right bottom, #5a2a00, #7c3a00, #9d4900, #be5900, #df6800)',
      avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
    {
      name: 'Sky and White',
      mainColor: 'white',
      outerColor: 'linear-gradient(to right bottom, #0b3d27, #15503a, #20634d, #2b765f, #366872);',
      avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
    {
      name: 'Violet and White',
      mainColor: 'white',
      outerColor: 'linear-gradient(to right bottom, #004d4d, #006666, #008080, #005f7f, #003f80)',
      avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
  ];


  return (
    <div>
      <Accordion
        sx={{

          '&.MuiPaper-root': {
            border: 'none',
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
          '&.Mui-expanded:first-of-type': {
            // marginTop: '2em',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          Theme
        </AccordionSummary>
        {themeList.map((theme, index) => (
          <div key={index} onClick={() => handleThemeChange(theme)}>
            <AccordionDetails
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: theme.mainBodyColor,
                padding: '10px',
                borderRadius: '5px',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              <Avatar alt={theme.name} src={theme.avatarUrl} sx={{ width: 60, height: 60, marginRight: '15px' }} />
              <Typography>{theme.name}</Typography>
            </AccordionDetails>
          </div>
        ))}
      </Accordion>
    </div >
  );
}
