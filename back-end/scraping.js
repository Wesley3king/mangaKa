//modulo de scraping dos sites

const puppeteer = require("puppeteer");
const fs = require("fs");


async function obter () {
    
    const browser = await puppeteer.launch({ 
        args :  [ '--disable-dev-shm-usage', '--shm-size=1gb' ],
        headless: true
      });
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if(req.resourceType() === 'image'){
            req.abort();
            }
            else {
            req.continue();
        }
    });
    
    await page.goto('https://mangayabu.top/');
    await page.waitForTimeout(3000);
   const elemento = await page.evaluate(()=>{
       let nome = document.querySelectorAll(".carousel-item");

       let rr = [];
       let nn = Object.keys(nome);
       for (let i= 0; i< nn.length; ++i) {
         rr.push(nome[nn[i]].innerHTML);
       }
       return rr;
       
   }).catch(e => console.log(e));

   //remove as scans nativas
   for (let i = 0; i < 15; ++i) {
     elemento.pop();
   }
   //obtem = fatia nome do manga, link link para o main, img imagem
   let fatia1 = elemento.map( str => str.split('/">'));
   
   let fatia_2 = [],fatia_3 = [], fatia = [];//6 - lacanmentos,2 - ultimos adicionados, 3 - populares
   let link = [],link_2 = [], link_3 = [];
   let img = [], img_6 = [], img_2 = [];

   for(let i = 0; i < fatia1.length; ++i) {
   if (fatia1[i].length === 2){
    fatia_2.push(fatia1[i][1].split("</a"));
    link_2.push(fatia1[i][0].split('" href="'));
    img_2.push(fatia1[i][0].split('src="'));
    //console.log(fatia1[i]);

   }else if (fatia1[i].length === 6) {
    fatia.push(fatia1[i][5].split("</a"));
    link.push(fatia1[i][4].split(' href="'));
    img_6.push(fatia1[i][0].split('src="'));

   }else if (fatia1[i].length === 3) {
    fatia_3.push(fatia1[i][2].split("</a"));
    link_3.push(fatia1[i][1].split('" href="'));
    img.push(fatia1[i][0].split('src="'));

   }
  }
//finalizando links
let l_link = [], p_link = [], u_link = [];

for(let i of link_3) {
  u_link.push(i[1]);//ultimos add
}
for (let i of link_2) {
  p_link.push(i[2]);//populares
}
for(let i of link) {
  l_link.push(i[1]);//lancamentos
}
  //finalizando imagens
  let image_6 = img_6.map(arr => arr[1].split('" data-'));
  //console.log(image_6);
  let image_2 = img_2.map(arr => arr[1].split('" data-'));
  //console.log(image_2);
  let image_3 = img.map(arr => arr[1].split('" data-'));

  
  
  //montando o array
  //lancamentos
  let f1 = l_link.map((lnk, ind) => [fatia[ind][0], image_6[ind][0], lnk]);
  //populares
  let f2 = p_link.map((lnk, ind) => [fatia_2[ind][0], image_2[ind][0], lnk]);
  //ultimos adicionados
  let f3 = u_link.map((lnk,ind) => [fatia_3[ind][0], image_3[ind][0], lnk]);
  
  //console.log(f2);
  delete image_2, image_3, image_6, fatia1, fatia_2, fatia_3, fatia, l_link, p_link, u_link, elemento;
  //finalizando

  let dados = {
    lancamentos : f1,
    popular : f2,
    atualizados : f3
  }

  //console.log(dados);
   await browser.close();
   return dados;
}

//obter();

//pagina de selecão de capitulos

