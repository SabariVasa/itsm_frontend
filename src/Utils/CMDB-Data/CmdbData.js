import { Link } from "react-router-dom";

export const CmdbData = [
    {
        "Card Title":"Server",
        "Total":5,
        "Category":"Server",
        "img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdV1ErgRrQcHORTgFsqwJTS7K8kBZYHo36mQ&s",
        "path":"/create-server"
    },
    {
        "Card Title":"Network Devices",
        "Total":8,
        "Category":"NetworkDevice",
        "img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy10fRFZpXzSTcS0Pdv3gh5zVu6_10dwQ6ww&s",
        "path":"/create-network-devices"
    },
    {
        "Card Title":"Storage",
        "Total":8,
        "Category":"StorageDevice",
        "img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_P4wNxywgY5oILUbQKQJE9GylZLSw_WYYqQ&s",
        "path":"/create-network-devices"
    },
    {
        "Card Title":"Desktop/Laptop",
        "Total":8,
        "Category":"DesktopDevice",
        "img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRPE5TO6RHexqGUJyV-7OigswPCgHHs8mh0A&s",
        "path":"/create-network-devices"
    },
]
export const SoftwareData = [
    {
        "Card Title":"Operating System",
        "Total":10 ,
        "Category":"Operating System",
        "img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpKNu9lkRPu5EHa6CEQS1QDl8TCg2swH0Jfw&s",
        "path":"/create-pc-softwares"
    },
    {
        "Card Title":"Applications",
        "Category":"Application",
        "Total":2 ,
        "img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi60D5Jc7JDZhwZQZlLdX75ED6zdQiNV2vRg&s",
        "path":"/create-web-application"
    },
    {
        "Card Title":"Database",
        "Category":"Database",
        "Total":5,
        "img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI4-Qw-ktt_GVLUT4p6w1pM4CGWRRlkOIlAg&s",
        "path":"/create-database-schema"
    },
]

export const OtherData = [
    {
        "Card Title":"Network Interface",
        "Total":4,
        "img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT60x9f-pBYfGOqfa_Yz-fB55ja1ShJs6QzCg&s"
    },
    {
        "Card Title":"Subnets",
        "Total":6,
        "img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBp97dDdw_rPwEFsui431XRRv9ORUMUVoA2A&s"
    },
    {
        "Card Title":"VLANS",
        "Total":10,
        "img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxb94M3sNAY25bEgCDA2Li1l-8RASm-3qnxg&s"
    },
]

export const CMDBheaderData=[
  {field:'itemName',headerName:'Item Name',width:160,renderCell: (params) => {
    return <a href={`/CMDBEditPage/${params.row.itemCategory}/${params.id}`}>{params.row.itemName}</a>;
  }},
  {field:'itemType',headerName:'Item Type',width:160},
//   {field:'managementIpaddress',headerName:'Ip Address',width:160},
  {field:'warrantyStart',headerName:'Warranty Start',width:160},
  {field:'warrantyEnd',headerName:'Warranty End',width:160},
  {field:'contactPerson',headerName:'Contact Person',width:160},
  {field:'manufacturerName',headerName:'Manufacturer Name',width:160},
]

export const requestHeaderData = [
    {field:'itemId',headerName:'Item ID',width:160},
    {field:'itemModel',headerName:'Item Model',width:160,renderCell: (params) => {
        return <a href={`/request_item/${params.id}?itemData=${JSON.stringify(params.row)}&&requestData=${JSON.stringify(params.row.Item)}`}>{params.row.itemModel}</a>;
      },},
    {field:'itemBrand',headerName:'Manufacturer Name',width:160},
//   {field:'managementIpaddress',headerName:'Ip Address',width:160},
  {field:'location',headerName:'Location',width:160},
  {field:'stockAvailable',headerName:'Stock Available',width:160},
  {field:'cost',headerName:'Item Price',width:160},
  {field:'contactPerson',headerName:'Contact Person',width:200},
  {field:'deliveryEstimation',headerName:'Delivery Estimation in Days',width:200},
  {field:'modelDescription',headerName:'Short Description',width:260}
]


export const SoftwareHeaderData = [
    { field: 'itemId', headerName: 'Item ID', width: 200, renderCell: (params) => (
        <Link href={`/IncidentEditPage/${params.id}`} underline="none" color="inherit">
          {params.value}
        </Link>
      ),
    },
    { field: 'itemName', headerName: 'Item Name', width: 200 },
    { field: 'itemType', headerName: 'Item Type', width: 200 },
    { field: 'itemEdition', headerName: 'Item Edition', width: 200 },
    { field: 'itemArchitecture', headerName: 'Item Architecture', width: 150 },
  ];