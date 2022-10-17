const puppeteer = require('puppeteer'); 
// const fs = require('fs').promises; 
// path: ./config/cron-tasks.js

module.exports = {
    /**
     * Simple example.
     * Every monday at 1am.
     */
  
    '0/20 * * * * *': async ({ strapi }) => {
        console.log("running a task every 20 second");
        console.log('cron run...');
        let urlpage = 'https://iboard.ssi.com.vn';

            //initiate the browser 
            const browser = await puppeteer.launch({
                args: [
                  '--window-size=824,2080',
                ],
              });
         
            //create a new in headless chrome 
            const page = await browser.newPage(); 

            await page.setViewport({
                width: 800,
                height: 2400,
            });


            //go to target website 
            await page.goto(urlpage, { 
                //wait for content to load 
                waitUntil: 'networkidle0', 
            }); 
         
            //get full page html 
            // const html = await page.content();   

            const MaCKVL = await page.evaluate(() => 
                Array.from(document.querySelectorAll('.price-board-wrapper > div .ag-center-cols-clipper .ag-center-cols-viewport .ag-center-cols-container > div')).map((el, index) =>
                    {
                        let mackfind = document.querySelectorAll('.price-board-wrapper > div .ag-pinned-left-cols-container > div .ag-cell-not-inline-editing.ag-cell-content-left.ag-cell-value')[index].innerHTML;
                        return {
                            'name': mackfind,
                            'buy-price-3': el.querySelectorAll('[aria-colindex="23"]')[0].innerHTML,
                            'buy-vol-3': el.querySelectorAll('[aria-colindex="24"]')[0].innerHTML,
                            'buy-price-2': el.querySelectorAll('[aria-colindex="25"]')[0].innerHTML,
                            'buy-vol-2': el.querySelectorAll('[aria-colindex="26"]')[0].innerHTML,
                            'buy-price-1': el.querySelectorAll('[aria-colindex="27"]')[0].innerHTML,
                            'buy-vol-1': el.querySelectorAll('[aria-colindex="28"]')[0].innerHTML,
                            'sell-price-3': el.querySelectorAll('[aria-colindex="37"]')[0].innerHTML,
                            'sell-vol-3': el.querySelectorAll('[aria-colindex="38"]')[0].innerHTML,
                            'sell-price-2': el.querySelectorAll('[aria-colindex="35"]')[0].innerHTML,
                            'sell-vol-2': el.querySelectorAll('[aria-colindex="36"]')[0].innerHTML,
                            'sell-price-1': el.querySelectorAll('[aria-colindex="33"]')[0].innerHTML,
                            'sell-vol-1': el.querySelectorAll('[aria-colindex="34"]')[0].innerHTML
                        }
                        
                    })
            );                
            //close headless chrome 
            await browser.close(); 
            console.log(MaCKVL);

      // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
    },
  };
   