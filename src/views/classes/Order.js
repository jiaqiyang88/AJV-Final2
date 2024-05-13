import i18n from "../../services/i18n.js";


class Order {
    constructor(total, newDate, number) {
        if(newDate == null) {
            this.orderDate = new Date(); //$NON-NLS-L$
        }else {
            this.orderDate = newDate;
        }
        if(number == null) {
            this.orderNumber = Math.floor(Math.random() * (99999999 - 10000000) + 10000);
        }
        else {
            this.orderNumber = number;
        }
        
        this.total = total;
    }
    getOrderDate() {
        var dd = String(this.orderDate.getDate()).padStart(2, '0');
        var mm = String(this.orderDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = this.orderDate.getFullYear();

        let date = mm + '/' + dd + '/' + yyyy;
        return date;
    }

    consti18n = {
        getString(key, locale) {
            // Simulated example of fetching strings from a resource file or dictionary
            const strings = {
                'en': {
                    processing: 'Processing',
                    shipped: 'Shipped',
                    delivered: 'Delivered'
                },
                // Add more locales and their translations as needed
            };
    
            const localeStrings = strings[locale] || strings['en']; // Default to English if locale not found
            return localeStrings[key];
        }
    };

    getOrderStatus() {
        //calculate diff
        let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        let now = new Date(); //$NON-NLS-L$
        let processing = i18n.getString("OrderHistory", "processing");
        let shipped = i18n.getString("OrderHistory", "shipped");
        let delivered = i18n.getString("OrderHistory", "delivered");
        var diffDays = Math.floor(Math.abs((this.orderDate.getTime() - now.getTime())/(oneDay))); //$NON-NLS-L$

        if(diffDays < 2) {
            return processing;
        }
        if(diffDays < 4) {
            return shipped;
        }
        else{
            return delivered;
        }
    }   

}

export {Order};