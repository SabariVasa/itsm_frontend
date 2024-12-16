class UserInfo {
  // Initialize static properties with data from localStorage or defaults
  static ses_username = localStorage.getItem('ses_username') || '';
  static ses_role = localStorage.getItem('ses_role') || '';
  static ses_userid = localStorage.getItem('ses_userid') || '';
  static ses_group = JSON.parse(localStorage.getItem('ses_group')) || [];
  static ses_organization_id = localStorage.getItem('ses_organization_id') || '';

  static getUsername = () => UserInfo.ses_username;

  static getRole = () => UserInfo.ses_role;

  static getUserid = () => UserInfo.ses_userid;

  static getGroup = () => UserInfo.ses_group;

  static getOrganizationId = () => UserInfo.ses_organization_id;

  static getUserDetail = () => ({
    email: UserInfo.ses_username,
    id: UserInfo.ses_userid,
    role_name: UserInfo.ses_role,
    group: UserInfo.ses_group,
    organization_id: UserInfo.ses_organization_id,
  });

  static setUserDetail = (inp) => {
    // console.log(inp, 'inp');
    UserInfo.ses_username = inp.sub;
    UserInfo.ses_userid = inp.userId;
    UserInfo.ses_role = inp.userRole;
    UserInfo.ses_group = inp.role_segment || [];
    UserInfo.ses_organization_id = inp.organizationId || '';

    // Save to localStorage for persistence
    localStorage.setItem('ses_username', UserInfo.ses_username);
    localStorage.setItem('ses_userid', UserInfo.ses_userid);
    localStorage.setItem('ses_role', UserInfo.ses_role);
    localStorage.setItem('ses_group', JSON.stringify(UserInfo.ses_group));
    localStorage.setItem('ses_organization_id', UserInfo.ses_organization_id);
  };

  static printInfo = () =>
    `${UserInfo.ses_username},${UserInfo.ses_role},${UserInfo.ses_userid},${UserInfo.ses_group},${UserInfo.ses_organization_id}`;

  static clear = () => {
    UserInfo.ses_username = '';
    UserInfo.ses_role = '';
    UserInfo.ses_userid = '';
    UserInfo.ses_group = [];
    UserInfo.ses_organization_id = '';

    // Remove data from localStorage
    localStorage.removeItem('ses_username');
    localStorage.removeItem('ses_userid');
    localStorage.removeItem('ses_role');
    localStorage.removeItem('ses_group');
    localStorage.removeItem('ses_organization_id');
  };
}

export default UserInfo;
