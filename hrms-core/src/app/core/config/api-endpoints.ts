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
        roles: '/common/roles-dropdown',
        shifts: '/common/shifts-dropdown'
    },
    employee: {
        create: `/onboarding/employee-onboarding`,
        get_employee_list: `/onboarding/employee-list-pagination`,
        get_employee_details: `/onboarding/employee-details`,
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

        // Leave Request (Apply Leave)
        apply_leave: '/leave-config/leave_requests/apply',
        check_leave_overlap: '/leave-config/leave_requests/check_overlap',

        // leave approval
        get_pending_requests: '/leave-config/leave_requests/get_list',
        update_request_status: '/leave-config/leave_requests/update_status'
    },
    attendance: {
        clock_in: '/attendance/check_in',
        clock_out: '/attendance/check_out',
        attendance_calculation: '/attendance/calculate',
        get_clock_status: '/attendance/history',
        get_monthly_attendance: '/attendance/monthly-summary',

        get_clock_logs: '/attendance/clock_logs',

        get_my_attendance: '/attendance/my-attendance',
        request_regularization: '/attendance/regularization/request',
        request_wfh: '/attendance/wfh/rise-request'
    }
};