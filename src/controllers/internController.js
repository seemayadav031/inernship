const internModel = require('../models/internModel.js');

const collegeModel = require('../models/collegeModel.js');


const { isValidString, isValidRequestBody,isVaildEmail, isVaildMobileNumber } = require('../validations/validator.js');

//****************** API for create Intern ******************
let createIntern = async function (req, res) {

    try {

        res.setHeader('Access-Control-Allow-Origin', '*');

        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) return res.status(400).send({ status: false, message: 'Empty request body. Please provide details' });

        const { name, mobile, email, collegeName } = requestBody;

        if (!isValidString(name)) return res.status(400).send({ status: false, message: 'Please provide name' });

        if (!isValidString(email)) return res.status(400).send({ status: false, message: 'Please provide email' });

        if (!isValidString(mobile)) return res.status(400).send({ status: false, message: 'Please provide mobile' });

        if (!isVaildEmail(email)) return res.status(400).send({ status: false, message: 'Please provide valid email' });

        if (!isVaildMobileNumber(mobile)) return res.status(400).send({ status: false, message: 'Please provide valid mobile' });

        const emailExist = await internModel.findOne({ email: email });

        if (emailExist) return res.status(400).send({ status: false, message: 'Email is already registered' });

        const mobileExist = await internModel.findOne({ mobile: mobile });

        if (mobileExist) return res.status(400).send({ status: false, message: 'mobile number is already registered' });


        let college = await collegeModel.findOne({ name: collegeName, isDeleted: false });

        if (!college) return res.status(400).send({ status: false, msg: 'Request must contain a valid college' });

        let internData = {
            name: name,
            email: email,
            mobile: mobile,
            collegeId: college._id,
        }

        let intern = await internModel.create(internData);

        res.status(201).send({ status: true, data: intern });

    } catch (error) {

        res.status(500).send({ status: false, msg: error.message });

    }
};

//****************** API for list of all register Intern******************
const getRegisterInternList = async function (req, res) {
    try {
        const list = await internModel.find();

        res.status(200).send({ status: true, message: "Register Intern list", data: list });

    } catch (error) {

        res.status(500).send({ status: false, message: error.message })
    }

};

module.exports = {
    createIntern,
    getRegisterInternList
}