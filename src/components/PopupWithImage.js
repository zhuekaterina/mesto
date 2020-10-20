import Popup from './Popup.js';

 export default class PopupWithImage extends Popup {
     constructor(popupElement) {
         super(popupElement);
         this._popupImage = this._popupElement.querySelector('.popup-zoom__image');
         this._popupName = this._popupElement.querySelector('.popup-zoom__name');
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