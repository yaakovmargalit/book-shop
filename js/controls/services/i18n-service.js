var gTrans = {
    'title-shop': {
        en: 'Welcome to my bookshop',
        es: 'Mis Cosas Por Hacer',
        he: 'ברוכים הבאים לחנות שלי'
    },
    'new-book-btn': {
        en: 'Create new book',
        es: 'MVC - Modelo-Vista-Controlador',
        he: 'צור ספר חדש',
    },
    id: {
        en: 'id',
        es: 'Todos',
        he: 'קוד',
    },
    title: {
        en: 'Title',
        es: 'Activo',
        he: 'שם הספר'
    },
    price: {
        en: 'Price',
        es: 'Completo',
        he: 'מחיר',
    },
    rate: {
        en: 'Rate',
        es: 'Hacer',
        he: 'דרוג',
    },
    actions: {
        en: 'Actions',
        es: 'Aggregar',
        he: 'פעולות',
    },
    'details-btn': {
        en: 'Details',
        es: 'Aggregar',
        he: 'פרטים',
    },
    'update-btn': {
        en: 'Update',
        es: 'Aggregar',
        he: 'עדכון',
    },
    'delete-btn': {
        en: 'Delete',
        es: 'Aggregar',
        he: 'מחיקה',
    },
    save: {
        en: 'Save',
        es: 'Aggregar',
        he: 'שמירה',
    },
    cancel: {
        en: 'Cancel',
        es: 'Aggregar',
        he: 'ביטול',
    },
    'update-title': {
        en: 'Update price of:',
        es: 'Aggregar',
        he: 'עדכן את המחיר של:',
    },
    add: {
        en: 'Add:',
        es: 'Aggregar',
        he: 'הוסף',
    },
    'update-title': {
        en: 'Update price of:',
        es: 'Aggregar',
        he: 'עדכן את המחיר של:',
    },
    'new-title': {
        en: 'New book',
        es: 'Aggregar',
        he: 'ספר חדש',
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {

    var keyTrans = gTrans[transKey]
        // TODO: if key is unknown return 'UNKNOWN'
    if (!keyTrans) return 'UNKNOWN';
    // TODO: get from gTrans
    var txt = keyTrans[gCurrLang]
        // TODO: If translation not found - use english
    if (!txt) txt = keyTrans.en;
    return txt;
}

function doTrans() {
    // TODO: 
    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        var elTrans = el.dataset.trans
            //  ITP: support placeholder    
        if (el.nodeName === 'INPUT') {
            el.placeholder = getTrans(elTrans)
        } else {
            el.innerText = getTrans(elTrans)
        }
    })

}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}