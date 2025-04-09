// DOM 元素类型声明
var myImage = document.querySelector("img");
var myButton = document.querySelector("button");
var myHeading = document.querySelector("h1");
// 图片切换功能
myImage.addEventListener("click", function () {
    var mySrc = myImage.getAttribute("src") || "";
    if (mySrc === "images/firefox-icon.png") {
        myImage.setAttribute("src", "images/firefox-2.png");
    }
    else {
        myImage.setAttribute("src", "images/firefox-icon.png");
    }
});
// 用户信息管理
var UserManager = /** @class */ (function () {
    function UserManager() {
        this.currentUser = null;
    }
    UserManager.getInstance = function () {
        if (!UserManager.instance) {
            UserManager.instance = new UserManager();
        }
        return UserManager.instance;
    };
    UserManager.prototype.setUserName = function () {
        var myName = prompt("Please enter your name.");
        if (!myName) {
            this.setUserName();
        }
        else {
            this.currentUser = {
                name: myName,
                lastVisit: new Date()
            };
            localStorage.setItem("user", JSON.stringify(this.currentUser));
            myHeading.textContent = "Mozilla is cool, ".concat(myName);
        }
    };
    UserManager.prototype.loadUser = function () {
        var _a;
        var savedUser = localStorage.getItem("user");
        if (!savedUser) {
            this.setUserName();
        }
        else {
            this.currentUser = JSON.parse(savedUser);
            myHeading.textContent = "Mozilla is cool, ".concat((_a = this.currentUser) === null || _a === void 0 ? void 0 : _a.name);
        }
    };
    return UserManager;
}());
// 初始化用户管理器
var userManager = UserManager.getInstance();
userManager.loadUser();
// 按钮点击事件
myButton.onclick = function () {
    userManager.setUserName();
};
