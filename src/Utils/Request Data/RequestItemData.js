import DeleteIcon from '@mui/icons-material/Delete';
import {
  GridActionsCellItem,
} from '@mui/x-data-grid';

export const RequestHeaderData = [
  { field: 'ID', headerName: 'ID', width: 100 },
  { field: 'Quantity', headerName: 'Quantity', width: 100 },
  // { field: 'Catalog', headerName: 'Catalog', width: 120 },
  { field: 'Item', headerName: 'Item', width: 150 },
  { field: 'DueDate', headerName: 'DueDate', width: 180 },
  { field: 'Price', headerName: 'Price', width: 130 },
  // { field: 'Assinged To', headerName: 'Assingned To', width: 130 },
  // { field: 'service', headerName: 'Service', width: 130 },
  { field: 'stage', headerName: 'Stage', width: 150 },
  {
    field: 'Delete', headerName: 'Delete', type: 'actions', width: 100, cellClassName: 'actions', getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Edit"
          className="textPrimary"
          // onClick={handleEditClick(id)}
          color="warning"
        />,
      ]
    }
  },
];


export const RequestData = [
  { ID: "RITM0001", Quantity: 2, Item: "Standard Laptop", DueDate: "2024-12-13 13:58:43", Price: "$100", stage: "waiting for approval" },
  { ID: "RITM0002", Quantity: 1, Item: "Macbook", DueDate: "2024-12-13 13:58:43", Price: "$1000", stage: "Request Approved" },
  { ID: "RITM0003", Quantity: 1, Item: "Samsung S21 FE", DueDate: "2024-12-13 13:58:43", Price: "$400", stage: "waiting for approval" },
]

export const Requestusers = [
  { value: "Mahathir Mohamed" },
  { value: "Nantha Kumar" },
  { value: "Mohamed Basith" },
  { value: "Mohamed Ziyath" },
  { value: "Rohith" },
  { value: "Ahamed Hathim" }
]
export const approvedData = [
  { value: "Approved" },
  { value: "Not yet Requested" },
  { value: "Requested" },
  { value: "Rejected" }
]


export const requesItems = [
  { label: 'Lenevo Laptop', year: 1994 },
  { label: 'Hp Elitebook', year: 1972 },
  { label: 'MacBook', year: 1974 },
  { label: 'Acer Laptop', year: 2008 },
  { label: 'Dell Laptop', year: 1957 },
]
export const requestItems = [
  { value: 'Lenevo Laptop', year: 1994 },
  { value: 'Hp Elitebook', year: 1972 },
  { value: 'MacBook', year: 1974 },
  { value: 'Acer Laptop', year: 2008 },
  { value: 'Dell Laptop', year: 1957 },
]


export const itemDetails = [
  {
    itemTitle: "HP Elitebook 840 G8", itemDescription: "The HP EliteBook 840 G8 is a high-end business laptop crafted for professionals seeking a reliable and powerful work machine. Featuring a sleek and durable aluminum chassis, it is both lightweight and portable, ideal for on-the-go use.",
    basicSpec: ["Wi-Fi 6 and Bluetooth 5.0.", "Multiple ports including USB-C, USB-A, HDMI, and a headphone/microphone combo jack.", "Optional LTE for mobile connectivity."]
  },
]

export const generationData = [
  { value: "Core i3" },
  { value: "Core i5" },
  { value: "Core i7" },
  { value: "Core i9" },
]

export const requestState = [
  { value: "Pending" },
  { value: "Open" },
  { value: "Work in Progress" },
  { value: "Closed Complete" },
  { value: "Closed incomplete" },
  { value: "Closed Skipped" },
]

export const serviceRequestType = [
  { value: "Reset password" },
  { value: "Access request" },

]


export const requestApprovers = [
  { value: "System Administrator" },
  { value: "Project Manager" },
  { value: "Lead software administrator" },
  { value: "Database administrator" },
  { value: "Devops administrator" }]

export const accessApplication = [
  { value: "Salesforce" },
  { value: "Oracle ERP Cloud" },
  { value: "Slack" },
  { value: "Github" },
  { value: "Google Drive" }
]

export const userRoles = [
  { value: "Admin" },
  { value: "User" },
  { value: "Manager" },
  { value: "Project Manager" },
  { value: "Lead Software Administrator" },
  { value: "Database administrator" },
  { value: "Devops administrator" },
  { value: "System Administrator" },
  { value: "Sales" },
  { value: "Finance" },
  { value: "Marketing" },
  { value: "Human Resource" },
  { value: "Logistics" },
  { value: "Customer Support" },
]

export const affectedServices = [
  { value: "Main production database server" },
  { value: "Web development server" },
  { value: "Web application" },
  { value: "Data integration service" },
  { value: "Backup systems" }
]