// import React from "react";
// import ContentDevider from "../HelperComponents/ContentDevider";
// import CraeteCatelogueGeneratedForm from "./CraeteCatelogueGeneratedForm";
// import GeneratedForm from "../cmdb/classmanagement/GeneratedForm";

// export default function PreviewSubmitFormDetails({ catelogueFlowDetails = {}, formFields }) {
//   console.log(catelogueFlowDetails, '{ catelogueFlowDetails }');
//   const {
//     generalInformation = {},
//     addRequiredItem = { requestItems: [] },
//     catalogueFlow = { serviceRequestAccess: [] },
//   } = catelogueFlowDetails;
//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2>Submitted Form Preview</h2>

//       {/* General Information Section */}
//       <section>
//         <ContentDevider title="General Information" />
//         <p><strong>Service Request Name:</strong> {generalInformation.serviceRequestName}</p>
//         <p><strong>Service Request Description:</strong> {generalInformation.serviceRequestDescription}</p>
//         <p><strong>Turn Around Time:</strong> {generalInformation.turnAroundTime}</p>
//         {formFields.length > 0 && (
//           <>
//             <ContentDevider title="Generated Form" />
//             <GeneratedForm
//               formFields={formFields}
//               // setFormFields={setFormFields}
//               // selectCategoryType={selectCategoryType}
//               // logo={logo}
//               // className={header}
//               generatedForm={false}
//             // catelogue={true}
//             />
//           </>)}
//       </section>

//       {/* Required Items Section */}
//       <section>
//         {/* <h3>Required Items</h3> */}
//         <ContentDevider title="Required Items" />
//         <table border="1" cellPadding="10" style={{ marginTop: '1.5em', width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               <th>Device Name</th>
//               <th>Manufacturer Name</th>
//               <th>Model Number</th>
//               <th>Serial Number</th>
//               <th>Management IP Address</th>
//               <th>Operating System</th>
//               <th>Routing Protocols</th>
//               <th>Warranty Period</th>
//               <th>Maintenance Schedule</th>
//               <th>Contact Person</th>
//             </tr>
//           </thead>
//           <tbody>
//             {addRequiredItem.requestItems.map((item) => (
//               <tr key={item.id}>
//                 <td>{item["Device Name"]}</td>
//                 <td>{item["Manufacturer Name"]}</td>
//                 <td>{item["Model Number"]}</td>
//                 <td>{item["Serial Number"]}</td>
//                 <td>{item["Management IP Address"]}</td>
//                 <td>{item["Operating System"]}</td>
//                 <td>{item["Routing Protocols"]}</td>
//                 <td>
//                   {new Date(item["Warranty Start"]).toLocaleDateString()} -{" "}
//                   {new Date(item["Warranty End"]).toLocaleDateString()}
//                 </td>
//                 <td>{item["Maintanence Schedule"]}</td>
//                 <td>{item["Contact Person"]}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//       {/* Catalogue Flow Section */}
//       <section>
//         {/* <h3>Catalogue Flow</h3> */}
//         <ContentDevider title="Catalogue Flow" />
//         {catalogueFlow.serviceRequestAccess.map((group) => (
//           <div key={group.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
//             <h4>Group Name: {group.groupName}</h4>
//             <p><strong>Description:</strong> {group.groupDescription}</p>
//             <p><strong>Type:</strong> {group.groupType}</p>
//             <h5>Group Members:</h5>
//             <ul>
//               {group.groupMembers.map((member) => (
//                 <li key={member.id}>
//                   <p><strong>Name:</strong> {member.firstName} {member.lastName}</p>
//                   <p><strong>Email:</strong> {member.emailAddress}</p>
//                   <p><strong>Role:</strong> {member.userRole}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// }
import React from "react";
import ContentDevider from "../HelperComponents/ContentDevider";
import CraeteCatelogueGeneratedForm from "./CraeteCatelogueGeneratedForm";
import GeneratedForm from "../cmdb/classmanagement/GeneratedForm";
import { useTheme } from "../../global/commonComponents/ThemeContext";

