import translationEn from './en.json';
import translationFr from './fr.json';

type Arguments = 'capitalize' | 'lower' | 'upper';

class Translator {

    locale: string;
    allTranslations: any;

    constructor(){
        this.locale = 'en';

        // Add translations to array
        this.allTranslations = {};
        this.allTranslations.en = translationEn;
        this.allTranslations.fr = translationFr;
    }

    public trans(name: string, type?: Arguments){
        let transtext = name;
        
        if(typeof this.allTranslations[this.locale] !== undefined && typeof this.allTranslations[this.locale][name] !== 'undefined')
            transtext = this.allTranslations[this.locale][name];

        if(type){
            if(type == 'capitalize')
                transtext = transtext.charAt(0).toUpperCase() + transtext.slice(1);
            else if (type == 'lower')
                transtext = transtext.toLowerCase();
            else if (type == 'upper')
                transtext = transtext.toUpperCase();
        }
        return transtext;
        // if(this.locale == 'en')
        //     transtext = (typeof en);
        // else if(this.locale == 'fr')

        // else
        // ;
    }

    public setLanguage(locale: string){
        this.locale = locale;
    }
}

const i18n = new Translator;

export default i18n;