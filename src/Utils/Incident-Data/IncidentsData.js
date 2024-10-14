export const IncidentData = [
    {id:"INC0010001",Opened:"2024/04/1",ShortDescription:"Test Incident",Caller:"Nantha Kumar",Channel:"Self-Service Portals",Priority:"Low",State:"New",Category:"inquiry/Help",AssignmentGroup:"Desktop Support",AssignedTo:"Rohith",UpdatedDate:"2024/04/2"},
    {id:"INC0010002",Opened:"2024/03/1",ShortDescription:"Network Storage Unavailable",Caller:"Basith",Channel:"Phone",Priority:"High",State:"In-progress",Category:"inquiry/Help",AssignmentGroup:"Database Administration",AssignedTo:"Ziyath",UpdatedDate:"2024/04/2"},
    {id:"INC0010003",Opened:"2024/03/2",ShortDescription:"Network Down",Caller:"Indiresh",Channel:"Chat/Instant Messaging",Priority:"Low",State:"Closed",Category:"inquiry/Help",AssignmentGroup:"Desktop Support",AssignedTo:"Mohamed Basith",UpdatedDate:"2024/04/2"},
    {id:"INC0010004",Opened:"2024/03/5",ShortDescription:"Laptop Broken",Caller:"Nantha Kumar",Channel:"Phone",Priority:"Medium",State:"New",Category:"inquiry/Help",AssignmentGroup:"Server Administration",AssignedTo:"mohamed Ziyath",UpdatedDate:"2024/04/2"},
    {id:"INC0010005",Opened:"2024/03/10",ShortDescription:"Test Incident",Caller:"Basith",Channel:"Phone",Priority:"Medium",State:"on-hold",Category:"inquiry/Help",AssignmentGroup:"Desktop Support",AssignedTo:"Rohith",UpdatedDate:"2024/04/2"},
    {id:"INC0010006",Opened:"2024/03/7",ShortDescription:"Laptop Broken",Caller:"Nantha Kumar",Channel:"Chat/Instant Messaging",Priority:"Medium",State:"New",Category:"inquiry/Help",AssignmentGroup:"Application Support",AssignedTo:"mohamed ziyath",UpdatedDate:"2024/04/2"},
    {id:"INC0010007",Opened:"2024/03/8",ShortDescription:"Test Incident",Caller:"Basith",Channel:"Self-Service Portals",Priority:"Medium",State:"on-hold",Category:"inquiry/Help",AssignmentGroup:"Desktop Support",AssignedTo:"Rohith",UpdatedDate:"2024/04/2"},
    {id:"INC0010008",Opened:"2024/03/7",ShortDescription:"Laptop Broken",Caller:"Nantha Kumar",Channel:"Phone",Priority:"Medium",State:"New",Category:"inquiry/Help",AssignmentGroup:"Server Administration",AssignedTo:"mohamed ziyath",UpdatedDate:"2024/04/2"},
    {id:"INC0010009",Opened:"2024/03/8",ShortDescription:"Test Incident",Caller:"Basith",Channel:"Self-Service Portals",Priority:"Medium",State:"on-hold",Category:"inquiry/Help",AssignmentGroup:"Desktop Support",AssignedTo:"Rohith",UpdatedDate:"2024/04/2"},
  ]
export const ResolvedIncidentData = [
    {id:"INC0010001",Opened:"2024/04/1",ShortDescription:"Test Incident",Caller:"Nanda Kumar",Priority:"Low",State:"Resolved",Category:"inquiry/Help",AssignmentGroup:"Service Desk",AssignedTo:"Rohith",UpdatedDate:"2024/04/2"},
    {id:"INC0010002",Opened:"2024/03/1",ShortDescription:"Network Storage Unavailable",Caller:"Basith",Priority:"High",State:"Resolved",Category:"inquiry/Help",AssignmentGroup:"Network & Infrastructure",AssignedTo:"Ziyath",UpdatedDate:"2024/04/2"},
    {id:"INC0010003",Opened:"2024/03/2",ShortDescription:"Network Down",Caller:"Indiresh",Priority:"Low",State:"Resolved",Category:"inquiry/Help",AssignmentGroup:"Service Desk",AssignedTo:"Basith",UpdatedDate:"2024/04/2"},
    {id:"INC0010004",Opened:"2024/03/5",ShortDescription:"Laptop Broken",Caller:"Nantha Kumar",Priority:"Medium",State:"Resolved",Category:"inquiry/Help",AssignmentGroup:"Hardware",AssignedTo:"Ziyath",UpdatedDate:"2024/04/2"},
    {id:"INC0010005",Opened:"2024/03/10",ShortDescription:"Test Incident",Caller:"Basith",Priority:"Medium",State:"Resolved",Category:"inquiry/Help",AssignmentGroup:"Service Desk",AssignedTo:"Rohith",UpdatedDate:"2024/04/2"},
    {id:"INC0010006",Opened:"2024/03/7",ShortDescription:"Laptop Broken",Caller:"Nantha Kumar",Priority:"Medium",State:"Resolved",Category:"inquiry/Help",AssignmentGroup:"Hardware",AssignedTo:"Ziyath",UpdatedDate:"2024/04/2"},
  ]

