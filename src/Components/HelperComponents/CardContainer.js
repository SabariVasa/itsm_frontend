// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { resturls } from '../../global/utils/apiurls';
// import GlobalService from '../../services/GlobalService';

// export default function CardContainer(props) {
//   const { categoryType, setCategoryType, CmdbData, setCmdbData } = props;
//   const keys = CmdbData ? Object.keys(CmdbData) : [];
//   const type = props.software ? "Software" : "Hardware";

//   // Handle card click
//   const handleCardClick = (id) => {
//     setCategoryType({ category: id, core: type });
//   };

//   // Handle delete click
//   const handleDeleteClick = (id, event) => {
//     event.stopPropagation();
//     console.log(`Delete card with id: ${id}`);

//     GlobalService.generalSelect(
//       (respdata) => {
//         const { estatus, emessage, data } = respdata;
//         if (estatus && emessage && data) {
//           const updatedCmdbData = keys
//             .filter((key) => CmdbData[key].id !== id)
//             .reduce((obj, key) => {
//               obj[key] = CmdbData[key];
//               return obj;
//             }, {});
//           setCmdbData(updatedCmdbData);
//         }
//       },
//       `${resturls.deleteClassCategory}/${id}`,
//       {},
//       'DELETE'
//     );
//   };

//   return (
//     <Box sx={{ flexGrow: 1, marginLeft: 10, marginBottom: 5 }}>
//       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//         {keys.map((ele, index) => (
//           <Grid item xs={12} sm={4} md={4} key={index}>
//             {/* Card onClick event */}
//             <div onClick={() => handleCardClick(CmdbData[`${ele}`].id)}>
//               <Card sx={{ display: 'flex', justifyContent: "space-around", alignItems: "center", position: 'relative' }}>
//                 {/* Delete icon button */}
//                 <IconButton
//                   sx={{ position: 'absolute', top: 8, right: 8 }}
//                   onClick={(event) => handleDeleteClick(CmdbData[`${ele}`].id, event)}  // Ensure event is passed to stop propagation
//                 >
//                   <DeleteIcon />
//                 </IconButton>

//                 {/* Card content */}
//                 <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                   <CardContent sx={{ flex: '1 0 auto' }}>
//                     <Typography component="div" variant="p">
//                       {CmdbData[`${ele}`].className}
//                     </Typography>
//                     <Typography variant="h3" color="text.secondary" component="div">
//                       {CmdbData[`${ele}`].totalCount}
//                     </Typography>
//                   </CardContent>
//                   <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}></Box>
//                 </Box>

//                 {/* Card image */}
//                 <CardMedia
//                   component="img"
//                   sx={{ width: 40, height: 40 }}
//                   image={CmdbData[`${ele}`].image}
//                   alt="Images"
//                 />
//               </Card>
//             </div>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }
// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import { Card, CardContent, CardMedia, Typography, IconButton, Skeleton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { resturls } from '../../global/utils/apiurls';
// import GlobalService from '../../services/GlobalService';

// export default function CardContainer(props) {
//   const { categoryType, setCategoryType, CmdbData, setCmdbData } = props;
//   const [isLoading, setIsLoading] = React.useState(true);
//   const keys = CmdbData ? Object.keys(CmdbData) : [];
//   const type = props.software ? "Software" : "Hardware";

//   // Simulate loading data with setTimeout
//   React.useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 3000); // Simulates a 3-second loading time

//     return () => clearTimeout(timer); // Cleanup the timer
//   }, []);

//   // Handle card click
//   const handleCardClick = (id) => {
//     setCategoryType({ category: id, core: type });
//   };

//   // Handle delete click
//   const handleDeleteClick = (id, event) => {
//     event.stopPropagation();
//     console.log(`Delete card with id: ${id}`);

//     GlobalService.generalSelect(
//       (respdata) => {
//         const { estatus, emessage, data } = respdata;
//         if (estatus && emessage && data) {
//           const updatedCmdbData = keys
//             .filter((key) => CmdbData[key].id !== id)
//             .reduce((obj, key) => {
//               obj[key] = CmdbData[key];
//               return obj;
//             }, {});
//           setCmdbData(updatedCmdbData);
//         }
//       },
//       `${resturls.deleteClassCategory}/${id}`,
//       {},
//       'DELETE'
//     );
//   };

//   return (
//     <Box sx={{ flexGrow: 1, marginLeft: 10, marginBottom: 5 }}>
//       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//         {isLoading ? (
//           // Display skeletons while loading
//           Array.from(new Array(6)).map((_, index) => (
//             <Grid item xs={12} sm={4} md={4} key={index}>
//               <Card>
//                 <Skeleton variant="rectangular" width="100%" height={140} />
//                 <CardContent>
//                   <Skeleton />
//                   <Skeleton width="60%" />
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           // Display actual cards when loading is finished
//           keys.map((ele, index) => (
//             <Grid item xs={12} sm={4} md={4} key={index}>
//               <div onClick={() => handleCardClick(CmdbData[`${ele}`].id)}>
//                 <Card sx={{ display: 'flex', justifyContent: "space-around", alignItems: "center", position: 'relative' }}>
//                   <IconButton
//                     sx={{ position: 'absolute', top: 8, right: 8 }}
//                     onClick={(event) => handleDeleteClick(CmdbData[`${ele}`].id, event)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                   <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                     <CardContent sx={{ flex: '1 0 auto' }}>
//                       <Typography component="div" variant="p">
//                         {CmdbData[`${ele}`].className}
//                       </Typography>
//                       <Typography variant="h3" color="text.secondary" component="div">
//                         {CmdbData[`${ele}`].totalCount}
//                       </Typography>
//                     </CardContent>
//                     <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}></Box>
//                   </Box>
//                   <CardMedia
//                     component="img"
//                     sx={{ width: 40, height: 40 }}
//                     image={CmdbData[`${ele}`].image}
//                     alt="Images"
//                   />
//                 </Card>
//               </div>
//             </Grid>
//           ))
//         )}
//       </Grid>
//     </Box>
//   );
// }
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card, CardContent, CardMedia, Typography, IconButton, Skeleton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { resturls } from '../../global/utils/apiurls';
import GlobalService from '../../services/GlobalService';

export default function CardContainer(props) {
  const { categoryType, setCategoryType, CmdbData, setCmdbData } = props;
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
    <Box sx={{ flexGrow: 1, marginLeft: 10, marginBottom: 5 }}>
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
                    sx={{ position: 'absolute', top: 7, right: 8, color: 'red' }} // Set icon color to red
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

