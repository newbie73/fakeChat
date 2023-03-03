const canvas = document.createElement('canvas')
const ctxt = canvas.getContext('2d')

function rePic(object_list){
    //propertie_list handler
    const listHandler = {
        cnvs_width: object_list.width,
        cnvs_height: object_list.height,
        number: object_list.number,
        cache: {
            color: undefined,
        },
        rect_fill: function fillRect(){
            const cache = this.cache
            const rect_fill = object_list.rect_fill
            let rect_fill_res = rect_fill
            const colorful = object_list.colorful

            //detect default color is exist or no
            if(!rect_fill){
                //checks the fillcolor flag and, depending on it, gets the same color, or generates constantly
                if(cache.color && !colorful){
                    //returning color from cache
                    return cache.color
                }else{
                    //colors array
                    const rect_fill_clr_arr = ["rgb(118, 255, 124)", "rgb(255, 162, 162)", 
                    "rgb(180, 255, 118)", "rgb(118, 255, 171)", "rgb(118, 196, 255)", 
                    "rgb(164, 118, 255)", "rgb(255, 118, 118)", "rgb(255, 171, 118)",
                    "rgb(168, 255, 118)", "rgb(173, 118, 255)", "rgb(228, 118, 255)"]

                    //getting random color
                    rect_fill_res = rect_fill_clr_arr[Math.floor(Math.random() * 10)]

                    //write color in chache
                    cache.color = rect_fill_res

                    //returning color
                    return rect_fill_res
                }
            }else{
                //if else,then returning default color
                return rect_fill_res
            }
        },
        back_fill: object_list.back_fill,
    }
    //importing properties
    canvas.width = listHandler.cnvs_width
    canvas.height = listHandler.cnvs_height

    //creating background
    ctxt.fillStyle = object_list.back_fill
    ctxt.fillRect(0,0,canvas.width,canvas.height)

    //getting canvas width first number,for future Math calculation
    const width_num = Number(String(canvas.width)[0])
    const height_num = Number(String(canvas.height)[0])

    //number of rectangles by x and y
    const count_x = listHandler.number
    const count_y = listHandler.number

    //counter for counting the distance traveled by x
    let counter_x = 0

    //distance between rectangles
    let margin_x = 0
    let margin_y = 0

    //trigger for random
    let trigger = 1

    //inner rectangles width and height
    const inner_rect_width = Math.floor(canvas.width / count_x)
    const inner_rect_height = Math.floor(canvas.height / count_y)

    //loop for generating pictures
    for(let i = 0; i < count_x * count_y; i++){
        //randomise logic
        trigger = Math.round(Math.random())
        if(trigger === 1){
            ctxt.beginPath()
            ctxt.rect(margin_x, margin_y, inner_rect_width, inner_rect_height)
            ctxt.fillStyle = listHandler.rect_fill('red')
            ctxt.fillRect(margin_x, margin_y, inner_rect_width, inner_rect_height)
            ctxt.stroke()

            distanceLog()

        }else{
            distanceLog()
        }

        function distanceLog(){
            //distance logic
            if(counter_x + 1 === count_x){
                counter_x = 0
                margin_x = 0

                margin_y += inner_rect_height
            }else{
                counter_x++
                margin_x += inner_rect_width
            }
        }
    }
    return canvas.toDataURL('image/png')
}

export default rePic