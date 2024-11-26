export const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 8) {
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
}

export const formatGeneralPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumber.startsWith('02')) {
        if (phoneNumberLength > 2 && phoneNumberLength <= 6) {
            return `${phoneNumber.slice(0, 2)}-${phoneNumber.slice(2)}`;
        } else if (phoneNumberLength > 6 && phoneNumberLength <= 9) {
            return `${phoneNumber.slice(0, 2)}-${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5, 9)}`;
        } else if (phoneNumberLength > 9) {
            return `${phoneNumber.slice(0, 2)}-${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6, 10)}`;
        }
    } else if (phoneNumber.startsWith('050') && phoneNumber.charAt(3) >= '2' && phoneNumber.charAt(3) <= '7') {
        if (phoneNumberLength > 4 && phoneNumberLength <= 7) {
            return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`;
        } else {
            return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 11)}`;
        }
    } else if (phoneNumber.startsWith('070')) {
        if (phoneNumberLength > 3 && phoneNumberLength <= 7) {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        } else {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
        }
    } else {
        if (phoneNumberLength > 3 && phoneNumberLength <= 7) {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        } else if (phoneNumberLength > 7 && phoneNumberLength <= 11) {
            if (phoneNumberLength === 10) {
                return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
            } else {
                return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
            }
        }
    }
    return phoneNumber;
}

export const formatNumber = (value) => {
    return value.replace(/[^\d]/g, '');
}