export default function PreviewSubmitFormDetails({ catelogueFlowDetails = {}, formFields }) {
  console.log(catelogueFlowDetails, "{ catelogueFlowDetails }");
  const { theme } = useTheme()
  const {
    generalInformation = {},
    addRequiredItem = { requestItems: [] },
    catalogueFlow = { serviceRequestAccess: [] },
  } = catelogueFlowDetails;

  // Helper function to dynamically render labels and values
  const renderField = (label, value) => (
    <p>
      <strong>{label}:</strong>{" "}
      <span style={{ color: `${theme.valueFontColor}` }}>{value || "N/A"}</span>
    </p>
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <section>
        <ContentDevider title="General Information" />
        {renderField("Service Request Name", generalInformation.serviceRequestName)}
        {renderField(
          "Service Request Description",
          generalInformation.serviceRequestDescription
        )}
        {renderField("Turn Around Time", generalInformation.turnAroundTime)}

        {formFields.length > 0 && (
          <>
            <ContentDevider title="Generated Form" />
            <GeneratedForm
              formFields={formFields}
              generatedForm={false}
            />
          </>
        )}
      </section>

      {/* Required Items Section */}
      <section>
        <ContentDevider title="Required Items" />
        <table
          border="1"
          cellPadding="10"
          style={{ marginTop: "1.5em", width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Device Name</th>
              <th>Manufacturer Name</th>
              <th>Model Number</th>
              <th>Serial Number</th>
              <th>Management IP Address</th>
              <th>Operating System</th>
              <th>Routing Protocols</th>
              <th>Warranty Period</th>
              <th>Maintenance Schedule</th>
              <th>Contact Person</th>
            </tr>
          </thead>
          <tbody>
            {addRequiredItem.requestItems.map((item) => (
              <tr key={item.id}>
                <td style={{ color: `${theme.valueFontColor}` }}>{item["Device Name"] || "N/A"}</td>
                <td style={{ color: `${theme.valueFontColor}` }}>{item["Manufacturer Name"] || "N/A"}</td>
                <td style={{ color: `${theme.valueFontColor}` }}>{item["Model Number"] || "N/A"}</td>
                <td style={{ color: `${theme.valueFontColor}` }}>{item["Serial Number"] || "N/A"}</td>
                <td style={{ color: `${theme.valueFontColor}` }}>{item["Management IP Address"] || "N/A"}</td>
                <td style={{ color: `${theme.valueFontColor}` }}>{item["Operating System"] || "N/A"}</td>
                <td style={{ color: `${theme.valueFontColor}` }}>{item["Routing Protocols"] || "N/A"}</td>
                <td style={{ color: `${theme.valueFontColor}` }}>
                  {item["Warranty Start"] && item["Warranty End"]
                    ? `${new Date(item["Warranty Start"]).toLocaleDateString()} - ${new Date(
                      item["Warranty End"]
                    ).toLocaleDateString()}`
                    : "N/A"}
                </td>
                <td style={{ color: `${theme.valueFontColor}` }}>{item["Maintanence Schedule"] || "N/A"}</td>
                <td style={{ color: `${theme.valueFontColor}` }}>{item["Contact Person"] || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Catalogue Flow Section */}
      <section>
        <ContentDevider title="Catalogue Flow" />
        {catalogueFlow.serviceRequestAccess.map((group) => (
          <div
            key={group.id}
            style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}
          >
            {renderField("Group Name", group.groupName)}
            {renderField("Description", group.groupDescription)}
            {renderField("Type", group.groupType)}
            <h5>Group Members:</h5>
            <ul>
              {group.groupMembers.map((member) => (
                <li key={member.id}>
                  {renderField("Name", `${member.firstName} ${member.lastName}`)}
                  {renderField("Email", member.emailAddress)}
                  {renderField("Role", member.userRole)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
