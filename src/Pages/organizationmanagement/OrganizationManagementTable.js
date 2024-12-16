import React, { useEffect, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { useHistory, useRouteMatch } from "react-router-dom";
import OrganizationCreatePage from "./OrganizationCreationPage";
import { DataGrid } from '@mui/x-data-grid';
import GlobalService from "../../services/GlobalService";
import { resturls } from "../../global/utils/apiurls";

export default function OrganizationManagementTable(props) {
    const history = useHistory();
    const { path } = useRouteMatch();

    const [orgUnits, setOrgUnits] = useState([]);
    const [openOrgModal, setOpenOrgModal] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [checkboxSelection, setCheckboxSelection] = useState(true);

    const handleCloseOrgModal = () => {
        setOpenOrgModal(false)
    };

    const headerData = [
        {
            field: 'organizationName	', headerName: 'Organization Name', width: 150,
            renderCell: (params) => (
                <div
                    style={{ cursor: 'pointer', color: 'blue' }}
                    onClick={() => history.push(`${path}/orgUpdate/${params.row.organizationId}`)}
                >
                    {params.row.organizationName}
                </div>
            ),
        },
        { field: 'location', headerName: 'Location', width: 150 },
        { field: 'createdDate', headerName: 'Created Date', width: 250 },
        { field: 'active', headerName: 'Status', width: 100, renderCell: (params) => (params.value ? 'Active' : 'Inactive') },
        { field: 'orgManager', headerName: 'Org Manager', width: 200 },
        { field: 'description', headerName: 'Description', width: 250 },

    ];

    const processRowUpdate = (newRow) => ({ ...newRow, isNew: false });

    const handleSelectionModelChange = (selection) => {
        setSelectedRows(selection);
    };

    const FetchAllOrganizations = () => {
        GlobalService.generalSelect((respData) => {
            const { estatus, emessage, data } = respData;
            if (estatus && emessage) {
                setOrgUnits(data);
            }
        }, resturls.FetchAllOrganizations, {}, 'GET')
    }

    useEffect(() => {
        FetchAllOrganizations()
    }, []);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button variant="contained" color="primary" onClick={() => setOpenOrgModal(true)}>
                    Create Organization
                </Button>
            </Box>
            <DataGrid
                rows={orgUnits}
                columns={headerData}
                getRowId={(row) => row.organizationId}
                pageSizeOptions={[10]}
                editMode="row"
                processRowUpdate={processRowUpdate}
                checkboxSelection={checkboxSelection}
                onSelectionModelChange={handleSelectionModelChange}
                initialState={{
                    pagination: { paginationModel: { page: 0, pageSize: 10 } },
                }}
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f0f0f0',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: '#1976d2',
                        color: 'white',
                    },
                    '& .MuiDataGrid-row--borderBottom': {
                        borderBottom: '2px solid #cccccc',
                    },
                }}
            />
            <Modal
                open={openOrgModal}
                onClose={handleCloseOrgModal}
                aria-labelledby="profile-modal-title"
                aria-describedby="profile-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 800,
                        height: 450,
                        overflowY: 'scroll',
                        bgcolor: 'background.paper',
                        border: '2px solid #fffff',
                        borderRadius: 4,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <OrganizationCreatePage handleCloseOrgModal={handleCloseOrgModal} />
                </Box>
            </Modal>
        </>
    );
}