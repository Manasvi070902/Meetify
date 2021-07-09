import * as htmlToImage from 'html-to-image';

function captureVideos() {
    let canvas = document.getElementById("canvas"); // declare a canvas element in your html
    let ctx = canvas.getContext("2d");
    let videos = document.querySelectorAll("video");
    let w, h;
  
    for (let i = 0, len = videos.length; i < len; i++) {
      const v = videos[i];
      console.log(v.src);
    //   if (!v.src) continue; // no video here
      try {
        w = v.videoWidth;
        h = v.videoHeight;
        canvas.width = w;
        canvas.height = h;
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(v, 0, 0, w, h);
        const a = canvas.toDataURL();
        v.style.backgroundImage = `url(${a})`;
        v.style.backgroundSize = "cover";
        ctx.clearRect(0, 0, w, h); // clean the canvas
      } catch (e) {
        console.log(e);
        continue;
      }
    }
  }

export const saveAs = (blob, fileName) =>{
    var elem = window.document.createElement('a');
    elem.href = blob
    elem.download = fileName;
    elem.style = 'display:none;';
    (document.body || document.documentElement).appendChild(elem);
    if (typeof elem.click === 'function') {
        elem.click();
    } else {
        elem.target = '_blank';
        elem.dispatchEvent(new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
        }));
    }
    URL.revokeObjectURL(elem.href);
    elem.remove()
  }


  var node = document.getElementById('mainboard');

  
  export const imageCapture = async() =>{
    console.log('hi')
    await captureVideos();
    htmlToImage.toPng(node , "")
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        saveAs(dataUrl, 'image.png');
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    }
