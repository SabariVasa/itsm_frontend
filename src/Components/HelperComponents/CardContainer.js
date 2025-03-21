import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card, CardContent, CardMedia, Typography, IconButton, Skeleton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { resturls } from '../../global/utils/apiurls';
import GlobalService from '../../services/GlobalService';

export default function CardContainer(props) {
  const { setCategoryType, CmdbData, setCmdbData } = props;
  const [isLoading, setIsLoading] = React.useState(true);
  const [deletingId, setDeletingId] = React.useState(null);
  const keys = CmdbData ? Object.keys(CmdbData) : [];
  const type = props.software ? "Software" : "Hardware";

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (id) => {
    setCategoryType({ category: id, core: type });
  };

  const handleDeleteClick = (id, event) => {
    event.stopPropagation();
    console.log(`Delete card with id: ${id}`);
    setDeletingId(id);

    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage, data } = respdata;
        if (estatus && emessage && data) {
          const updatedCmdbData = keys
            .filter((key) => CmdbData[key].id !== id)
            .reduce((obj, key) => {
              obj[key] = CmdbData[key];
              return obj;
            }, {});
          setCmdbData(updatedCmdbData);
        }
      },
      `${resturls.deleteClassCategory}/${id}`,
      {},
      'DELETE'
    ).finally(() => {

      setDeletingId(null);
    });
  };

  return (
    <Box className="p-4" sx={{ flexGrow: 1, marginBottom: 5 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {isLoading ? (
          Array.from(new Array(keys.length)).map((_, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
              <Card>
                <Skeleton variant="rectangular" width="100%" height={140} />
                <CardContent>
                  <Skeleton />
                  <Skeleton width="60%" />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          keys.map((ele, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
              <div onClick={() => handleCardClick(CmdbData[`${ele}`].id)}>
                <Card sx={{ display: 'flex', justifyContent: "space-around", alignItems: "center", position: 'relative' }}>
                  <IconButton
                    sx={{ position: 'absolute', top: 7, right: 8, color: 'red' }}
                    onClick={(event) => handleDeleteClick(CmdbData[`${ele}`].id, event)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {deletingId === CmdbData[`${ele}`].id ? (
                    <Skeleton variant="rectangular" width="100%" height={140} />
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="p">
                          {CmdbData[`${ele}`].className}
                        </Typography>
                        <Typography variant="h3" color="text.secondary" component="div">
                          {CmdbData[`${ele}`].totalCount}
                        </Typography>
                      </CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}></Box>
                    </Box>
                  )}
                  <CardMedia
                    component="img"
                    sx={{ width: 40, height: 40 }}
                    image={CmdbData[`${ele}`].image}
                    alt="Images"
                  />
                </Card>
              </div>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

