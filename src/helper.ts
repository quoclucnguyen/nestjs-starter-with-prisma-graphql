export const phoneToPhones = (phone: string): string[] => {
    const listNumberInPhone = phone.split('');
    const phones = new Set<string>();
    for (let i = 1; i < listNumberInPhone.length - 1; i++) {
        for (let j = 0; j <= 99; j++) {
            const cloneListNumberInPhone = [...listNumberInPhone]
            if (j < 10) {
                cloneListNumberInPhone[i] = "0";
                cloneListNumberInPhone[i + 1] = j.toString();
            } else {
                cloneListNumberInPhone[i] = ((j - j % 10) / 10).toString();
                cloneListNumberInPhone[i + 1] = (j % 10).toString();
            }
            const phoneNumber = cloneListNumberInPhone.join('');
            phones.add(phoneNumber);
        }
    }
    return [...phones]
}