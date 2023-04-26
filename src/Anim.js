import { fabric } from 'fabric'

function Anim() {

    let canvas = new fabric.StaticCanvas('c', {
    renderOnAddRemove: false,
    selection: false
    });
    const appheader = document.getElementsByClassName('App-header')[0]
    canvas.setHeight(appheader.offsetHeight);
    canvas.setWidth(appheader.offsetWidth);
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.objectCaching = true;

    function update() {
    
    // update velocity
    canvas.getObjects().forEach((obj) => {
        
        // // update position
        if (obj.get('top') > window.innerHeight)
        {
        obj.vy = Math.random() * 10 + 2
        obj.set({left: Math.floor(Math.random() * canvas.width) - 50, top: -100})
        }
        else
        obj.set({top: obj.get('top') + obj.vy})
    })
    fabric.util.requestAnimFrame(update)
    canvas.renderAll()
    }

    fabric.loadSVGFromURL('https://api.iconify.design/fluent-emoji/party-popper.svg', function(objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);

        for (let i = 0; i < 100; i++)
        {
        obj.clone((clone) => {
            clone.scale = Math.ceil(Math.random() * 3) + 5
            clone.vy = clone.scale
            clone.set({
            left: Math.ceil(Math.random() * canvas.width) - 50,
            top: Math.ceil(Math.random() * canvas.height),
            scaleX: clone.scale,
            scaleY: clone.scale,
            })
            canvas.add(clone);
        })
        }
        update()
    });

    window.onresize = () => {
        const appheader = document.getElementsByClassName('App-header')[0]
        canvas.setHeight(appheader.offsetHeight);
        canvas.setWidth(appheader.offsetWidth);
    }

}

export default Anim;