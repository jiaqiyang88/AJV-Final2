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

    //create a dummy "order status" string
    getOrderStatus() {
        //calculate diff
        let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        let now = new Date();
        var diffDays = Math.floor(Math.abs((this.orderDate.getTime() - now.getTime())/(oneDay)));
    
        const locale = 'en-US'; // Example locale, you should set it based on the user's preferred language
    
        const messages = {
            'en-US': {
                processing: 'Processing',
                shipped: 'Shipped',
                delivered: 'Delivered'
            },
            'zh-CN':{
                processing: '处理中',
                shipped: '已发货',
                delivered: '已送达'

            }
           
            // Add more locales and their translations as needed
        };
    
        if(diffDays < 2) {
            return messages[locale].processing;
        }
        if(diffDays < 4) {
            return messages[locale].shipped;
        }
        else{
            return messages[locale].delivered;
        }
    }

}

export {Order};