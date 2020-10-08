/** Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
Этот метод пригодится, когда данные пользователя нужно будет подставить в форму при открытии.
Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу. **/

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
