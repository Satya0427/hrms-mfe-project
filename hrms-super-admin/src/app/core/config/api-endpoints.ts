export const API_ENDPOINTS = {

    // Global Admin Users Management
    globalAdmin: {
        get_all: `/global-admin`,
        get_by_id: `/global-admin/:id`,
        create: `/global-admin`,
        update: `/global-admin/:id`,
        delete: `/global-admin/:id`,
        change_status: `/global-admin/:id/status`,
    },

    // Organizations Management
    organizations: {
        get_all: `/organizations`,
        get_by_id: `/organizations/:id`,
        create: `/organizations`,
        update: `/organizations/:id`,
        delete: `/organizations/:id`,
        change_status: `/organizations/:id/status`,
        get_usage: `/organizations/:id/usage`,
    },

    // Subscription Plans Management
    subscriptionPlans: {
        get_all: `/subscription-plans`,
        get_by_id: `/subscription-plans/:id`,
        create: `/subscription-plans`,
        update: `/subscription-plans/:id`,
        delete: `/subscription-plans/:id`,
        change_status: `/subscription-plans/:id/status`,
    },

    // Subscription Plan Endpoints
    subscription: {
        create_plan: `/subscription/create`,
        get_all_plans: `/subscription/subscription-plans`,
        get_plan_by_id: `/subscription/subscription-plans/:id`,
        update_plan: `/subscription/subscription-plans/:id`,
        delete_plan: `/subscription/subscription-plans/:id`,
        get_plan_features: `/subscription/subscription-plans/:id/features`,
    },

    // Platform Modules Management
    platformModules: {
        get_all: `/platform-modules`,
        get_by_id: `/platform-modules/:id`,
        create: `/platform-modules`,
        update: `/platform-modules/:id`,
        delete: `/platform-modules/:id`,
        toggle_status: `/platform-modules/:id/toggle`,
    },

    // Platform Dashboard
    dashboard: {
        get_kpi_stats: `/dashboard/kpi-stats`,
        get_usage_overview: `/dashboard/usage-overview`,
        get_module_adoption: `/dashboard/module-adoption`,
        get_revenue_snapshot: `/dashboard/revenue-snapshot`,
        get_system_health: `/dashboard/system-health`,
    },

    // Usage Limits & Monitoring
    usageLimits: {
        get_all_organization_usage: `/usage-limits/organizations`,
        get_organization_usage: `/usage-limits/organizations/:id`,
        get_organization_usage_details: `/usage-limits/organizations/:id/details`,
        alert_threshold: `/usage-limits/alert-thresholds`,
    },



};