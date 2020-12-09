"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var router = express_1.Router();
exports.router = router;
router.get("/", function (req, res) {
    // Req Session
    if (req.session && req.session.loggedIn) {
        res.send("\n    <div>\n    <a href=\"/protected\"> Protected Route </a>\n      <h1>You are logged in</h1>\n      <a href=\"/logout\">Logout</a>\n    </div>\n    \n    ");
    }
    else {
        res.send("\n    <div>\n      <h1>You are not logged in</h1>\n      <a href=\"/login\">Login</a>\n    </div>\n  ");
    }
});
router.get("/login", function (req, res) {
    res.send("\n  <form method=\"POST\">\n    <div>\n      <label>Email</label>\n      <input name=\"email\"/>\n    </div>\n    <div>\n      <label>Password</label>\n      <input type=\"password\" name=\"password\"/>\n    </div>\n    <button>Submit</button>\n  </form>\n  ");
});
router.post("/login", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email &&
        password &&
        email === "admin@example.com" &&
        password === "12345") {
        req.session = { loggedIn: true };
        res.redirect("/");
    }
    else {
        res.send("Invalid credentials");
    }
});
router.get("/logout", function (req, res) {
    req.session = undefined;
    res.redirect("/");
});
router.get("/protected", middlewares_1.requireAuth, function (req, res) {
    res.send("\n  <div>\n    <h1> Welcome to protected route, Admin!</h1>\n  </div>\n  ");
});
