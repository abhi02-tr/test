const cheerio = require("cheerio");
const unirest = require("unirest");
const express = require("express");

const getData = async (text) => {
    try {
        const url = `https://www.google.com/search?q=${text}`;
        const response = await unirest.get(url).headers({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
        }) 
        const $ = cheerio.load(response.body);
        
        // $("#search div div").each((e,el) => {
            
        //     // const data = [];
        //     // let link = $(el).find(".yuRUbf a").attr("href");

        //     // if(data)
        //     // console.log($(el).find(".yuRUbf > a").attr("href"));

        // })
        let data = [];
        $("#tads .uEierd").each((i, el) => {
            let sitelinks = [];
            data[i] = {
                title: $(el).find(".v0nnCb span").text(),
                snippet: $(el).find(".lyLwlc").text(),
                displayed_link: $(el).find(".qzEoUe").text(),
                link: $(el).find("a.sVXRqc").attr("href"),
            }
            if ($(el).find(".UBEOKe").length) {
                $(el).find(".MhgNwc").each((i, el) => {
                    sitelinks.push({
                        title: $(el).find("h3").text(),
                        link: $(el).find("a").attr("href"),
                        snippet: $(el).find(".lyLwlc").text()
                    })
                }) 
                data[i].sitelinks = sitelinks
            }
        })

        console.log(data)
        return data;
    } catch (e) {
        console.log(e);
    }
}


const app = express();

app.post("/api/getData", (req,res) => {
    const serach = req.body.search;
    const data = getData(search);

    res.json(data);

});

app.listen(3000, () => {
    console.log("server is runnig..");
})