import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Stack, Tab, TextareaAutosize } from "@mui/material";
import React from "react";
import { useTheme } from "../../global/commonComponents/ThemeContext";

export default function IncidentTabActiveNotes(props) {
  const {
    value, handleChange, handleAddNote, notes,
    comment, selectedCaller, setComment, currentdate
  } = props;
  const {theme} = useTheme();
  return (
    <Box sx={{ width: '100%', typography: 'body1', marginTop: 10 }}>
      <TabContext value={value}>
        <Box sx={{ padding: '16px' }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            TabIndicatorProps={{
              style: { backgroundColor: `${theme.outerBodyColor}` },
            }}
            sx={{
              '& .MuiTab-root': {
                color: 'grey',
              },
              '& .Mui-selected': {
                color: `${theme.valueFontColor}`,
                fontWeight: 'bold',
              },

            }}
          >
            <Tab
              style={{
                color: `${theme.valueFontColor}`
              }}
              label="Activity" value="1"
            />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: "16px" }}>
          <Stack
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: 20,
              marginTop: 20,
            }}
            direction="row"
          >
            <label
              style={{
                display: 'block',
                color: 'grey',
                marginLeft: 10,
                marginBottom: 10,
              }}
              htmlFor="textarea"
            >
              Activity Notes :
            </label>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                width: 130,
                fontSize: 12,
                marginBottom: 10,
                background: `${theme.outerBodyColor}`,
                color: `${theme.outerBodyfontColor}`,
                '&:hover': {
                  backgroundColor: `${theme.btnHoverColor}`,
                },
              }}
              onClick={handleAddNote}
            >
              Update Notes
            </Button>
          </Stack>
          <TextareaAutosize
            aria-label="empty textarea"
            minRows={5}
            placeholder="Enter the notes"
            style={{
              width: '97.3%',
              padding: '16px',
              border: `2px solid ${theme.valueFontColor}`,
              borderRadius: 4,
              outline: 'none',
            }}
            borderColor
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor =  theme.borderColor)}
            onBlur={(e) => (e.target.style.borderColor =  theme.borderColor)}
          />

          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#e6e6e6',
              borderRadius: 10,
              padding: 10,
            }}
          >
            <h4 style={{ fontWeight: 'normal', fontSize: 16 }}>
              Incident request raised by <strong>{selectedCaller?.name || selectedCaller}</strong>
            </h4>
            <h4
              style={{
                fontWeight: 'normal',
                marginTop: 10,
                fontSize: 13,
              }}
            >
              Created at <strong>{currentdate}</strong>
            </h4>

          </Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginTop: 10,
            }}
          >
            {notes?.map((note, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#e6e6e6',
                  borderRadius: 10,
                  padding: 10,
                  marginTop: 5,
                }}
              >
                <p style={{ fontWeight: 'normal', fontSize: 16 }}>{note.text}</p>
                <p style={{ fontWeight: 'normal', fontSize: 13,marginTop:7 }}>
                  Note updated by <strong>{note.createdBy}</strong>
                </p>
                <p
                  style={{
                    fontWeight: 'normal',
                    fontSize: 13,
                    marginTop: 2,
                  }}
                >
                  Created at <strong>{note.timeStamp}</strong>
                </p>
              </div>
            ))}
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
}