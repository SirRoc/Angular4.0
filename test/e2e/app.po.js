"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var StartPage = (function () {
    function StartPage() {
    }
    StartPage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    StartPage.prototype.getParagraphText = function () {
        return protractor_1.element(protractor_1.by.css('app-root h1')).getText();
    };
    return StartPage;
}());
exports.StartPage = StartPage;
