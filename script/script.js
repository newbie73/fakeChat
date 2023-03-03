import rePic from '../rePic/repic.js'
import PicProperties from '../rePic/construct.js'

// import tags
const chat_messages = document.getElementById("chat-messages")

const msg_input = document.getElementById("message-input")
const chat_btn = document.getElementById("send-button")
const the_date = document.getElementsByClassName("date")
const chat_image_tag = document.getElementsByClassName('chat-img')
const user_image_tag = document.getElementsByClassName('user-avatar')

//rePic generator https://github.com/whishad/rePic
const chat_img_obj = new PicProperties(100, 100, 3, null, false, true)
const user_img_obj = new PicProperties(50, 50, 3, null, false, false)

function giveGeneratedPicture(){
    let args = arguments
    let args_num = arguments.length
    for(let r = 0; r < args_num - 1; r++){
        for(let c = 0; c < args[r].length; c++){
            args[r][c].src = rePic(args[args_num - 1])
        }
    }
}
giveGeneratedPicture(chat_image_tag, chat_img_obj)
giveGeneratedPicture(user_image_tag, user_img_obj)

//when button clicked,then starting functions
chat_btn.addEventListener("click",() => {
    getDate()
    newMessage()
})
//also 
msg_input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        getDate()
        newMessage()
    }
})

//getting date

function getDate(){
    const this_date = new Date()
    const minuts = this_date.getMinutes()
    const hours = this_date.getHours()

    the_date.innerText = (hours < 10 ? "0" + hours : hours) + ':' + (minuts < 10 ? "0" + minuts : minuts)

    console.log(the_date.innerText)
}

//creating user message
function newMessage(){
    const msg_text = msg_input.value.trim()

    if (!msg_text){
        return alert("chi karox linel datark")
    }

    const msg = document.createElement("div")

    msg.innerHTML= '<p>' + msg_text + '<span class="date">' + the_date.innerText + '</span>' + '</p>'

    msg.classList.add("my-message")

    chat_messages.appendChild(msg)

    msg_input.value = '';

    chat_messages.scrollTop = chat_messages.scrollHeight
}