export interface UserInfo {
    user: {
        first_name: string;
        last_name: string;
    };
    medical_info: {
        blood_type: string;
        blood_donor: boolean;
        organ_donor: boolean;
    };
    phone_number: string;
}
