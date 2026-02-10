export const API_ENDPOINTS = {
    lookup: {
        getLookupData: `/common/lookup`,
        getBulkLookupData: `/common/bulk_lookup`,
        categories: {
            gender: 'GENDER',
            employee_type: 'EMPLOYEE_TYPE',
            work_mode: 'WORK_MODE',
            status: 'STATUS',
            emergency_relation: 'EMERGENCY_RELATION',
            probation_status: 'PROBATION_STATUS'
        }
    },
    dropdown: {
        designations: '/common/designations-dropdown',
        departments: '/common/departments-dropdown',
        employees: '/common/employee-dropdown',
        leave_types: '/common/leave-types-dropdown',
    },
    employee: {
        create: `/onboarding/employee-onboarding`,
        get: `/onboarding/employee-list`,
        auto_generated_emp_id: `/onboarding/auto_generated_emp_id`,
        uploadDocument: `/onboarding/upload-document`,
        getDocuments: `/onboarding/get-document`,
        saveCompensation: `/onboarding/save-compensation`,
        getCompensation: `/onboarding/get-compensation`
    },
    leave: {
        save_leave_types: '/leave-config/leave_type/create',
        get_leave_types: '/leave-config/leave_type/get_list',
        status_change_leave_type: '/leave-config/leave_type/change_status',

        create_policy: '/leave-config/leave_policy/create',
        get_policies: '/leave-config/leave_policy/get_list',
        delete_policy: '/leave-config/leave_policy/delete',
        get_policy_details: '/leave-config/leave_policy/get_by_id',

        create_holiday: '/leave-config/leave_calendar/holiday/create',
        get_holidays: '/leave-config/leave_calendar/holiday/get_list',
        update_holiday: '/leave-config/holiday/update',
        delete_holiday: '/leave-config/leave_calendar/holiday/delete',

        create_weekly_off: '/leave-config/leave_calendar/weekly_off/create',

        // Leave Balance & Ledger
        get_leave_balance: '/leave-config/leave_balance/get_by_employee',
        get_ledger_entries: '/leave-management/ledger/entries',
        create_ledger_entry: '/leave-management/ledger/create',
        export_balance_report: '/leave-management/balance/export',
    }
};