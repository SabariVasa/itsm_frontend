import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "../../global/commonComponents/ThemeContext";

export default function GroupAdminList(props) {
    const { userData, isKeywordPresent } = props;
    const [users, setUsers] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    const {theme} = useTheme();

    const getDynamicHeaders = () => {
        if (!userData || userData.length === 0) return [];

        // Extract keys from the first object in userData
        const keys = Object.keys(userData[0]);

        // Map keys to column definitions
        const dynamicHeaders = keys.map((key) => {
            // Add custom configuration for specific fields if needed
            switch (key) {
                case "firstName":
                    return {
                        field: key,
                        headerName: "First Name",
                        width: 150,
                    };
                case "lastName":
                    return {
                        field: key,
                        headerName: "Last Name",
                        width: 150,
                    };
                case "emailAddress":
                    return {
                        field: key,
                        headerName: "Email",
                        width: 250,
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
                        headerName: key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([_])/g, " ").toUpperCase(),
                        width: 150,
                    };
            }
        });

        return dynamicHeaders;
    };

    const getAllUserDetails = () => {
        setUsers(userData);
        setHeaders(getDynamicHeaders());
        setLoading(false);
    };

    useEffect(() => {
        getAllUserDetails();
    }, []);

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <DataGrid
                    rows={users}
                    columns={headers}
                    getRowId={(row) => row.id}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                    checkboxSelection={isKeywordPresent}
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
                        '& .MuiDataGrid-row--borderBottom': {
                            borderBottom: '2px solid #cccccc',
                        },
                    }}
                />
            )}
        </>
    );
}
