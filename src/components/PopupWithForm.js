import React from "react";

function PopupWithForm({ isOpen, onClose, name, title, children, buttonName }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`} >
            <div className="popup__container" >
                <button type="button" className="popup__close" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form name={`${name}`} className="popup__form">
                    {children}
                    <button type="submit" className="popup__save">{buttonName}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
