export default class UserInfo {
    constructor({name, info}) {
        this._name = name;
        this._info = info;
        this._profileName = document.querySelector(this._name);
        this._profileInfo = document.querySelector(this._info);
    }
    getUserInfo() {
        this._userInfo = {
            name: this._profileName.textContent,
            info: this._profileInfo.textContent
        }
        return this._userInfo;
    }
    setUserInfo({newName, newInfo}) {
        this._profileName.textContent = newName;
        this._profileInfo.textContent = newInfo;
    }
}
