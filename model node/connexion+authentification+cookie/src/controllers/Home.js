const {repository, service} = require('../../app/getFiles')()

module.exports = class TestController{

    print(req, res){
        // req.flash("notify", "notitfTest")
        // console.log(req.flash("notify"))
        // console.log(req.flash("notify"))


        console.log(req.url)
        res.render('home')
    }

    listUsers(req, res){
        repository('User').list().then(result=>{

            console.log(req.session)
            res.send('cool');
        }, err=>{
            console.log(err)
            res.end();
        })
    }

    // sessionprint(req, res){
    //     if (req.session.views) {
    //         req.session.views++
    //         res.setHeader('Content-Type', 'text/html')
    //         res.write('<p>views: ' + req.session.views + '</p>')
    //         res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    //         res.end()
    //       } else {
    //         req.session.views = 1
    //         res.end('welcome to the session demo. refresh!')
    //       }
    // } 
    

}