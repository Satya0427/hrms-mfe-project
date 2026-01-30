export const API_ENDPOINTS = {

    lookups: {
        orginization_dropdown:'/lookup/organizations-dropdown'
    },
    // Global Admin Users Management
    globalAdmin: {
        get_all: `/org-admin/get_admins`,
        get_by_id: `/org-admin/get_details`,
        create: `/org-admin/create`,
        update: `/org-admin/:id`,
        delete: `/org-admin/:id`,
        change_status: `/org-admin/:id/status`,
    },

    // Organizations Management
    organizations: {
        get_all: `/organization/orginization_list`,
        get_by_id: `/organization/org_dtls_by_id`,
        get_org_details: `/organization/orginization_view_details`,
        create: `/organization/create`,
        update: `/organization/:id`,
        delete: `/organization/:id`,
        change_status: `/organization/:id/status`,
        get_usage: `/organization/:id/usage`,
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
        get_all_plans: `/subscription/get_list`,
        get_plan_by_id: `/subscription/edit_plan`,
        update_plan: `/subscription/subscription-plans/:id`,
        delete_plan: `/subscription/subscription-plans/:id`,
        get_plan_features: `/subscription/subscription-plans/:id/features`,
    },

    // Platform Modules Management
    platformModules: {
        get_all: `/module-feature/get_modules_list`,
        get_by_id: `/module-feature/:id`,
        create: `/module-feature/create`,
        update: `/module-feature/:id`,
        delete: `/module-feature/:id`,
        toggle_status: `/module-feature/:id/toggle`,
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