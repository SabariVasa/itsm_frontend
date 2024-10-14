import React from 'react';
import CmdbGridContainer from '../Components/HelperComponents/GridContainer';
import ContentDevider from '../Components/HelperComponents/ContentDevider';
// import { Button } from '@mui/material';

export default function CmdbFormPage() {
    const OrgOptions = [
        { value: "Demo" },
        { value: "Helpdesk" },
        { value: "IT department" }
    ]
    const StatusOptions = [
        { value: "Demo" },
        { value: "Helpdesk" },
        { value: "IT department" }
    ]
    const BussinessCriticalOptions = [
        { value: "Demo" },
        { value: "Helpdesk" },
        { value: "IT department" }
    ]

    const Field1 = ["Name", "Organization"];
    const Field2 = ["Status", "Bussiness Crtitcality"];
    const Field3 = ["Location"]
    const Field4 = ["Brand", "Model"]
    const Field5 = ["OS Family", "OS Version"];
    const Field6 = ["CPU", "RAM"]
    const Field7 = ["Rack Units", "Serial Number"]
    return (
        <div>
            <ContentDevider title="General Properties" />
            <CmdbGridContainer MenuItems={[OrgOptions, OrgOptions]} show={[true, true, false, false]} name={Field1} dropdown={[false, true]} />
            <CmdbGridContainer MenuItems={[StatusOptions, BussinessCriticalOptions]} show={[true, true, false, false]} name={Field2} dropdown={[true, true]} />
            <CmdbGridContainer MenuItems={[StatusOptions, BussinessCriticalOptions]} show={[true, false, false, false]} name={Field3} dropdown={[true, true]} />
            <ContentDevider title="Dates" />
            <CmdbGridContainer show={[false, false, true, true]} MenuItems={[OrgOptions, OrgOptions]} name={Field3} label={["Choose Protection Date", "Purchase Date"]} />
            <CmdbGridContainer show={[false, false, true, false]} MenuItems={[OrgOptions, OrgOptions]} name={Field3} label={["End of Warranty"]} />
            <ContentDevider title="More Information" />
            <CmdbGridContainer show={[true, true, false, false]} dropdown={[true, true]} MenuItems={[OrgOptions, OrgOptions]} name={Field4} label={["OS Family", "OS Version"]} />
            <CmdbGridContainer show={[true, true, false, false]} dropdown={[true, true]} MenuItems={[OrgOptions, OrgOptions]} name={Field5} label={["Os", "License"]} />
            <CmdbGridContainer show={[true, true, false, false]} dropdown={[false, false]} MenuItems={[OrgOptions, OrgOptions]} name={Field6} label={["Os", "License"]} />
            <CmdbGridContainer show={[true, true, false, false]} dropdown={[false, false]} MenuItems={[OrgOptions, OrgOptions]} name={Field7} label={["Os", "License"]} />

        </div>
    )
}
