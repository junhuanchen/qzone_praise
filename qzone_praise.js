require('chromedriver');
var webdriver = require('selenium-webdriver');
By = webdriver.By,
    until = webdriver.until;

var qq = '741380738';
var pw = 'xxxxxxxxx';

function logingQzone() {
	var builer = new webdriver.Builder();
    var driver = builer.forBrowser('chrome').build(); // new chrome driver
    driver.get("https://user.qzone.qq.com/" + qq + "/infocenter").then((arr) => {
        console.log('login_frame');
        driver.switchTo().frame(driver.findElement(By.id("login_frame"))).then((arr) => {
            console.log('switcher_plogin');
            driver.findElement(By.id("switcher_plogin")).click().then((arr) => {
                console.log('login_button');
                driver.executeScript('document.getElementById("u").value="' + qq + '"');
                driver.executeScript('document.getElementById("p").value="' + pw + '"');
                driver.findElement(By.id("login_button")).click().then((arr) => {
                    console.log('maximize');
                    // driver.manage().window().maximize();
                    change_frame(driver);
                });
            });
        });
    });
}

function change_frame(driver) {
    driver.switchTo().defaultContent().then((arr) => {
        console.log("waiting to defaultContent loaded");

        driver.executeScript('window.scrollTo(document.body.scrollHeight, document.body.scrollHeight + 100)');

        setTimeout(()=>{
            // main_feed_container
            // driver.switchTo().frame("QM_Feeds_Iframe").then((arr) => { // by my self
            //     console.log("waiting to QM_Feeds_Iframe loaded");
                            // });          
            praise(driver);
        }, 10 * 1000);
    });
}

function praise(driver) {
    console.log('praise');

    driver.findElements(By.className("fui-icon icon-op-praise")).then((arr) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i].getCssValue('background-position').then(v => {
                if (v === '-458px -286px') {
                    console.log(i, 'checked');
                } else {
                    console.log(i, 'check!');
                    arr[i].click()
                }
            })
        }
    });

    driver.findElements(By.className("info-detail")).then((arr) => {
        arr[arr.length - 1].getText().then(v => {
            console.log(v.length);
            if (v.length > 5) {
                console.log('all over');
                driver.quit();
                // driver.sleep(1 * 60 * 1000);
                logingQzone();
            } else {
                change_frame(driver);
            }
        })
    })
}

console.log('running...');
logingQzone();
