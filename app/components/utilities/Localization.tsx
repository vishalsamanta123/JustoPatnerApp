import LocalizedStrings from 'react-native-localization';

const strings = new LocalizedStrings({
  en: {

    //common
    todayCompVisit: "Today Complete Visits",
    totalVisitor: "Total Visitor",
    totalSiteVisit: "Total Site Visit",
    totalCloserVisit: "Total Closer Visit",
    lastLogin: "Last Login",
    createBy: 'Create By',
    todayLead: 'Today Leads',
    visitorScore: "Visitor Score",
    byvisitorscore: 'By Visitor Score',
    RERA: 'RERA',
    shortNum: 'No.',
    closingPrcntg: 'Closing Percentage',
    last: 'Last',
    leadCreate: 'Lead Create',
    siteVisit: 'Site Visit',
    closeVisit: 'Close Visit',
    name: 'Name',
    mobileNo: 'Mobile No.',
    email: 'Email',
    whatsappNo: 'Whatsapp No.',
    aadhar: 'Aadhaar',
    pancard: 'Pancard',
    joinNow: 'Joining Now',
    workingLocation: 'Working Location',
    reraCertificate: 'RERA Certificate',
    proprietorDeclarLttr: 'Proprietorship Declaration Letter',
    cancelCheque: "Cancel Cheque",
    dateOfBirth: 'Date of Birth',
    cpCapital: 'CP',
    january: 'Januray',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
    target: 'Target',
    total: 'Total',
    numberOf: 'No',
    number: 'Number',
    added: 'Added',
    bankDetail: 'Bank Details',
    bankName: "Bank Name",
    branchName: "Branch Name",
    account: "Account",
    accountNo: "Account No.",
    ifscCode: "IFSC Code",
    cheque: 'Cheque',
    agent: 'Agent',
    agency: 'Agency',
    aadhaar: 'Aadhaar No.',
    mobile: 'Mobile',
    whatsApp: 'WhatsApp',
    address: 'Address',
    realEstateCom: "RealeEstate Company",
    gst: "GST",
    declrLttrCom: "Decalaration Letter of Company",
    comment: 'Comment',
    workingFrom: 'Working from',
    searchCity: 'Search City',
    createLead: 'Create Lead',
    info: 'Info',
    stats: 'Stats',
    budget: 'Budget',
    interested: 'Interested',
    source: 'Source',
    score: 'Score',
    totalCloseVisit: 'Total Closer Visit',
    information: 'Information',
    startDate: "Start Date",
    endDate: "End Date",
    searchBy: "Search by",
    pickupLocation: 'PickUP Location',
    dropupLocation: 'Drop Up Location',
    area: 'Area',
    reScheduled: "ReScheduled",
    appointMentCancl: "Appointment Cancel",
    description: "Description",
    followUpBy: "Follow-up By",
    dateTime: "Date & Time",
    createdDate: "Created Date",
    visit: "Visit",
    customer: "Customer",
    configurations: 'Configurations',
    resion: "Resion",
    remark: "Remark",
    pickup: "PickUp",
    byStatus: "By Status",
    date: "Date",
    time: "Time",
    appointmentType: "Appointment Type",
    appointmentWith: "Appointment With",
    leadNo: "Lead No.",
    lead: "Lead",

    //Status Keys
    STSNotVisited: "Not Visited",
    STSUpComing: "Upcoming",
    STSCompleted: "Completed",
    STSVisitCancelled: "Visit Cancelled",
    STSNotFitForSale: "Not Fit for Sale",
    STSReVisit: "ReVisit",
    STSRescheduled: "ReScheduled",
    STSPending: "Pending",
    STSConfirm: 'Confirm',
    STSComplete: 'Complete',
    STSAppointMentCancl: 'AppointMent Cancel',
    STSClose: 'Close',

    //validations
    reasonSelectVal: 'Please select the Reason',
    agentNameReqVal: 'Agent Name is require. Please enter Agent Name',
    aadharReqVal: 'Aadhaar No. is require. Please enter Aadhaar No.',
    aadharValidVal: 'Please enter the valid Aadhaar number',
    pancardReqVal: 'Pancard No. is require. Please enter Pancard No.',
    pancardValidVal: 'Please enter the valid PanCard number',
    genderReqVal: 'Gender is require. Please enter Gender',
    dateOfBirthReqVal: 'Date of Birth is require. Please enter Date of Birth',
    mobileNoReqVal: 'Mobile No. is require. Please enter Mobile No.',
    whatsappNoReqVal: 'WhatsaApp No. is require. Please enter WhatsaApp No.',
    emailReqVal: 'Email is require. Please enter Email',
    correctEmailReqVal: 'Please enter correct email format',
    addressReqVal: 'Address is require. Please enter Address',
    workingLocationReqVal: 'Please select Working Location',
    wrkngLocReqVal: 'Working Location is require. Please enter Working Location',
    reraCertNoReqVal: 'RERA Certificate No. is require. Please enter RERA Certificate No.',
    reraCertImgReqVal: 'RERA Certificate Image is require. Please Choose RERA Certificate Image',
    noReraRegReqVal: 'If you have not RERA certificate. Please click on no registerd for RERA',
    propDeclrLttrImgReqVal: 'Proprietorship Declaration Letter Image is require. Please Choose Proprietorship Declaration Letter Image',
    cancelChqImgReqVal: 'Cancel Cheaque Image is require. Please Attach Cancel Cheaque Image',
    bankNameReqVal: 'Bank Name is require. Please enter Bank Name',
    branchNameReqVal: 'Branch Name is require. Please enter Branch Name',
    accountNoReqVal: 'Account No. is require. Please enter Account No.',
    ifscReqVal: 'IFSC Code is require. Please enter IFSC Code',
    agencyNameReqVal: 'Agency Name is require. Please enter Agency Name',
    gstReqVal: 'GST No. is require. Please enter GST No.',
    comPanCardImgReqVal: 'Company pancard Image is require. Please Choose Company pancard',
    declLttrComImgReqVal: 'Declaration letter of company Image is require. Please Choose Declaration letter of company',
    reraRegstrReqVal: 'RERA Registration is require. Please enter RERA Registration',
    selectSMReqVal: 'Please Select the SM',
    leadReqVal: "Lead is require. Please Select the lead Status",
    propertyReqVal: "Property is require. Please select property name",
    appointMentDateReqVal: "Appointment Date is require. Please Select the Appointment Date Status",
    appointMentTimeReqVal: "Appointment Time is require. Please Select the Appointment Time Status",
    pickupLocationReqVal: "Pickup Location is require. Please Select the Pickup Location",
    pickupAreaReqVal: "Pickup Area is require. Please Select the Pickup Area",
    noOfGuestReqVal: "Number Of Guest is require. Please Enter the Number Of Guest",
    followUpStatusReqVal: "Followup Status is require. Please Choose Followup Status",


    //Select Heads
    selectAgncyTrnsfr: 'Select Agency to Transfer all visitors',
    noReraRegistr: 'No Registerd for RERA',
    selectStatus: "Select Status",
    selectLead: 'Select Lead',
    selectproperty: 'Select Property',
    selectTheSm: 'Select The SM',


    signInText: 'SIGN IN',
    justo: 'Justo',
    notificationHeader: 'Notification',
    dashboardHeader: 'Dashboard',
    registrationHeader: 'Registration',
    companyDetails: 'Company Information',
    registernow: 'register now',
    propertyHeader: 'Property',
    propertyManagementHeader: 'Property Management',
    agencyHeader: 'Team Management',
    agencyHeaderpending: 'Pending Agent',
    leadManagementHeader: 'Lead Management',
    appointmentWithCPHeader: 'Appointment With CP',
    appointmentForVisitHeader: 'Appointments',
    reportHeader: 'Report',
    leaderHeader: 'Leaderboard',
    dealflowHeader: 'Deal Flow',
    chatHeader: 'Chat',
    supportHeader: 'Raise Ticket',
    supportforumHeader: 'Support Forum',
    supportforumDtlHeader: 'Support Forum Details',
    searchSupportForum: 'Search Support Forum',
    settingHeader: 'Setting',
    logout: 'Logout',
    versionText: 'Version',
    forgotPassword: 'Forgot Password?',
    newUserText: 'New User?',
    signUp: 'Sign Up',
    byCreating: 'By Signing up you agree to our',
    termsAndCondition: 'Term & Condition',
    iAknowledge: 'I/We acknowledge and accept the ',
    applicable: 'applicable and available on the site.',
    and: 'and',
    privacyPolicy: 'Privacy Policy',
    ofJusto: 'of Justo.',
    basicInfoText: 'Basic Information',
    active: 'Active',
    inActive: 'InActive',
    accept: 'Accept',
    view: 'View',
    unsubscribe: 'Unsubscribe',
    subscribe: 'Subscribe',
    propertyDetailHeader: 'Property Details',
    confirmation: 'Confirmation',
    ConfirmationModalTxt: 'Select the reason for\r\nunsubscribe this property.',
    Confirm: 'Confirm',
    confirm: 'Confirm',
    pending: 'Pending',
    searchProperty: 'Search Property',
    searchInChat: 'Search in Chat',
    playVideo: 'Play',
    pauseVideo: 'Pause',
    apply: 'APPLY',
    reset: 'RESET',
    resetToday: 'Reset',
    resend: 'Resend',
    notRecived: `Didn't receive the code?`,
    codeSent: 'A verification code has been sent to',
    your: 'your email address',
    otpVerification: 'OTP VERIFICATION',
    imagecontentHeader: 'Images',
    videocontentHeader: 'Videos',
    cataloguecontentHeader: 'Catalogue',
    createVisit: 'CREATE VISITOR',
    gender: "Gender :",
    male: "Male",
    female: "Female",
    next: 'next',
    addnewagent: 'Add Team Member',
    pendingconfirm: 'Pending Confirm',
    edit: 'Edit',
    deactive: 'Deactive',
    agentdetail: 'Member Details',
    userbankinfo: 'User Bank Info',
    createnewagency: 'Create New Agency',
    sendotp: 'Send OTP',
    forgotPasswordHeader: 'Forgot Password',
    visitor: 'Visitor',
    bulkupload: 'Bulk Upload',
    uploadCSV: 'Upload CSV',
    downloadSuccessCsv: 'File Downloaded successfully',
    browser: 'Browse',
    dowloadCSV: 'Download Sample CSV',
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
    ScheduleSitevisite: 'Schedule Site Visit',
    followupHeader: 'Follow-up',
    followupDetails: 'Follow-Up Details',
    searchfollowup: 'Search Follow-Up',
    allfollowup: 'History',
    editfollowup: 'Edit Follow-Up',
    followup: 'Follow-Up',
    no: 'No',
    yes: 'Yes',
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
    registration: 'Registration',
    addLocation: 'Add Locations',
    notSelectedLocation: 'Not Selected Location',
    searchYourlocation: 'Search your location here',
    comingSoon: 'Coming Soon',
    share: 'Share',
    search: 'Search',
    propertyForchat: 'Property for chat',
    chat: 'Chat',
    cancel: 'Cancel',
    updateStatus: 'Update Status',
    browseToUploadMsg: 'Browse to Upload Image',
    browseToUploadCsv: 'Browse to Upload CSV File',
    subscribed: 'Subscribed Property',
    allProperty: 'All Property',

    //Auth 

    usernamepasswordempty: 'Username and Password is require. Please enter Username and password',
    correctemail: 'Enter correct Email Address or Phone Number',
    usernamerequired: 'Username is require. Please enter username',
    passwordrequired: 'Password is require. Please enter password',
    emailrequired: 'Email is require. Please enter email',
    otprequired: 'Enter your OTP',
    passwordnotmatch: 'Password and Confirm Password not match !',
    requiredpassword: 'Enter your Password and Confirm Password',
    requiredField: 'All Password field are required',


    // Appointment
    appointmnet: 'Appointment',
    appointmnetdetail: 'Appointmnet Details',
    updatestatus: 'Update Status',
    searchappointment: 'Search Appointment',
    addNewappointment: 'Add Appointment',
    editNewappointment: 'Edit Appointment',
    appointmentDate: 'Appointment Date',
    appointmentTime: 'Appointment Time',
    location: 'Location',
    noofguest: 'No. of Guest',
    pickupAppointment: 'PickUp(if add property time set yes)',
    VisitorAppointment: 'Visitor Appointment',
    SMAppointment: 'SM Appointment',
    checkinstatus: 'Check in status',

    rerainfo: 'RERA Information',
    setting: "Setting",
    userRole: "USER ROLE",
    channelPartner: 'CHANNEL PARTNER',
    updateProfile: 'UPDATE PROFILE',
    editProfile: 'Edit Profile',
    changePassword: 'Change Password',
    copyLink: 'Copy Link',
    shareQr: 'Share QR',

    // COMMOM
    cameraHeader: 'Camera',
    galleryHeader: 'Gallery',
    browse: 'Attach',

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

    notfount: 'NA',
    inprocess: 'In Process',

    // Raise Ticket (Support)
    addticket: 'Add Ticket',
    editticket: 'Edit Ticket',
    supportrequest: 'Support Request',
    myticket: 'My Ticket',
    escalate: 'Escalate',
    ticketDetails: 'Ticket Details',
    ticketReply: 'Ticket Reply',
    showreply: 'Show Reply',
    ticketStatusUpdate: 'Status Update',
    escalatetonew: 'Escalate to New user',
    nouserselected: 'No user selected',

    //deal flow
    searchDealflow: 'Search Deal Flow',

    // status

    hot: "Hot",
    cold: "Cold",
    warm: "Warm",
    leadType: 'Lead type',
    chooseTimeToDateCorrectly: "Choose time from today's date only",
    choosecurrentCorrect: 'Choose time beyond current time to 7:00 PM',
    choosetimeCorrect: 'Choose time between 10:00 AM - 7:00 PM',

    shareFiles: 'Share Files',


    // lead Create
    Married: 'Married',
    Unmarried: 'Unmarried',
    Rented: 'Rented',
    Owned: 'Owned',
    MoveIn: 'Move In',
    Underonstruction: 'Under Construction',
    // Visit status
    newLead: 'New Lead',
    readytoVisit: 'Ready to Visit',
    booking: 'Booking',
    close: 'Close',
    readytoBookHeader: 'Ready to Book',


    // Appointment With SM
    appointmentWIthSMHeader: 'Appointment With SM',
    todayAppointment: 'Today Appointment',
    allappointment: 'All Appointment',
    useOldData: "Use Old Data",
    createNew: "Create New",
  },
});

export default strings;
