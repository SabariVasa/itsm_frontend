import React, { useState, useEffect } from 'react';
import CardContainer from '../Components/HelperComponents/CardContainer';
import ContentDevider from '../Components/HelperComponents/ContentDevider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GlobalService from '../services/GlobalService';
import { resturls } from '../global/utils/apiurls';
import CmdbShowDetails from './CMDB/CmdbShowDetails';
import DefaultLoader from '../global/commonComponents/DefaultLoader';



export default function CMDB() {
  const [categoryType, setCategoryType] = React.useState({ category: '', core: '' });
  const [cmdbHardwareRequirements, setCmdbHardwareRequirements] = useState();
  const [cmdbSoftwareRequirements, setCmdbSofwareRequirements] = useState();
  const [loader, setLoader] = useState(false);

  async function getAllItems() {
    setLoader(true);
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage, data } = respdata
        console.log(respdata, 'respdataCMDB');
        setCmdbHardwareRequirements(data.Hardware);
        setCmdbSofwareRequirements(data.Software);
        setLoader(false);
      }, resturls.classCatecoryItems, {}, 'GET',
    );
  }

  useEffect(() => {
    getAllItems();
  }, []);
  console.log(categoryType.category, 'cmdbDetails');
  return (
    <>
      {loader && <DefaultLoader />}
      {categoryType.category && <ArrowBackIcon onClick={() => setCategoryType({ category: '', core: '' })} />}
      {!categoryType.category && setLoader ? (
        <>
          <div className='mb-5'>
            <ContentDevider title="Infrastructure" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdV1ErgRrQcHORTgFsqwJTS7K8kBZYHo36mQ&s" />
          </div>
          <div>
            <CardContainer setCmdbData={setCmdbHardwareRequirements} categoryType={categoryType} setCategoryType={setCategoryType} CmdbData={cmdbHardwareRequirements} />
          </div>
          <div className='mb-5'>
            <ContentDevider title="Software and Applications" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpKNu9lkRPu5EHa6CEQS1QDl8TCg2swH0Jfw&s" />
          </div>
          <div>
            <CardContainer setCmdbData={setCmdbSofwareRequirements} categoryType={categoryType} setCategoryType={setCategoryType} CmdbData={cmdbSoftwareRequirements} />
          </div>
        </>
      ) : (
        <CmdbShowDetails category={categoryType.category} />
      )}
    </>
  )
}
