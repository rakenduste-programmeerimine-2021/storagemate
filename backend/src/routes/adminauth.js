const router = require("express").Router();
const authController = require("../controllers/adminauth");
const validationMiddleware = require("../middleware/validationMiddleware");
const { check } = require("express-validator");

router.post(
    "/adminlogin",
    [
        check("email")
        .isEmail()
        .normalizeEmail()
        .escape()
        .withMessage("Must be correctly formatted e-mail"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Must be at least 6 characters long"),
    ],
    validationMiddleware,
    authController.adminlogin
);


router.post(
    "/adminsignup",
    [
    check("firstName")
        .isLength({ min: 3 })
        .withMessage("Must be at least 3 characters long")
        .trim()
        .exists()
        .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
        .withMessage("Must be alphabetic"),
    check("lastName")
        .isLength({ min: 3 })
        .withMessage("Must be at least 3 characters long")
        .trim()
        .exists()
        .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
        .withMessage("Must be alphabetic"),
    check("email")
        .isEmail()
        .normalizeEmail()
        .withMessage("Must be correctly formatted e-mail"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Must be at least 6 characters long"),
    ],
    validationMiddleware,
    authController.adminsignup
);

router.delete("/delete", authController.deleteAdmin);

module.exports = router;
