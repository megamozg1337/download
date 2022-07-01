// PASINO BOT V2
// СДЕСЬ ВСЕ ПОНЯТНО
const arrayOne = ['спасибо', 'пасибки', 'спасибо ловим дальше', 'спасиб', 'спасибочки', 'пасиб'];
const arrayTwo = ['Отметка', 'Отметимся', 'Пора отметится', 'тишина', 'как то тихо', 'перекур', 'ждем'];
const arrayThree = ['мимо', 'мим', 'как то мимо все', 'мимо кассы', 'мимос'];
const elem = document.querySelector('.style_scrollWrapper__2O-ad');
/**
 * ГДЕ username = СВОЙ НИК
 * ГДЕ idleTime = ВРЕМЯ ЧЕРЕЗ СКОЛЬКО ОТМЕЧАТСЯ В МИНУТАХ
 */
let isWin, color, idleTimer = 0, idleTime = 15, lossCounter = 0, prevIndex = 0, username = '@qqall';

setInterval(() => {

    const lastItem = elem.lastChild;
    const messageIndex = lastItem.getAttribute('data-message-index');

    if (prevIndex != messageIndex) {
        prevIndex = messageIndex;

        document.querySelectorAll('.style_seeAllButton__2Yywk').forEach((seeAllButton) => {
            seeAllButton.click();
        });

        //console.log('Новое сообщение');

        const text = lastItem.innerText;
        const array = text.split('\n');
        const amount = parseFloat(array[6]);
        const coin = getCoinName(lastItem.innerHTML);

        switch (coin) {
            case 'btc':
                color = '#F7931A';
                break;
            case 'eth':
                color = '#3c3c3d';
                break;
            case 'ltc':
                color = '#2774f0';
                break;
            case 'doge':
                color = '#cb9800';
                break;
            case 'nano':
                color = '#1E90FF';
                break;
            case 'trx':
            case 'avax':
                color = 'tomato';
                break;
            case 'usdt':
                color = 'lime';
                break;
            case 'fey':
            case 'btt':
                color = 'grey'
                break;
            case 'matic':
                color = '#8347e6';
                break;
            default:
                color = '#FFFFFF';
                break;
        }

        if (array.length > 4) {
            //console.log('Пошел дождь');
            for (let winner of array) {
                
                if (winner == username) {
                    isWin = 1;
                    break;
                }

                isWin = 0
            }

            if (isWin) {
                const rnd = Math.floor( Math.random() * arrayOne.length );
            
                console.log(`Вы заработали: %c${amount}`, `color: ${color}`, `${coin.toUpperCase()}`);
                sendMessage(arrayOne[rnd]);

                idleTimer = 0;
                lossCounter = 0;
                
            } else {
                lossCounter++;

                if (lossCounter == 2) {
                    const rnd = Math.floor( Math.random() * arrayThree.length );

                    sendMessage(arrayThree[rnd]);
                    
                    idleTimer = 0;
                    lossCounter = 0;
                }
            }
        }
    }

    idleTimer += 0.5;
    
    if (idleTimer == idleTime * 60) {
        const rnd = Math.floor( Math.random() * arrayTwo.length );
            
        sendMessage(arrayTwo[rnd]);
        idleTimer = 0;
    }
}, 500);

function getCoinName(string) {
    const start = 'cdn.pasino.com/coins/';
    const end = '.';

    let stratIndex = string.indexOf(start);

    if (stratIndex != -1) {
        stratIndex += start.length
        let endIndex = stratIndex;
    
        while (string[endIndex] != end) {
            endIndex++;
        }

        return string.slice(stratIndex, endIndex);
    }
}

function sendMessage(text) {
    const chatInput = document.querySelector('.style_renderText__3cVE8');
    // задержка перед отправкой сообщения в секундах
    const delay = getRandomInt(10, 30);

    setTimeout(() => {
        
        chatInput.textContent = text;
        document.querySelector('[aria-label="send message"]').click();
        
    }, delay * 1000);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
