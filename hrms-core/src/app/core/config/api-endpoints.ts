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
    },
    employee: {
        create: `/onboarding/employee-onboarding`,
        get: `/onboarding/employee-list`,
        auto_generated_emp_id: `/onboarding/auto_generated_emp_id`,
        uploadDocument: `/onboarding/upload-document`,
        getDocuments: `/onboarding/get-document`,
        saveCompensation: `/onboarding/save-compensation`,
        getCompensation: `/onboarding/get-compensation`
    }
};