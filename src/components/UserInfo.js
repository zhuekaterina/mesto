export default class UserInfo {
    constructor({name, about, avatar, _id}) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
        this._id = _id;
        this._profileName = document.querySelector(this._name);
        this._profileInfo = document.querySelector(this._about);
        this._profileAvatar = document.querySelector(this._avatar);
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
}
