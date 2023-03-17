export enum EMessages {
    SOMETHING_WENT_WRONG = 'Something Went Wrong',
    INVALID_USERNAME_PASSWORD = 'Invalid username or password'
}

export const ValidationMessages = {
    username: [
        { type: 'required', message: 'Username is required.' }
    ],
    email: [
        { type: 'required', message: 'Email is required.' },
        { type: 'email', message: 'Please enter a valid email.' }
    ],
    password: [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 6 characters long.' },
    ],
    confirmPassword: [
        { type: 'required', message: 'Confirm password is required.' },
        { type: 'confirmedValidator', message: 'Password does not match.' }
    ],
    fullName: [
        { type: 'required', message: 'Full Name required.' },
    ],
    city: [
        { type: 'required', message: 'City is required.' },
    ],
    country: [
        { type: 'required', message: 'Country is required.' },
    ],
    dateOfBirth: [
        { type: 'required', message: 'Date of Birth is required.' },
    ],
    address: [
        { type: 'required', message: 'Address is required.' },
    ]
};