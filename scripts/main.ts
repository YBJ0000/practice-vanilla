// 定义接口
interface User {
  name: string;
  lastVisit: Date;
}

// DOM 元素类型声明
const myImage = document.querySelector("img") as HTMLImageElement;
const myButton = document.querySelector("button") as HTMLButtonElement;
const myHeading = document.querySelector("h1") as HTMLHeadingElement;

// 图片切换功能
myImage.addEventListener("click", (): void => {
  const mySrc: string = myImage.getAttribute("src") || "";
  if (mySrc === "images/firefox-icon.png") {
    myImage.setAttribute("src", "images/firefox-2.png");
  } else {
    myImage.setAttribute("src", "images/firefox-icon.png");
  }
});

// 用户信息管理
class UserManager {
  private static instance: UserManager;
  private currentUser: User | null = null;

  private constructor() {}

  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  public setUserName(): void {
    const myName: string | null = prompt("Please enter your name.");
    if (!myName) {
      this.setUserName();
    } else {
      this.currentUser = {
        name: myName,
        lastVisit: new Date()
      };
      localStorage.setItem("user", JSON.stringify(this.currentUser));
      myHeading.textContent = `Mozilla is cool, ${myName}`;
    }
  }

  public loadUser(): void {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      this.setUserName();
    } else {
      this.currentUser = JSON.parse(savedUser);
      myHeading.textContent = `Mozilla is cool, ${this.currentUser?.name}`;
    }
  }
}

// 初始化用户管理器
const userManager = UserManager.getInstance();
userManager.loadUser();

// 按钮点击事件
myButton.onclick = () => {
  userManager.setUserName();
};