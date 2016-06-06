var http = require('http'),
    express = require('express'),
    request = require('request'),
    cheerio = require('cheerio'),
    iconv = require('iconv-lite'),
    fileSave = require('file-save')
    vow = require('vow');

var get_table = [], full_table = [];

var getUrlTables = function (i, url, title) {



    full_table[i]=vow.defer();

    request({uri:url,method:'GET',encoding:'binary'}, function (err, res, body) {
        var $ = cheerio.load(body);
        $('.poster  img').each(function(){
            full_table.push({src: this.attribs.src, link: url, title: title});

            console.log(full_table)
        });
    });
    return full_table[i];
};

var crawlData = (function () {

    var urls=[
        {title: 'Снежная королева', link: 'http://www.ivi.ru/watch/96326'},
        {title: 'Снежная королева 2 Перезаморозка', link: 'http://www.ivi.ru/watch/115589'},
        {title: 'Смешарики: Начало', link: 'http://www.ivi.ru/watch/108318'},
        {title: 'От винта!', link: 'http://www.ivi.ru/watch/107287'},
        {title: 'День рождения Алисы', link: 'http://www.ivi.ru/watch/31365'},
        {title: 'Три богатыря на дальних берегах', link: 'http://www.ivi.ru/watch/107203'},
        {title: 'Три богатыря: Ход конем', link: 'http://www.ivi.ru/watch/122627'},
        {title: 'Алеша Попович и Тугарин Змей', link: 'http://www.ivi.ru/watch/33529'},
        {title: 'Добрыня Никитич и Змей Горыныч', link: 'http://www.ivi.ru/watch/33530'},
        {title: 'Илья Муромец и Соловей-разбойник', link: 'http://www.ivi.ru/watch/33558'},
        {title: 'Три богатыря и Шамаханская царица', link: 'http://www.ivi.ru/watch/45788'},
        {title: 'Звездные собаки: Белка и Стрелка', link: 'http://www.ivi.ru/watch/40555'},
        {title: 'Белка и Стрелка: Лунные приключения', link: 'http://www.ivi.ru/watch/103279'},
        {title: 'Элька', link: 'http://www.ivi.ru/watch/58909'},
        {title: 'Новые приключения Аленушки и Еремы', link: 'http://www.ivi.ru/watch/53172'},
        {title: 'Приключения Аленушки и Еремы', link: 'http://www.ivi.ru/watch/53042'},
        {title: 'Чародей равновесия: Тайна Сухаревой башни', link: 'http://www.ivi.ru/watch/130457'},
        {title: 'Тайна Сухаревой башни', link: 'http://www.ivi.ru/watch/tajna_suharevoj_bashni'},
        {title: 'Алиса знает, что делать', link: 'http://www.ivi.ru/watch/alisa_znaet_chto_delat'},
        {title: 'Белка и Стрелка: Озорная семейка', link: 'http://www.ivi.ru/watch/belka_i_strelka_ozornaya_semeyka'},
        {title: 'Необыкновенные приключения Карика и Вали', link: 'http://www.ivi.ru/watch/neobyknovennye_priklucheniya_karika_i_vali_2005'},
        {title: 'Куми-куми', link: 'http://www.ivi.ru/watch/kumi_kumi'},
        {title: 'Джинглики', link: 'http://www.ivi.ru/watch/dzhingliki'},
        {title: 'Смешарики', link: 'http://www.ivi.ru/watch/smeshariki'},
        {title: 'Смешарики Новые приключения', link: 'http://www.ivi.ru/watch/smeshariki_novyie_priklyucheniya'},
        {title: 'Малышарики', link: 'http://www.ivi.ru/watch/malyishariki'},
        {title: 'Фиксики', link: 'http://www.ivi.ru/watch/fiksiki'},
        {title: 'Маша и Медведь', link: 'http://www.ivi.ru/watch/masha_i_medved'},
        {title: 'Машкины страшилки', link: 'http://www.ivi.ru/watch/mashkinyi-strashilki'},
        {title: 'Машины сказки', link: 'http://www.ivi.ru/watch/mashiny_skazki'},
        {title: 'Котики, вперед!', link: 'http://www.ivi.ru/watch/kotiki_vpered'},
        {title: 'Везуха!', link: 'http://www.ivi.ru/watch/vezuha'},
        {title: 'Новаторы', link: 'http://www.ivi.ru/watch/novatory'},
        {title: 'Лунтик и его друзья', link: 'http://www.ivi.ru/watch/luntik'},
        {title: 'Барбоскины', link: 'http://www.ivi.ru/watch/barboskiny'}
    ];


    //Обрабатываем каждый адрес из списка
    for (var i in urls) {
        if (!isNaN(parseInt(urls[i].link.split('watch/')[1]))) {
            urls[i].link += '/description';
        }

        console.log(urls[i].link);
        getUrlTables(i, urls[i].link, urls[i].title);
    }






    vow.all(full_table).spread(function (building) {
        //Сохраняем результат

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
