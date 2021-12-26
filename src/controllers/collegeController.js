const internModel = require('../models/internModel.js');

const collegeModel = require('../models/collegeModel.js');

const { isValidString, isValidRequestBody } = require('../validations/validator.js');

//****************** API for create Colleg ******************
let createCollege = async function (req, res) {

    try {
        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) return res.status(400).send({ status: false, message: 'Empty request body. Please provide details' });

        const { name, fullName, logoLink } = requestBody;

        if (!isValidString(name)) return res.status(400).send({ status: false, message: 'Please provide name' });

        if (!isValidString(fullName)) return res.status(400).send({ status: false, message: 'Please provide fullName' });

        if (!isValidString(logoLink)) return res.status(400).send({ status: false, message: 'Please provide logoLink' });

        let college = await collegeModel.create(requestBody);

        res.status(201).send({ status: true, data: college });

    } catch (error) {

        res.status(500).send({ status: false, msg: error.message });

    }
};


//****************** API for College Detail with Intern List ******************
let collegeDetails = async function (req, res) {

    try {

        res.setHeader('Access-Control-Allow-Origin', '*');

        const collegeName = req.query.collegeName;

        if (!isValidString(collegeName)) return res.status(400).send({ status: false, message: 'CollegeName must be present in the request parameters' });


        let college = await collegeModel.findOne({ name: collegeName, isDeleted: false });

        if (!college) return res.status(404).send({ status: false, msg: 'College not found for the requested collegeName' });

        let collegeData = {
            name: college.name,
            fullName: college.fullName,
            logoLink: college.logoLink
        };

        let interns = await internModel.find({ collegeId: college._id, isDeleted: false }, '-collegeId -isDeleted -createdAt -updatedAt -__v').sort({ createdAt: -1 })

        if (interns) {
            collegeData.interns = interns
        };

        res.status(201).send({ status: true, data: collegeData });


    } catch (error) {

        res.status(500).send({ staus: false, msg: error.message });

    }
};

//****************** API for list of all register College******************
const getRegisterCollegeList = async function (req, res) {
    try {
        const list = await collegeModel.find();

        res.status(200).send({ status: true, message: "Register college list", data: list });

    } catch (error) {

        res.status(500).send({ status: false, message: error.message })
    }

};

module.exports = {
    createCollege,
    collegeDetails,
    getRegisterCollegeList
}