export const IncidentHeaderData = [
    { field: 'incidentId', headerName: 'ID', width: 100 },
    { field: 'openedDate', headerName: 'Opened', width: 100 },
    { field: 'configurationItem', headerName: 'Configuration Item', width: 120 },
    { field: 'caller', headerName: 'Caller', width: 120 },
    { field: 'channel', headerName: 'Channel', width: 120 },
    { field: 'priority', headerName: 'Priority', width: 130 },
    { field: 'state', headerName: 'State', width: 130 },
    { field: 'service', headerName: 'Service', width: 130 },
    { field: 'serviceCategory', headerName: 'Service Category', width: 130 },
    { field: 'subCategory', headerName: 'Category', width: 130 },
    { field: 'assignment', headerName: 'Assignment Group', width: 150 },
    { field: 'assignmentTo', headerName: 'Assigned To', width: 130 },
    { field: 'updatedDate', headerName: 'Updated Date', width: 130 },
  ];



  export const OpenIncidentData = [
    {id:"INC0010001",Opened:"2024/04/1",ShortDescription:"Test Incident",Caller:"Nanda Kumar",Priority:"Low",State:"New",Category:"inquiry/Help",AssignmentGroup:"Service Desk",AssignedTo:"empty",UpdatedDate:"2024/04/2"},
    {id:"INC0010009",Opened:"2024/03/8",ShortDescription:"Test Incident",Caller:"Basith",Priority:"Medium",State:"on-Hold",Category:"inquiry/Help",AssignmentGroup:"Service Desk",AssignedTo:"empty",UpdatedDate:"2024/04/2"},
    {id:"INC0010009",Opened:"2024/03/8",ShortDescription:"Test Incident",Caller:"Ziyath",Priority:"Medium",State:"on-Hold",Category:"inquiry/Help",AssignmentGroup:"Service Desk",AssignedTo:"empty",UpdatedDate:"2024/04/2"},
    {id:"INC0010009",Opened:"2024/03/8",ShortDescription:"Test Incident",Caller:"Rohith",Priority:"Medium",State:"on-Hold",Category:"inquiry/Help",AssignmentGroup:"Service Desk",AssignedTo:"empty",UpdatedDate:"2024/04/2"},
  ]


  export const AssignedToMeIncidentData = [
    {id:"INC0010001",Opened:"2024/04/1",ShortDescription:"Test Incident",Caller:"Nanda Kumar",Priority:"Low",State:"New",Category:"inquiry/Help",AssignmentGroup:"Service Desk",AssignedTo:"Rohith",UpdatedDate:"2024/04/2"},
    {id:"INC0010009",Opened:"2024/03/8",ShortDescription:"Test Incident",Caller:"Basith",Priority:"Medium",State:"on-Hold",Category:"inquiry/Help",AssignmentGroup:"Service Desk",AssignedTo:"Rohith",UpdatedDate:"2024/04/2"},
  ]
  export const OpenUnAssignedIncidentData = [
    {id:"INC0010001",Opened:"2024/04/1",ShortDescription:"Test Incident",Caller:"Nanda Kumar",Priority:"Low",State:"New",Category:"inquiry/Help",AssignmentGroup:"Service Desk",AssignedTo:"Empty",UpdatedDate:"2024/04/2"},
    {id:"INC0010009",Opened:"2024/03/8",ShortDescription:"Test Incident",Caller:"Basith",Priority:"Medium",State:"on-Hold",Category:"inquiry/Help",AssignmentGroup:"Service Desk",AssignedTo:"Empty",UpdatedDate:"2024/04/2"},
  ]


