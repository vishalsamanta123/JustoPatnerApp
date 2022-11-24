export default {
  JWTTOKEN: "token/jwtToken",
  LOGIN: "auth/userLogin",
  // USER REGISTER AND ADD USER API BOTH ARE SAME
  FORGOTPASSWORD: "/auth/forgotPassword",
  OTPVERIFY: "/auth/otpVerify",
  RESENDOTP: "/auth/resentOtp",
  UPDATEPASSWORD: "/auth/updatePassword",
  CHANGEPASSWORD: "/auth/changePassword",
  REGISTERANDADDUSER: "/auth/userRegister",
  GETUSERLIST: "userManage/getUserList",
  GETUSERDETAIL: "/userManage/getUserDetail",
  GETUSERFILTERDATA: "/userManage/getUserFilterData",
  EDITUSER: "/auth/editUserProfile",
  USERSTATUSUPDATE: "/userManage/userStatusUpdate",

  // CREATE CHANNEL PARTNER
  CREATECHANNELPARTNER: '/channelPartner/createChannelPartner',
  CHECKEMAILMOBILE: '/auth/checkEmailMobile',
  GET_SOURCINGMANAGER: '/channelPartner/getListSourcingManager',


  // MASTER START
  ADDMASTERLIST: "/master/getMasterList",
  CREATEMASTER: "/master/createMaster",
  GETPROPERTYTYPE: "/master/getPropertyType",
  GETCONFIGURATION: "/master/getConfiguration",
  GETAMENITY: "/master/getAmenity",
  //MASTER END

  // ROLE START
  GETROLE: "/role/getRoles",
  // POSTROLEDETAIL:"/role/getRoles",
  GETROLEMODULES: "/role/getModules",
  CREATEROLE: "/role/createRole",
  GETMODULESLIST: "/role/getModulesList",
  CREATEMODULE: "/role/createModules",
  // ROLE END

  // property Start
  ADDPROPERTY: "/property/addProperty",
  PROPERTYLIST: "/property/getAllProperty",
  PROPERTYFILTER: "/property/filterProperty",
  EDITPROPERTY: "/property/editProperty",
  GETPROPERTYDETAIL: "/property/getPropertyDetails",
  GETPROPERTYFILTERDETAIL: "/property/filterProperty",
  PROPERTYSTATUSUPDATE: "/property/propertyStatusUpdate",
  PROPERTYSUBSCRIBE: "/property/userSubscribeUnsubscribeProperty",
  // property End

  // getFollowUp API
  GETFOLLOWUP: "/followup/getFollowUp",


  //Agent Management
  AGENTLIST: "/channelPartner/getchannelPartnerList",
  GET_AGENT_DETAIL_: "/channelPartner/getChannelPartnersDetails",
  AGENT_STATUS_UPDATE: "/channelPartner/ApproveChannelpartnerbysourcinghead",
  ADD_AGENT_: "/channelPartner/createAgent",
  EDIT_AGENT_: "/channelPartner/editAgent",


  //Agent Management
  VISITORLIST: "/visit/getVisiterList",
  GET_VISITOR_DETAIL_: "/visit/getVisitDetails",
  VISITOR_STATUS_UPDATE: "/visit/updateVisitStatus",
  ADD_VISITOR_: "/visit/addVisit",
  EDIT_VISITOR_: "/visit/editVisit",

  // Folloe-Up
  GET_FOLLOWUP_LIST: '/followupStatus/getFollowupList',
  GET_FOLLOWUP_DETAILS: '/followupStatus/getFollowupDetails',
  UPDATE_FOLLOWUP: '/followupStatus/updatefollowup',

  //Settings
  UPDATECHANNELPARTNER: "/channelPartner/updateChannelPartner"
};
