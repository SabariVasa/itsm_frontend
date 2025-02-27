import { Autocomplete, Box, Button, Grid, MenuItem, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { resturls } from "../../global/utils/apiurls";
import GlobalService from "../../services/GlobalService";
import { DataGrid } from "@mui/x-data-grid";
import { sharedStyles } from "../../commonComponents/StyledComponents";
import { useTheme } from "../../global/commonComponents/ThemeContext";

export default function AddRequestItems(props) {
    const { setShowSelectedItemList, showSelectedItemList, headers, setHeaders, getDynamicHeaders } = props;
    const styles = {
        modalStyle: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            height: 500,
            // overflowY: 'scroll',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        },
    };

    const { theme } = useTheme();

    const headerData = [
        {
            field: 'firstName', headerName: 'First Name', width: 150,
            renderCell: (params) => (
                <div
                    style={{ cursor: 'pointer', color: 'blue' }}
                //   onClick={() => history.push(`${path}/userUpdate/${params.row.id}`)}
                >
                    {params.row.firstName}
                </div>
            ),
        },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'emailAddress', headerName: 'Email', width: 250 },
        { field: 'company', headerName: 'Company', width: 200 },
        { field: 'department', headerName: 'Department', width: 200 },
        { field: 'manager', headerName: 'Manager', width: 150 },
        { field: 'userBranch', headerName: 'Location', width: 150 },
        { field: 'userRole', headerName: 'Role', width: 120 },
        { field: 'mobileNumber', headerName: 'Mobile Number', width: 150 },
        { field: 'active', headerName: 'Status', width: 100, renderCell: (params) => (params.value ? 'Active' : 'Inactive') },
    ];

    // const [cmdbHardwareRequirements, setCmdbHardwareRequirements] = useState();
    // const [cmdbSoftwareRequirements, setCmdbSofwareRequirements] = useState(); = use
    const [requiredmentItemList, setRequiredmentItemList] = useState();
    const [selectedRequestClass, setSelectedRequestClass] = useState();
    const [open, setOpen] = useState(false);
    const [requestedItems, setRequestedItems] = useState([]);
    // const [showSelectedItemList, setShowSelectedItemList] = useState([]);

    async function getAllItems(requestCategory) {
        // setLoader(true);
        console.log(requestCategory, 'requestCategorys');
        GlobalService.generalSelect(
            (respdata) => {
                const { estatus, emessage, data } = respdata
                console.log(respdata, 'respdataCMDB');
                setRequiredmentItemList(data);
            }, resturls.fetchAllClassInstances, {}, 'GET',
        );
    };




    const processRowUpdate = (newRow) => ({ ...newRow, isNew: false });
    // const requiredmentItemList = cmdbHardwareRequirements || cmdbSoftwareRequirements;
    console.log(selectedRequestClass, headers, 'requiredmentItemList');

    async function fetchDesktopData(id) {
        // setIsLoading(true);
        GlobalService.generalSelect(
            (respdata) => {
                const { estatus, emessage, data } = respdata;
                console.log(respdata, 'respdatas');

                if ((estatus && emessage) && data) {
                    const newValues = data.map(item => ({
                        id: item.id, // Include the id
                        ...item.values, // Spread the values into the same object
                    }));
                    setSelectedRequestClass(newValues);

                    console.log(newValues, 'data.map(item => item.values)');

                    setHeaders(() => getDynamicHeaders(newValues));
                    setOpen(true);
                    //   const headers = Object.keys(data[0].values);

                }
            },
            `${resturls.obtainCategoryInstance}/${id}`,
            {},
            'GET'
        )
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRequirementItem = () => {
        // setShowSelectedItemList(requestedItems);
        setShowSelectedItemList(requestedItems);
        setOpen(false);
    };

    useEffect(() => {
        getAllItems();
    }, []);

    console.log(showSelectedItemList, requestedItems, 'ShowSelectedItemList');
    return (
        <div style={{ marginTop: '2em' }}>
            <Grid item xs={12} spacing={2} sx={{ display: 'flex', flexDirection: 'row', gap: '2em' }}>
                {/* <Grid xs={6}>
                    <TextField
                        select
                        fullWidth
                        label="Request Item Category"
                        name="requestcategory"
                        // value={values.selectCatelogue}
                        sx={sharedStyles}
                        onChange={(event) => getAllItems(event.target.value)}
                    >
                        <MenuItem value="Hardware">Hardware</MenuItem>
                        <MenuItem value="Software">Software</MenuItem>
                    </TextField>
                </Grid> */}

                <Grid xs={6} className="w-[30vw]">
                    {/* {console.log(options, 'options')} */}
                    {/* <Autocomplete
                        disablePortal
                        options={options}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Movie" />}
                    /> */}
                    {/* <TextField
                        select
                        fullWidth
                        label="Request Items"
                        name="requestItem"
                        disabled={!requiredmentItemList}
                        // value={values.selectCatelogue}
                        onChange={(event) => fetchDesktopData(event.target.value)}
                        sx={sharedStyles}
                    >
                        {requiredmentItemList?.map((ele) =>
                            <MenuItem value={ele.id}>{ele.className}</MenuItem>
                        )}
                    </TextField> */}
                    <Autocomplete
                        options={requiredmentItemList ? requiredmentItemList : []}
                        getOptionLabel={(option) => option.className || ""}
                        onChange={(event, value) => {
                            fetchDesktopData(value?.classCategoryId || null);
                        }}
                        isOptionEqualToValue={(option, value) => option.classCategoryId === value.classCategoryId}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Request Items"
                                fullWidth
                                disabled={!requiredmentItemList?.length}
                                sx={sharedStyles}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            {showSelectedItemList && (
                <DataGrid
                    rows={showSelectedItemList}
                    columns={headers}
                    getRowId={(row) => row.id}
                    pageSizeOptions={[10]}
                    editMode="row"
                    processRowUpdate={processRowUpdate}
                    disableRowSelectionOnClick
                    // checkboxSelection
                    onCellClick={(ele) => {
                        setRequestedItems((prev) => {
                            const exists = prev.find((item) => item.id === ele.row.id);
                            if (exists) {
                                // Remove the row if it's already in the array
                                return prev.filter((item) => item.id !== ele.row.id);
                            } else {
                                // Add the row if it's not in the array
                                return [...prev, ele.row];
                            }
                        });
                    }}
                    initialState={{
                        pagination: { paginationModel: { page: 0, pageSize: 10 } },
                    }}
                    sx={{
                        marginTop: '2em',
                        '& .MuiDataGrid-columnHeaders': {
                            '& .MuiDataGrid-row--borderBottom': {
                                background: `${theme.outerBodyColor}`,
                                color: `${theme.fontColor}`
                            },
                        },
                        '& .MuiDataGrid-rowHeader': {
                            background: `${theme.outerBodyColor}`,
                            color: `${theme.fontColor}`
                        },
                        '& .MuiDataGrid-row--borderBottom': {
                            borderBottom: '2px solid #cccccc',
                        },
                    }}
                />
            )}
            {/* {console.log(selectedRequestClass, 'selectedRequestClass')} */}
            {open && (
                <Modal open={selectedRequestClass || open} onClose={handleClose}>
                    <Box sx={styles.modalStyle}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                sx={{
                                    color: `${theme.fontColor}`,
                                    background: `${theme.outerBodyColor}`,
                                }}
                                onClick={() => handleRequirementItem()}>
                                add Items
                            </Button>
                        </Box>
                        <DataGrid
                            rows={selectedRequestClass}
                            columns={headers}
                            getRowId={(row) => row.id}
                            pageSizeOptions={[10]}
                            editMode="row"
                            processRowUpdate={processRowUpdate}
                            disableRowSelectionOnClick
                            checkboxSelection
                            onCellClick={(ele) => {
                                setRequestedItems((prev) => {
                                    const exists = prev.find((item) => item.id === ele.row.id);
                                    if (exists) {
                                        // Remove the row if it's already in the array
                                        return prev.filter((item) => item.id !== ele.row.id);
                                    } else {
                                        // Add the row if it's not in the array
                                        return [...prev, ele.row];
                                    }
                                });
                            }}
                            initialState={{
                                pagination: { paginationModel: { page: 0, pageSize: 10 } },
                            }}
                            sx={{
                                '& .MuiDataGrid-columnHeaders': {
                                    '& .MuiDataGrid-row--borderBottom': {
                                        background: `${theme.outerBodyColor}`,
                                        color: `${theme.fontColor}`,
                                    },
                                },
                                '& .MuiDataGrid-rowHeader': {
                                    background: `${theme.outerBodyColor}`,
                                        color: `${theme.fontColor}`,
                                },
                                '& .MuiDataGrid-row--borderBottom': {
                                    borderBottom: '2px solid #cccccc',
                                },
                            }}
                        />
                    </Box>

                </Modal>
            )}
        </div>
    )
}