async function entrar (url) {
      const browser = await puppeteer.launch({ 
        args :  [ '--disable-dev-shm-usage', '--shm-size=1gb' ],
        headless: true
      });
    const page = await browser.newPage();

   /* await page.setRequestInterception(true);
    page.on('request', (req) => {
        if(req.resourceType() === 'image'){
            req.abort();
            }
            else {
            req.continue();
        }
    });*/
    console.log(url,typeof url);
    await page.goto(url);
    await page.waitForTimeout(3000);

    const elemento = await page.evaluate(()=>{
      //sinopse
        let paragrafos = document.querySelectorAll("p");
        let chaves = Object.keys(paragrafos), cont = [];
        for (let i = 0; i < chaves.length; ++i) {
          cont.push(paragrafos[chaves[i]].innerHTML);
        }
        //categorias
        let cat = document.querySelector(".single-tags");
        
        //capitulos
        let cap = document.querySelector(".row.rowls");
        //nome do manga
        let tit = document.querySelector("h1");
        //
        
        return [cont[1], cat.innerHTML, cap.innerHTML];
    });
    //cortar os capitulos - link, capitulo
    let capitulos = elemento[2].split("</a>");

    let l_corte1 = capitulos.map(str => str.split('href="'));
    //console.log(l_corte1[1][1]);
    let l_corte2 = l_corte1.map(arr => {
      if (arr.length >= 2){
        return arr[1].split('" class=');
      } } );
    //console.log(l_corte2); o link esta na posicao 0;

    let n_corte1 = capitulos.map(str => str.split('s-infs">'));

    let n_corte2 = n_corte1.map(arr => {
      if (arr.length >= 2){
        return arr[1].split('<small><d');
      } } );
    //console.log(n_corte2); o nome esta na posicao 0;
    //corte para retirar uma falha
    n_corte2.pop();
    l_corte2.pop();
    //delete l_corte1, n_corte1, capitulos;
    let a_final = l_corte2.map((arr, ind)=> [n_corte2[ind][0],arr[0]]);

    let data = [elemento[0], elemento[1], a_final];
    console.log(data);
    await browser.close();
    return data;
}

//entrar('https://mangayabu.top/manga/solo-leveling');

//leitor de capitulos

async function leitor (url) {
      const browser = await puppeteer.launch({ 
        args :  [ '--disable-dev-shm-usage', '--shm-size=1gb' ],
        headless: true
      });
    const page = await browser.newPage();

     /*await page.setRequestInterception(true);
    page.on('request', (req) => {
        if(req.resourceType() === 'image'){
            req.abort();
            }
            else {
            req.continue();
        }
    });*/
    
    await page.goto(url);
    page.setDefaultTimeout(50000);
    await page.waitForTimeout(3000);

    const elemento = await page.evaluate(()=>{
      //paginas
      let imgs = document.querySelector(".section.table-of-contents");
      //capa do manga
      let cp = document.querySelector(".manga-cover-single");
      //nome do manga
      let tit = document.querySelector("h1");
      //sinopse
      let sin = document.querySelector('.manga-info-synopsis')
      return [cp.innerHTML, imgs.innerHTML, tit.innerHTML,sin.innerHTML];
    });

    //recortando as imagems
    let img_pt1 = elemento[1].split('">');
    let img_pt2 = img_pt1.map(str => str.split('-src="'));//link na posicaõ 1;
    
    //img de capa
    let f1 = elemento[0].split('" data-');
    let f2 = f1[0].split('src="');//imagem na posicao 1;




    //remove o excesso
    img_pt2.pop();
    let data =  [elemento[2], f2[1], elemento[3], img_pt2.map(arr=>arr[1])];
    //console.log(elemento[3]);
    browser.close();
}

//leitor('https://mangayabu.top/?p=102021');


// mundo manga kun


