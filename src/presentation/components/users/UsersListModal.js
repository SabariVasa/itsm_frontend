import React, { useState, useEffect, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import GlobalService from "../../../services/GlobalService";
import { resturls } from "../../../global/utils/apiurls";
import { useTheme } from "../../../global/commonComponents/ThemeContext";
import { Box, Modal, Skeleton } from "@mui/material";
import { useRearrange } from "../../hooks/rearrange-header";

export const UserListModal = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const { TriggerElement, onSelect } = props;
  const { theme } = useTheme();

  const headers = useMemo(() => {
    const excludeFields = ['id']
    const keys = Object.keys(users[0] || {}).filter((key) =>!excludeFields.includes(key));
    const headerkey = {
      firstName: "First Name",
      lastName: "Last Name",
      emailAddress: "Email",
    };

    return keys.map((key) => {
      switch (key) {
        case "firstName":
        case "lastName":
        case "emailAddress":
          return {
            field: key,
            headerName: headerkey[key],
            width: 150,
          };
        case "active":
          return {
            field: key,
            headerName: "Status",
            width: 100,
            renderCell: (params) => (params.value ? "Active" : "Inactive"),
          };
        default:
          return {
            field: key,
            headerName: key
              .replace(/([a-z])([A-Z])/g, "$1 $2")
              .replace(/[_]/g, " ")
              .toUpperCase(),
            width: 150,
          };
      }
    });
  }, [users]);

  const {resultHeaders, ReArrangeController} = useRearrange({headers});


  const getAllUserDetails = () => {
    GlobalService.generalSelect(
      (respdata) => {
        const { data } = respdata;
        setUsers(data);
        setLoading(false);
      },
      `${resturls.getAllADUsers}/${"677e75d9ad7e572e204496f9"}`,
      {},
      "GET"
    );
  };

  useEffect(() => {
    getAllUserDetails();
  }, []);

  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);

  const caseHandlers = {
    onClose: () => closeModal(),
    onOpen: () => openModal(),
  };

  return (
    <>
      {TriggerElement && (
        <TriggerElement onClick={openModal} onClose={closeModal} />
      )}
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="profile-modal-title"
        aria-describedby="profile-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "85%",
            height: 450,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {loading ? (
            <Skeleton variant="rectangular" height={600} />
          ) : (
            <>
            {ReArrangeController}
            <DataGrid
              rows={users}  
              columns={resultHeaders}
              getRowId={({ emailAddress }) => emailAddress}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
              onCellClick={({ row }) => onSelect(row, caseHandlers)}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 10 } },
              }}
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  '& .MuiDataGrid-row--borderBottom': {
                    background: `${theme.outerBodyColor}`,
                    color: 'white'
                  }
                },
                '& .MuiDataGrid-rowHeader': {
                  background: `${theme.outerBodyColor}`,
                  color: 'white',
                },
                '& .MuiDataGrid-row--borderBottom': {
                  borderBottom: '2px solid #cccccc',
                },
              }}
            />
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};
