import React from 'react';
import ContentDevider from '../HelperComponents/ContentDevider';
import CmdbGridContainer from '../HelperComponents/GridContainer';

export default function BasicInfoSoftware(props) {
  return (
    <>
     <ContentDevider title={`${props.serviceType} Basic Info`}/>
     <CmdbGridContainer MenuItems={props.MenuItems1} show={[true,true,false,false]} name={props.Field0} dropdown={[false,false]} Name1={props.itemId} setName1={props.setItemId} Name2={props.itemType} setName2={props.setItemType}/>

     <CmdbGridContainer MenuItems={props.MenuItems1} show={[true,true,false,false]} name={props.Field1} dropdown={[false,false]}  Name1={props.itemName} setName1={props.setItemName} Name2={props.itemVersion} setName2={props.setItemVersion}/>

     <CmdbGridContainer MenuItems={props.MenuItems1} show={[true,true,false,false]} name={props.Field2} dropdown={[false,false]} Name1={props.itemEdition} setName1={props.setItemEdition} Name2={props.itemArchitecture} setName2={props.setItemArchitecture}/>
    </>
  )
}
