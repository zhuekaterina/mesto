import Popup from './Popup.js';

 export default class PopupWithImage extends Popup {
     constructor(popupSelector) {
         super(popupSelector);
         this._popupImage = this._popupSelector.querySelector('.popup-zoom__image');
         this._popupName = this._popupSelector.querySelector('.popup-zoom__name');
     }
     open(item) {
         super.open();
         this._popupImage.src = item.link;
         this._popupImage.alt = item.name;
         this._popupName.textContent = item.name;
     }
     close() {
         super.close();
         this._popupImage.alt = '#';
     }
 }