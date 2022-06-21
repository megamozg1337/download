const arrayOne = ['спасибо', 'пасибки', 'спасибо ловим дальше', 'спасиб', 'спасибочки'];
const arrayTwo = ['Отметка', 'Отметимся', 'Пора отметится', 'тишина', 'как то тихо', 'перекур', 'ждем'];
const arrayThree = ['мимо', 'мим', 'как то мимо все', 'мимо кассы', 'мимос'];

const username = 'qqall';

let isWin, lossCounter = 0, idleTimer = 0; idleTime = 15; prevMessageId = '';

setInterval( () => {

    const obj = JSON.parse( localStorage.getItem('chatMessages') );

    const message = obj[obj.length -1];
    const messageId = message.message_id;
    

    if (prevMessageId != messageId) {
        prevMessageId = messageId;

        // console.log('Новое сообщение');
        
        if (message.type == 'rain') {
            for (let winner of message.winners) {

                if (winner == username) {
                    isWin = 1;
                    break;
                }

                isWin = 0
            }

            if (isWin) {
                const rnd = Math.floor( Math.random() * arrayOne.length );

                console.log(`Вы выиграли: ${message.amount} ${message.coin}`)
                SendMessage(arrayOne[rnd]);
                
                lossCounter = 0;
                idleTimer = 0;
                
            } else {
                lossCounter++;
                
                if (lossCounter > 2) {
                    const rnd = Math.floor( Math.random() * arrayThree.length );

                    SendMessage(arrayThree[rnd]);
                    
                    lossCounter = 0;
                    idleTimer = 0;
                }
            }
        }
    }

    idleTimer += 0.5;

    if (idleTimer == idleTime * 60) {
        const rnd = Math.floor( Math.random() * arrayTwo.length );
        
        SendMessage(arrayTwo[rnd]);
        idleTimer = 0;
    }
    
}, 500);

function SendMessage(text) {
    
    const chatInput = document.querySelector('.style_renderText__1C5MK');
    const delay = getRandomInt(10, 30);

    setTimeout(() => {
        
        chatInput.focus();
        document.execCommand('insertText', false, text);
        chatInput.blur();

        document.querySelector('[aria-label="send message"]').click();
        
    }, delay * 1000);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
