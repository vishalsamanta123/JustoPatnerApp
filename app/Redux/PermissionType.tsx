import images from "app/assets/images";
import strings from "app/components/utilities/Localization";

export const MENUITEMS = [
    // {
    //     title: strings.dashboardHeader,
    //     icon: images.dashboard,
    //     path: "DashboardScreen",
    //     permission: true,
    //     deploy: true,
    // },
    {
        title: strings.propertyManagementHeader,
        icon: images.property,
        path: "PropertyScreenView",
        permission: true,
        deploy: true,
        slug: 'property_management',
    },
    {
        title: strings.agencyHeader,
        icon: images.agency,
        path: "AgentListing",
        permission: true,
        deploy: true,
        slug: 'agent',
    },
    {
        title: strings.leadManagementHeader,
        icon: images.lead,
        path: "LeadManagement",
        permission: true,
        deploy: true,
        slug: 'visitor_management',
    },
    {
        title: strings.followupHeader,
        icon: images.event,
        path: "FollowUpScreen",
        permission: true,
        deploy: true,
        slug: 'followup_management',
    },
    {
        title: strings.appointmentForVisitHeader,
        icon: images.event,
        path: "AppointmentScreen",
        permission: true,
        deploy: true,
        slug: 'appointment_management',
    },
    {
        title: strings.appointmentWIthSMHeader,
        icon: images.event,
        path: "appointmentWithSM",
        permission: true,
        deploy: true,
        slug: 'appointment_with_sm',
    },
    {
        title: strings.reportHeader,
        icon: images.report,
        path: "Report",
        permission: true,
        deploy: true,
        slug: 'report',
    },
    {
        title: strings.leaderHeader,
        icon: images.report,
        path: "LeaderBoard",
        permission: true,
        deploy: true,
        slug: 'leader_Board',
    },
    {
        title: strings.dealflowHeader,
        icon: images.report,
        path: "DealFlow",
        permission: true,
        deploy: true,
        slug: 'data_flow',
    },
    {
        title: strings.supportforumHeader,
        icon: images.report,
        path: "SupportForum",
        permission: true,
        deploy: true,
        slug: 'support_forum',
    },
    {
        title: strings.chatHeader,
        icon: images.chat,
        path: "PropertyChatView",
        permission: true,
        deploy: true,
        slug: 'chat',
    },
    {
        title: strings.supportHeader,
        icon: images.support,
        path: "Support",
        permission: true,
        deploy: true,
        slug: 'support',
    },
    {
        title: strings.settingHeader,
        icon: images.setting,
        path: "SettingScreen",
        permission: true,
        deploy: true,
        slug: '',
    },
   
]