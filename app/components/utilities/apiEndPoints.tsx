export default {
  JWTTOKEN: "token/jwtToken",
  LOGIN: "auth/userLogin",
  LOGOUT: "auth/userLogout",
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
  FIREBASE_UPDATE: '/auth/firebaseIdUpdate',
  // FIREBASE_DATABASE_URL: "https://justo-d8d17-default-rtdb.firebaseio.com/",
  FIREBASE_DATABASE_URL: "https://justo-37d73-default-rtdb.firebaseio.com/",

  //Dashbaord 
  GET_DASHBOARD_CP: 'dashboard/dashboardDetailCP',
  USER_STATUS_UPDATE: 'auth/userOnlineStatusUpdate',
  GENERATE_QR_CODE: '/channelPartner/genrateQrCode',
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
  PROPERTYLIST: "/property/getPropertyListForCP",
  PROPERTYFILTER: "/property/getPropertyListForCP",
  GET_ALLOCATE_PROPERTY: "/property/getAllProperty",
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


  //Lead Management
  VISITORLIST: "/visit/getVisiterList",
  GET_VISITOR_DETAIL_: "/visit/getVisitDetails",
  VISITOR_STATUS_UPDATE: "/visit/updateVisitStatus",
  GET_USERVISTLIST: '/visit/getUserVisitList',
  ADD_VISITOR_: "/visit/addVisit",
  CHECK_VISIT_AVAILABLE: "/visit/customerCheckForMobile",
  EDIT_VISITOR_: "/visit/editVisit",
  UPLOAD_IMAGE: "/visit/bulkVisitImageUpload",
  UPLOAD_CSVFile: "/visit/bulkVisitCsvUpload",
  GET_BULK_CSVFILE: "/visit/getBulkVisitCsvFile",
  GET_BULK_VISIT_LIST: "/visit/getBulkVisitList",
  GET_BULK_VISIT_VERIFY: "/visit/getBulkVisitVerifyCustomerList",
  CREATE_VISIT_WITHOUT_PROPERTY: '/visit/addVisitProperty',



  // Follow-Up
  GET_FOLLOWUP_LIST: '/followupStatus/getFollowupList',
  GET_FOLLOWUP_DETAILS: '/followupStatus/getFollowupDetails',
  UPDATE_FOLLOWUP: '/followupStatus/updatefollowup',
  ADD_FOLLOWUP: '/followupStatus/addfollowup',

  // Appointment
  GET_APPOINTMENT_LIST: '/appointment/getAppointmentList',
  GET_APPOINTMENT_DETAILS: '/appointment/getAppointmentDetails',
  ADD_APPOINTMENT: '/appointment/addAppointment',
  EDIT_APPOINTMENT: '/appointment/editAppointment',

  GET_USER_APPOINTMENT_LIST: '/userAppointment/getUSerAppoinmentList',
  UPDATE_USER_APPOINTMENT_STATUS: '/userAppointment/userAppointmentStatusUpdate',

  //Settings
  UPDATECHANNELPARTNER: "/channelPartner/updateChannelPartner",
  NOTIFICATION_LIST: "/notification/getNotificationList",
  DELETE_NOTIFICATION: "/notification/statusUpdateNotification",

  //Support Forum
  GET_SUPPORT_FORUM_LIST: '/supportForum/supportForumList',
  GET_SUPPORT_FORUM_DETAIL: '/supportForum/getSupportForumDetails',
  UPDATE_SUPPORTFORUM: '/supportForum/statusUpdateSupportForum',

  //LeaderBoard
  GET_LEADERBOARD: '/leaderboard/getActivePropertyListForLeaderboard',
  GET_LEADERBOARD_DETAIL: '/leaderboard/getPropertyLeaderboardDetails',
  // Chat management
  GET_PROPERTY_LIST_FOR_CHAT: '/chat/getCpActivePropertyList',
  GET_ALL_CHAT_IN_PROPERTY: '/chat/getPropertyUserListForChat',
  UPDATE_CHAT_STATUS: '/chat/userChatStatusUpdate',

  //Permission
  PERMISSION_MODULE: "/userManage/getUsermodels",

  // Raise Ticket (Support)
  ADD_TICKET: '/support/addSupport',
  EDIT_TICKET: '/support/updateSupport',
  TICKET_LIST: '/support/getSupportList',
  TICKET_DETAILS: '/support/getTicketDetail',
  TICKET_STATUS_UPDATE: '/support/replySupportTicket',
  GET_SUPPORT_USER_LIST: '/support/getSupportUserList',
  ESCALATE_REQ_TICKET: '/support/escalateRequestTicket',

  //Deal Flow
  GET_DEAL_FLOW_LIST: '/dealFlow/getActivePropertyListForDealFlow',
  GET_DEAL_FLOW_DETAIL: '/dealFlow/getPropertyDealFlowDetails',
};
