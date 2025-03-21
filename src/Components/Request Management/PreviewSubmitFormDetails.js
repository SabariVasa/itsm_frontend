import React from "react";
import ContentDevider from "../HelperComponents/ContentDevider";
import CraeteCatelogueGeneratedForm from "./CraeteCatelogueGeneratedForm";
import GeneratedForm from "../cmdb/classmanagement/GeneratedForm";
import { useTheme } from "../../global/commonComponents/ThemeContext";
import { DataGrid } from "@mui/x-data-grid";

export default function PreviewSubmitFormDetails({ catelogueFlowDetails = {}, formFields }) {
  console.log(catelogueFlowDetails, "{ catelogueFlowDetails }");
  const { theme } = useTheme();

  const {
    generalInformation = {},
    addRequiredItem = { requestItems: [] },
    catalogueFlow = { serviceRequestAccess: [] },
  } = catelogueFlowDetails;

  const requiredItemsColumns = [
    { field: "deviceName", headerName: "Device Name", width: 150 },
    { field: "manufacturerName", headerName: "Manufacturer", width: 150 },
    { field: "modelNumber", headerName: "Model Number", width: 150 },
    { field: "serialNumber", headerName: "Serial Number", width: 150 },
    { field: "managementIP", headerName: "Management IP", width: 150 },
    { field: "operatingSystem", headerName: "Operating System", width: 180 },
    { field: "routingProtocols", headerName: "Routing Protocols", width: 180 },
    { field: "warranty", headerName: "Warranty Period", width: 200 },
    { field: "maintenanceSchedule", headerName: "Maintenance Schedule", width: 180 },
    { field: "contactPerson", headerName: "Contact Person", width: 150 },
  ];

  const requiredItemsRows = addRequiredItem.requestItems.map((item, index) => ({
    id: index + 1,
    deviceName: item["Device Name"] || "N/A",
    manufacturerName: item["Manufacturer Name"] || "N/A",
    modelNumber: item["Model Number"] || "N/A",
    serialNumber: item["Serial Number"] || "N/A",
    managementIP: item["Management IP Address"] || "N/A",
    operatingSystem: item["Operating System"] || "N/A",
    routingProtocols: item["Routing Protocols"] || "N/A",
    warranty:
      item["Warranty Start"] && item["Warranty End"]
        ? `${new Date(item["Warranty Start"]).toLocaleDateString()} - ${new Date(item["Warranty End"]).toLocaleDateString()}`
        : "N/A",
    maintenanceSchedule: item["Maintanence Schedule"] || "N/A",
    contactPerson: item["Contact Person"] || "N/A",
  }));

  const renderField = (label, value) => (
    <p className="flex gap-2 w-[50%]">
      <h4>{label}:</h4>{" "}
      <span style={{ color: `${theme.valueFontColor}` }}>{value || "N/A"}</span>
    </p>
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <section className="border border-gray-300 pb-4 rounded-md">
        <ContentDevider title="General Information" />
        <div className="flex flex-wrap px-4">
          {renderField("Service Request Name", generalInformation.serviceRequestName)}
          {renderField("Service Request Description", generalInformation.serviceRequestDescription)}
          {renderField("Turn Around Time", generalInformation.turnAroundTime)}
        </div>

        {formFields.length > 0 && (
          <div className="mt-4 border border-gray-400 p-4 w-full">
              <h5 className="mb-8, fw-b">Generated Form:</h5>
            <GeneratedForm formFields={formFields} generatedForm={false} />
          </div>
        )}
      </section>

      <section className="border border-gray-300 pb-4 rounded-md">
        <ContentDevider title="Required Items" />
        <div style={{ width: "100%", marginTop: "1.5em" }}>
          <DataGrid
            rows={requiredItemsRows}
            columns={requiredItemsColumns}
            pageSize={5}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                '& .MuiDataGrid-row--borderBottom': {
                 background: `${theme.outerBodyColor}`,
                 color: "white"
                }
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
        </div>
      </section>

      <section className="border border-gray-300 pb-4 rounded-md">
        <ContentDevider title="Catalogue Flow" />
        {catalogueFlow.serviceRequestAccess.length > 0 ? catalogueFlow.serviceRequestAccess.map((group) => {
          const groupMembersColumns = [
            { field: "id", headerName: "ID", width: 70 },
            { field: "name", headerName: "Name", width: 200 },
            { field: "email", headerName: "Email", width: 250 },
            { field: "role", headerName: "Role", width: 150 },
          ];

          const groupMembersRows = group.groupMembers.map((member, index) => ({
            id: index + 1,
            name: `${member.firstName} ${member.lastName}`,
            email: member.emailAddress,
            role: member.userRole,
          }));

          return (
            <div key={group.id} className="flex flex-wrap mt-4">
              {renderField("Group Name", group.groupName)}
              {renderField("Description", group.groupDescription)}
              {renderField("Type", group.groupType)}
              <div className="mt-4 border border-gray-400 p-4 w-full">
              <h5 className="mb-8, fw-b">Group Members:</h5>
                <DataGrid
                  rows={groupMembersRows}
                  columns={groupMembersColumns}
                  pageSize={5}
                  sx={{
                    '& .MuiDataGrid-columnHeaders': {
                      '& .MuiDataGrid-row--borderBottom': {
                       background: `${theme.outerBodyColor}`,
                       color: "white"
                      }
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
              </div>
            </div>
          );
        }) : <span className="text-gray-500 ml-4">No Catalogue Flow Found</span>}
      </section>
    </div>
  );
}
