module.exports = {
    appKey: 'pwmjeoxtxsxduyoeohiszyymrgmuvait',
    websiteName: 'Greenable',
    port : 2365,
    directory_product_image : __dirname+'/../public/images/products/',
    /*
    type_db: 'mongodb',
    db : {
        cluster: '',
        user : '',
        pwd: '',
        dbname: ''
    }*/
    db : {
        host     : 'localhost',
        user     : 'root',
        password : '',
        port     : 3306,
        database : 'greenable'
    
    },
    smtp: {
        service: 'gmail',
        auth: {
            user: "lucas.lardot@gmail.com",
            pass: "zyzycylmstksslyo"
        }
    },
    cookieParam: { 
        sameSite: 'lax',
        secure: true,
        domain: 'localhost'
    }
};