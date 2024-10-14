import { restbaseurl } from './constants';

export const resturls = {
  obtainFavIconAndTitle: 'auth_services/obtainFavIconAndTitle',
  obtainManualPublishDetails: 'corporateTrainingBatch/obtainManualPublishDetails',
  login: 'auth_services/login_user',
  getUserDetails: 'auth_services/get_all_users',
  allIncident: '/incident_service/all_incident',
  getOpenIncident: '/incident_service/get_open_incident',
  getIncidentByAssignedTo: '/incident_service/get_incident_by_assignedto/',
  getAllServers: 'cmdb_service/get_all_servers/',
  getAllItems: '/cmdb_service/get_all_items',
  postConfigurationItem: '/cmdb_service/post_configuration_item',
  postSoftwareConfigurationItem: '/cmdb_service/post_software_item',
  CreateClass: '/cmdb_service/create_class',
  obtainItemRequirementList: 'cmdb_service/fetch_class_names_and_ids_by_item_requirement',
  classCatecoryItems: '/cmdb_service/fetch_class_categories',
  obtainFormFieldData: '/cmdb_service/fetch_class_category',
  createNewIncident: '/incident_service/create_end_user_incident',
  CreateClassInstance: '/cmdb_service/create_class_instance',
  addUser: '/auth_services/add_user',
  obtainCategoryInstance:'/cmdb_service/fetch_class_instances_by_category_id'
};

export const successurl = `${restbaseurl}student/success`;
export const failureurl = `${restbaseurl}student/failure`;

export const dummyurl = 'http://dummy.restapiexample.com/api/v1/employees';
