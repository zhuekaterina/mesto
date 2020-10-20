export default class UserInfo {
    constructor({name, about, avatar}) {
        this._profileName = document.querySelector(name);
        this._profileInfo = document.querySelector(about);
        this._profileAvatar = document.querySelector(avatar);
    }
    getUserInfo() {
        this._userInfo = {
            name: this._profileName.textContent,
            about: this._profileInfo.textContent,
            avatar: this._profileAvatar.src
        }
        return this._userInfo;
    }

    setUserInfo({name, about}) {
        this._profileName.textContent = name;
        this._profileInfo.textContent = about;
    }
    setUserAvatar(avatar) {
        this._profileAvatar.src = avatar;
    }
}