async function obterM () {
    
    const browser = await puppeteer.launch({ 
        args :  [ '--disable-dev-shm-usage', '--shm-size=1gb' ],
        headless: true
      });
    const page = await browser.newPage();
     

    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if(req.resourceType() === 'image'){
            req.abort();
            }
            else {
            req.continue();
        }
    });

    await page.goto('https://mundomangakun.com.br/situacao/em-andamento/');
   
   const elemento = await page.evaluate(()=>{
       //nome
       let nome = document.querySelectorAll(".post_projeto_titulo");
       let rr = [];
       let nn = Object.keys(nome);
       for (let i= 0; i< nn.length; ++i) {
         rr.push(nome[nn[i]].innerHTML);
       }
       //imagems
       let imm = document.querySelectorAll(".post_projeto_thumbnail_img");
       let quant = Object.keys(imm), res = [];
       for (let i = 0; i < quant.length; ++i) {
           res.push(imm[quant[i]].getAttribute("src"));
       }
       //capitulo
       let ult = document.querySelectorAll(".post_projeto_ultimo_cap");
       let inu = Object.keys(ult), cap = [];
       for (let i = 0; i < inu.length; ++i) {
           cap.push(ult[inu[i]].innerText);
       }
       //link
       let llk = document.querySelectorAll(".btn_large_primary");
       let ind = Object.keys(llk), lin = [];
       for (let i = 0; i < ind.length; ++i) {
           lin.push(llk[ind[i]].getAttribute("href"));
       }

       return [rr,res,cap,lin];
       
   }).catch(e => console.log(e));

   let linkn = elemento[3].filter((val, ind)=> 
       ind%2 !== 0 ? val: console.log("eliminado")
   );

  let dados = elemento[0].map((item, indice )=> [item, elemento[1][indice], elemento[2][indice], linkn[indice]]);
   
   //console.log(linkn);
console.log(dados);
    await browser.close();

}

//obter();

async function obterInterno (url) {
    let browser = await puppeteer.launch({ 
        args :  [ '--disable-dev-shm-usage', '--shm-size=1gb' ],
        headless: true
      });
      let page = await browser.newPage();

      await page.setRequestInterception(true);
        page.on('request', (req) => {
            if(req.resourceType() === 'image'){
                req.abort();
                }
                else {
                req.continue();
            }
        });
    await page.goto(url);

    const info = await page.evaluate(()=> {
        //sinopse
        let sin = document.querySelector(".conteudo_projeto");
        
        //lista de capitulo
        let link_c = document.querySelectorAll(".link_capitulo");
        let cap = [],tot = [],ind = Object.keys(link_c);
       for (let i = 0; i < ind.length; ++i) {
        cap.push(link_c[i].getAttribute("onclick"));
        tot.push(link_c[i].innerHTML);
       }
        return [sin.innerHTML,cap,tot];
    });

    //tratamento de sinopse
    let fase1 = info[0].split(">");
    let fase2 = fase1[1].split("<");

    //tratando links de capitulo
    let href_l = info[1].map(item=> item.replace(/[\\]/g,""));
    let fatia1 = href_l.map(item=> item.split("link':'"));
    let fatia2 = fatia1.map(sub => sub[1].split("','"));
    
    delete fase1, href_l, fatia1,href_l;
    let data = [fase2[0], info[2].map((item ,indice) => [item,fatia2[indice][0]])];
    console.log(data);
    await browser.close();
}

//obterInterno('https://mundomangakun.com.br/projeto/yuusha-sama-yukagen-wa-ikaga-desu-ka/');

async function leitor (url) {
    let browser = await puppeteer.launch({ 
        args :  [ '--disable-dev-shm-usage', '--shm-size=1gb' ],
        headless: false
      });
      let page = await browser.newPage();

      await page.setRequestInterception(true);
        page.on('request', (req) => {
            if(req.resourceType() === 'image'){
                req.abort();
                }
                else {
                req.continue();
            }
        });

        await page.goto(url);
        
        await page.waitForSelector("#btn_ok_mais_18");
        await page.click('#btn_ok_mais_18');
        await page.waitForSelector("#label_leitor_paginacao_completo");
        //await page.click("#label_leitor_paginacao_completo");
        await page.evaluate(()=> {
            let radio = document.querySelector("#label_leitor_paginacao_completo");
            radio.click();
        })
        await page.waitForSelector("img.pagina_capitulo");
        await page.waitForTimeout(1000);
         //coleta de dados
        const dados = await page.evaluate(()=> {
            let paginas = document.querySelectorAll(".pagina_capitulo");
            let ind = Object.keys(paginas), img = [];
            for (let i =0; i < ind.length; ++i) {
                img.push(paginas[ind[i]].getAttribute("src"));
            }
            return img;
        })

        console.log(dados);

  await browser.close()
}
//leitor('https://mundomangakun.com.br/leitor-online/projeto/yuusha-sama-yukagen-wa-ikaga-desu-ka/cap-tulo-04/#pagina/1');

module.exports = {entrar, leitor, obter, obterM, obterInterno};