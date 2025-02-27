import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useHistory } from 'react-router-dom';
import { useAuth } from '../application/modules/auth/hooks/useAuth';
import { ROLE_ENUM, ROUTE_ENUM } from '../presentation/enums';

const RoleBasedRoute = () => {
  const history = useHistory();
  const { user_auth: { role_segment = [] } = {} } = useAuth();

  const redirectUrlController = (role) => {
    const directTo = ROUTE_ENUM[role];
    if (directTo) history.push(directTo)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          marginTop: 2,
        }}
      >
        {role_segment.map((id) => {
          const role = ROLE_ENUM[id];
          if (!role) return null;
          let description;
          let img;
          switch (role) {
            case 'Super Admin':
              description = "Oversees piloteDesk configuration, customization, and administration to ensure optimal performance and IT service alignment.";
              img = "./super_admins.png"
              break;
            case 'Admin':
              description = "An Admin for Help Desk piloteDesk focuses on day-to-day operations and maintenance of the piloteDesk platform.";
              img = "./admin.jpeg"
              break;
            default:
              description = "Uses the piloteDesk platform to log incidents, request services, track issue resolutions, and access self-service resources for IT support.";
              img = "./end_user.png"
          }

          return (
            <Card
              key={id}
              sx={{
                width: '372px',
                height: '250px',
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.3)",
                },
                background: "#f2f2f2",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
              onClick={() => redirectUrlController(role)}
            >
              <CardMedia
                image={img}
                alt={`${role} Image`}
                sx={{
                  height: 100,
                  margin: '16px auto 0',
                  width: 100,
                  objectFit: 'contain',
                }}
              />
              <CardContent>
                <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                  {role}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'center', fontSize: '0.9em' }}>
                  {description}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </div>
  );
};

export default RoleBasedRoute;