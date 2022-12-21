import LocalizedStrings from 'react-native-localization';

const strings = new LocalizedStrings({
  en: {
    signInText: 'SIGN IN',
    justo: 'Justo',
    notificationHeader: 'Notification',
    dashboardHeader: 'Dashboard',
    registrationHeader: 'Registration',
    companyDetails: 'Company Information',
    registernow: 'register now',
    propertyHeader: 'Property',
    propertyManagementHeader: 'Property Management',
    agencyHeader: 'Agent Management',
    agencyHeaderpending: 'Pending Agent',
    leadManagementHeader: 'Lead Management',
    appointmentWithCPHeader: 'Appointment With CP',
    appointmentForVisitHeader: 'Appointments',
    reportHeader: 'Report',
    leaderHeader: 'Leaderboard',
    dataflowHeader: 'Data Flow',
    chatHeader: 'Chat',
    supportHeader: 'Support',
    supportforumHeader: 'Support Forum',
    supportforumDtlHeader: 'Support Forum Detail',
    searchSupportForum: 'Search Support Forum',
    settingHeader: 'Setting',
    logout: 'Logout',
    versionText: 'version',
    forgotPassword: 'Forgot Password?',
    newUserText: 'New User?',
    signUp: 'Sign Up',
    byCreating: 'By Signing up you agree to our',
    termsAndCondition: 'Terms & Conditions',
    and: 'and',
    privacyPolicy: 'Privacy Policy',
    ofJusto: 'of Justo.',
    basicInfoText: 'Basic Information',
    active: 'Active',
    view: 'View',
    unsubscribe: 'Unsubscribe',
    subscribe: 'Subscribe',
    propertyDetailHeader: 'Property Detail',
    confirmation: 'Confirmation',
    ConfirmationModalTxt: 'Select the reason for\r\nunsubscribe this property.',
    Confirm: 'Confirm',
    searchProperty: 'Search Property',
    playVideo: 'Play',
    apply: 'APPLY',
    reset: 'RESET',
    resend: 'Resend',
    notRecived: `Didn't receive the code?`,
    codeSent: 'A verification code has been sent to',
    your: 'your email address',
    email: '',
    otpVerification: 'OTP VERIFICATION',
    imagecontentHeader: 'Images',
    videocontentHeader: 'Videos',
    cataloguecontentHeader: 'Catalogue',
    createVisit: 'CREATE VISIT',
    gender: "Gender :",
    male: "Male",
    female: "Female",
    next: 'next',
    addnewagent: 'Add new Agent',
    pendingconfirm: 'Pending Confirm',
    edit: 'Edit',
    deactive: 'Deactive',
    agentdetail: 'Agent Detail',
    userbankinfo: 'User Bank Info',
    createnewagency: 'Create New Agency',
    sendotp: 'Send OTP',
    forgotPasswordHeader: 'Forgot Password',
    visitor: 'Visitor',
    bulkupload: 'Bulk Upload',
    uploadCSV: 'Upload CSV',
    uploadimage: 'Upload Image',
    addnewvisitor: 'Add New Visitor',
    editVisitor: 'Update Visitor',
    visitordetails: 'Visitor Details',
    searchvisitor: 'Search Visitor',
    propertyrequire: 'Property Require',
    createVisitor: 'Create Visitor',
    createandschedule: 'Create & schedule',
    propertyrequired: 'Property Required',
    Customerdetails: 'Customer Details',
    companydetails: 'Company Details',
    Statusupdate: 'Status Update',
    ScheduleSitevisite: 'Schedule Site Visite',
    followupHeader: 'Follow-up',
    followupDetails: 'Follow-Up Detail',
    searchfollowup: 'Search Follow-Up',
    allfollowup: 'All Followup',
    editfollowup: 'Edit Follow-Up',
    followup: 'Follow-Up',
    no: 'No',
    yes: 'Yes',
    agent: 'Agent',
    createAgent: 'Create Agent',
    editAgent: 'Edit Agent',
    searchAgent: 'Search Agent',
    searchLocation: 'Search Location',
    updatepassword: 'Update Password',
    deactivconfirmation: 'Are You sure you want to Deactive this',
    activconfirmation: 'Are You sure you want to Active this',
    update: 'Update',
    call: 'Call',
    status: 'Status',
    registration: 'registration',
    addLocation: 'Add Locations',
    notSelectedLocation: 'Not Selected Location',
    searchYourlocation: 'Search your location here',
    comingSoon: 'Coming Soon',
    share: 'Share',

    //Auth 

    usernamepasswordempty: 'Username and Password is require. Please enter Username and password',
    correctemail: 'Enter correct Email Address',
    usernamerequired: 'Username is require. Please enter username',
    passwordrequired: 'Password is require. Please enter password',
    emailrequired: 'Email is require. Please enter email',
    otprequired: 'Enter your OTP',
    passwordnotmatch: 'Password and Confirm Password not match !',
    requiredpassword: 'Enter your Password and Confirm Password',
    requiredField: 'All Password field are required',


    // Appointment
    appointmnet: 'Appointmnet',
    appointmnetdetail: 'Appointmnet Detail',
    updatestatus: 'Update Status',
    searchappointment: 'Search Appointment',
    addNewappointment: 'Add Appointment',
    editNewappointment: 'Edit Appointment',
    selectLead: 'Select Lead',
    selectproperty: 'Select Property',
    appointmentDate: 'Appointment Date',
    appointmentTime: 'Appointment Time',
    location: 'Location',
    noofguest: 'No. of Guest',
    pickupAppointment: 'PickUp(if add property time set yes)',
    VisitorAppointment: 'Visitor Appointment',
    SMAppointment: 'SM Appointment',

    rerainfo: 'RERA Information',
    setting: "Setting",
    userRole: "USER ROLE",
    channelPartner: 'CHANNEL PARTNER',
    updateProfile: 'UPDATE PROFILE',
    editProfile: 'Edit Profile',
    changePassword: 'Change Password',
    copyLink: 'Copy Link',

    // COMMOM
    cameraHeader: 'Camera',
    galleryHeader: 'Gallery',
    browse: 'Browse',

    // PERMISSION
    txt_setting_heading_media: 'Justo Would Like to Access Your Photos',
    txt_setting_heading_camera: 'Justo Would Like to Access the Camera',
    txt_setting_heading_contact: 'Justo Would Like to Access Your Contacts',
    txt_setting_heading_location: 'Justo Would Like to Access Your location',
    txt_setting_heading_microPhone: 'Justo Would Like to Access Your MicroPhone',
    txt_setting_description_contact:
      'To allow this, tap Settings below and turn on Contacts.',
    txt_setting_description_microPhone:
      'To allow this, tap Settings below and turn on MicroPhone.',
    txt_setting_description_camera:
      'To allow, tap on Settings and turn on Camera.',
    txt_setting_description_location:
      'To allow, tap on Settings and turn on location.',
    txt_setting_description_media: 'To allow, tap on Settings and turn on Photos.',
    txt_setting_access:
      'Justo does not have access. To enable access, tap on Settings and turn on the permissions.',
    txt_setting_camera:
      'Justo does not have access to your camera. To enable access, tap on Settings and turn on Camera.',
    txt_setting_media:
      'Justo does not have access to your media. To enable access, tap on Settings and turn on Media.',
    txt_setting_media_camera:
      'Justo does not have access to your camera and media. To enable access, tap on Settings and turn on Camera and Media.',
    txt_setting_contact:
      'Justo does not have access to your contact. To enable access, tap on Settings and turn on Contacts.',
    txt_setting_Location:
      'Justo does not have access to your Location. To enable access, tap on Settings and turn on Location.',

    notfount: 'Not Found',
  },
});

export default strings;
