const { check, header, body,query, validationResult } = require('express-validator')

const loginValidation = [
    body('username', "username is required.")
        .exists()
        .withMessage("Username is required."),
    body('password', "password is required.")
        .exists()
        .withMessage("Password is required."),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next()
    }
 ]

 const registerValidation = [
    body('username', "username is required.")
        .exists()
        .withMessage("Username is required."),
    body('password', "password is required.")
        .exists()
        .withMessage("Password is required."),
    body('full_name', "full_name is required.")
    .exists()
    .withMessage("full_name is required."),
    body('user_role', "user_role is required.")
        .exists()
        .withMessage("user_role is required."),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next()
    }
 ]


 module.exports={loginValidation,registerValidation}

// const addFeedbackQuestion = [
//     check('question', "question is ivalid.")
//         .exists()
//         .withMessage("question is required."),
//     check('type', "type is required.")
//         .exists()
//         .withMessage("type is required."),
//     async (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//         next()
//     }
// ]

// const editFeedbackQuestion = [
//     check('question', "question is invalid.")
//         .exists()
//         .withMessage("question is required."),
//     check('questionId', "questionId is Invalid.")
//     .exists()
//     .withMessage("questionId is required."),
//     check('type', "type is required.")
//         .exists()
//         .withMessage("type is required."),
//     async (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//         next()
//     }
// ]




// const fetchFeedbackQuestions = [
//     check('type', "type is required.")
//         .exists()
//         .withMessage("type is required."),
//     async (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//         next()
//     }
// ]


// const addNewUser = [
//     body('firstName', "FirstName is required.")
//         .exists()
//         .withMessage("FirstName is required."),
//     body('surName', "surName is required.")
//         .exists()
//         .withMessage("surName is required."),
//     // body('password', "password is required.")
//     //     .exists()
//     //     .withMessage("password is required."),
//     body('memberId', "memberId is required.")
//         .exists()
//         .withMessage("memberId is required."),
   
//     body('userRole', "userRole is required.")
//         .exists()
//         .withMessage("userRole is required."),
//     body('email', "email is required.")
//         .exists()
//         .withMessage("email is required."),

//     async (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//         next()
//     }
// ]



// const addNewCenter = [
//     body('name', "name is required.")
//         .exists()
//         .withMessage("name is required."),
//     body('address', "address is required.")
//         .exists()
//         .withMessage("address is required."),
//     body('city', "city is required.")
//         .exists()
//         .withMessage("city is required."),
//     body('country', "country is required.")
//         .exists()
//         .withMessage("country is required."),
//     body('areaPin', "areaPin is required.")
//         .exists()
//         .withMessage("areaPin is required."),
//     body('phoneNo', "phoneNo is required.")
//         .exists()
//         .withMessage("phoneNo is required."),
//     body('centerUrl', "centerUrl is required.")
//         .exists()
//         .withMessage("centerUrl is required."),

//     async (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//         next()
//     }
// ]


// const editUserById = [
//     body('firstName', "firstName is required.")
//         .exists()
//         .withMessage("firstName is required."),
//     body('surName', "surName is required.")
//         .exists()
//         .withMessage("surName is required."),
//     body('userRole', "userRole is required.")
//         .exists()
//         .withMessage("userRole is required."),
//     body('centerId', "centerId is required.")
//         .exists()
//         .withMessage("centerId is required."),
//     body('studentId', "studentId is required.")
//         .exists()
//         .withMessage("studentId is required."),
//     async (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//         next()
//     }
// ]

// const saveStripeDetail=[
//     body('publishKey', "publishKey is required.")
//         .exists()
//         .withMessage("publishKey is required."),
//     body('liveKey', "liveKey is required.")
//         .exists()
//         .withMessage("liveKey is required."),
//     async (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//         next()
//     }
// ]

// const saveSendGridDetail =[
//     body('sendGridKey', "sendGridKey is required.")
//         .exists()
//         .withMessage("sendGridKey is required."),
//     async (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//         next()
//     }
// ]
 
// const saveRelationLink  =[
//     body('studentIdArr', "studentIdArr is required.")
//         .exists()
//         .withMessage("studentIdArr is required."),
//     body('parentId', "parentId is required.")
//         .exists()
//         .withMessage("parentId is required."),
//     async (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//         next()
//     }
// ]


// const addNewCourse = [
//     body('name', "name is required.")
//         .exists()
//         .withMessage("name is required."),
//     body('address', "address is required.")
//         .exists()
//         .withMessage("address is required."),
//     body('city', "city is required.")
//         .exists()
//         .withMessage("city is required."),
//     body('country', "country is required.")
//         .exists()
//         .withMessage("country is required."),
//     body('areaPin', "areaPin is required.")
//         .exists()
//         .withMessage("areaPin is required."),
//     body('phoneNo', "phoneNo is required.")
//         .exists()
//         .withMessage("phoneNo is required."),
//     body('centerUrl', "centerUrl is required.")
//         .exists()
//         .withMessage("centerUrl is required."),

//     async (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//         next()
//     }
// ]
