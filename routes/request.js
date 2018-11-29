const express = require('express');
const router = express.Router();
const request = require('request');
const axios = require('axios');


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.get('/', async function (req, res) {
    req.debug = true;
    const fc = await getForeCast();
        if(fc instanceof Promise) {
            console.log(fc);
            fc.then(function () { console.log('then', arguments); });
            fc.catch(function () { console.log('catch', arguments); });
            res.send('error promise');
    }
  
    res.send(fc);
});

router.get('/axios', async function (req, res) {
    try {
        const v = await axios.get('https://api.darksky.net/forecast/47cd820f17e11e20b7b94f403b410492/0,0');
        console.log(v.status, v.statusText);
        res.send(v.data);
    }
    catch(err) {
        console.log('err', err);
        res.send(err);
    }
});



function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function asyncCall() {
    console.time('asyncCall');
    console.log('calling');
    var result = await resolveAfter2Seconds();
    console.timeEnd('asyncCall');
    return result;
}

async function getForeCast() {
    const options = {
        strictSSL: false,
        proxy: "http://re036189:Br2s!l07@192.168.200.246:3128",
        agentOptions: {
            //secureProtocol: 'SSLv3_method'
        },
    };
    try {

        const c = await asyncCall();
        console.log('c', c);
        
        console.time('request');
        /* return promise*/
        // const rep = await request.get('https://api.darksky.net/forecast/47cd820f17e11e20b7b94f403b410492/0,0', options);
        const rep = new Promise((resolve, reject) => {
            let resData = [];
            request.get('https://api.darksky.net/forecast/47cd820f17e11e20b7b94f403b410492/0,0', options)
                .on('request', (res) => {
                    console.log(res); // 200
                    res.on('data', function (data) {
                        // compressed data as it is received
                        console.log('received ' + data.length + ' bytes of compressed data')
                    });
                })
                .on('data', function (data) {
                    resData.push(data);
                })
                .on('error', (err) => {
                    reject(err);
                })
                .on('end', () => {
                    resolve(JSON.parse(resData));
                });
        });
        console.timeEnd('request');
        const l = await rep;
        return l;
    } catch (ex) {
        console.log('getForeCast::error', ex);
    }
    return;
}


//
module.exports = router;