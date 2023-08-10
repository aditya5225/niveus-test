
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User Id is required!'],
        unique: true,
        trim: true,
        minLength: [3, `User Id should be atleast 3 charector!`],
        maxLength: [20, `User Id should less then 20 charector!`],
        validate: {
            validator: async (value) => {
                const userCount = await mongoose.models.user.count({ userId: value });
                return !userCount;
            },
            message: props => `${props.value} user id already exists`
        },
    },
    name: {
        type: String,
        required: [true, 'Name is required!'],
        trim: true,
        minLength: [3, `Name should be atleast 3 charector!`],
        maxLength: [20, `Name should less then 20 charector!`],
    },
    dob: {
        type: Date,
        max: [new Date(), 'Invalid Date of birth!'],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: 'Invalid gender!'
        }
    },
    mobile: {
        type: String,
        unique: true,
        match: [
            /^(\+\d{1,3}[- ]?)?\d{10}$/,
            'Please enter a valid mobile number.'
        ],
        required: [true, 'Mobile is required!'],
        validate: {
            validator: async (value) => {
                const userCount = await mongoose.models.user.count({ mobile: value });
                return !userCount;
            },
            message: props => `${props.value} mobile number already exists`
        },
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: async (value) => {
                let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return emailReg.test(value)
            },
            message: props => `Please fill a valid email address`
        },
    },
    address: {
        address: { type: String, trim: true },
        city: { type: String, trim: true },
        country: { type: String, trim: true },
        pin_code: { type: String, trim: true },
        state: { type: String, trim: true },
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('user', userSchema);