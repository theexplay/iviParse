var http = require('http'),
    express = require('express'),
    request = require('request'),
    cheerio = require('cheerio'),
    iconv = require('iconv-lite'),
    fileSave = require('file-save')
    vow = require('vow');

var get_table = [], full_table = [];

var getUrlTables = function (i, url) {


    full_table[i]=vow.defer();

    request({uri:url,method:'GET',encoding:'binary'}, function (err, res, body) {
        var $ = cheerio.load(body)

        $('.poster  img').each(function(){
            full_table.push({src: this.attribs.src, link: url});

            console.log(full_table)
        });
    })

    return full_table[i];
};

var crawlData = (function () {

    var urls=[
        'http://www.ivi.ru/watch/67957/description',
        'http://www.ivi.ru/watch/110285/description',
        'http://www.ivi.ru/watch/109310/description',
        'http://www.ivi.ru/watch/127031/description',
        'http://www.ivi.ru/watch/126996/description',
        'http://www.ivi.ru/watch/102328/description',
        'http://www.ivi.ru/watch/58921/description',
        'http://www.ivi.ru/watch/18158/description',
        'http://www.ivi.ru/watch/26606/description',
        'http://www.ivi.ru/watch/19881/description',
        'http://www.ivi.ru/watch/53150/description',
        'http://www.ivi.ru/watch/131522/description',
        'http://www.ivi.ru/watch/26574/description',
        'http://www.ivi.ru/watch/9828/description',
        'http://www.ivi.ru/watch/a_zori_zdes_tihie/51492',
        'http://www.ivi.ru/watch/17_mgnoveniy_vesny',
        'http://www.ivi.ru/watch/oni_srazhalis_za_rodinu',
        'http://www.ivi.ru/watch/molodaya_gvardiya',
        'http://www.ivi.ru/watch/idi_i_smotri',
        'http://www.ivi.ru/watch/zadaniya_osoboj_vazhnosti_operatsiya_tajfun'
    ];


    //Обрабатываем каждый адрес из списка
    for(var i in urls)
        getUrlTables(i,urls[i]);





    vow.all(full_table).spread(function (building) {
        //Сохраняем результат



        //fs.open("result.txt", function(err,file_handle){
        //    if(!err){ fs.write(file_handle,full_table,null,'utf8'); }
        //});

        fileSave('sample/test')
            .write(full_table, 'utf8')
            .write('this is the second line', 'utf8', function() {
                console.log('writer callback')
            })
            .end('this is the end')
            .error(function() {
                console.log('error goes here')
            })
            .finish(function() {
                console.log('write finished.')
            })
    })

});

crawlData();
