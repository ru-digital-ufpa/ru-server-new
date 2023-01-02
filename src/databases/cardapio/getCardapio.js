const axios = require('axios');
const cheerio = require('cheerio');


async function getAllCardapio (){
    const siteRuUrl ='https://saest.ufpa.br/ru/index.php/component/cardapio';
    try {
        const {data} = await axios({
            method: 'get',
            url: siteRuUrl,
        })

        const $ = cheerio.load(data)
        const memSelector = '#content-section > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr'

        const keys = [
            'dia',
            'almoco',
            'jantar'
        ]

        $(memSelector).each((parentIdx, parentElem) => {

             let keyIdx = 0
             const cardapioObj = {}
             const k = [{}]

            if (parentIdx){
                $(parentElem).children().each((childIdx, childElem) => {

                    let tdValue = $(childElem).text()
                    const p = tdValue.replace(/\t\s+/g, '').trim().split(/[;\n:]/)
                    
                    cardapioObj[keys[keyIdx]] = p
                    keyIdx++
                })
                return cardapioObj;
            }
            
        });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {getAllCardapio,};