class UserInfo {
  constructor() {
    this.ses_username = '';
    this.ses_role = '';
    this.ses_userid = '';
  }

  static getUsername = () => this.ses_username;

  static getRole = () => this.ses_role;

  static getUserid = () => this.ses_userid;

  static getUserDetail = () => ({
    email: this.ses_username,
    id: this.ses_userid,
    role_name: this.ses_role,
  });

  static setUserDetail = (inp) => {
    this.ses_username = inp.sub;
    this.ses_userid = inp.id;
    this.ses_role = inp.userRole;
  }

  static printInfo = () => `${this.ses_username},${this.ses_role},${this.ses_userid}`;

  static clear = () => {
    this.ses_username = '';
    this.ses_role = '';
    this.ses_userid = '';
  }
}

export default UserInfo;
