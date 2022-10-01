let upload_img_box = document.querySelector('.upload_img_box');
let selectedImage = document.querySelector('#selectedImage');
let choose_image = document.querySelector('.choose_image');

let image_holder = document.querySelector('.image_holder');
let image = document.querySelector('#image');

let slider = document.querySelectorAll('.slider');
let show_value = document.querySelectorAll('.show_value');

let list_options = document.querySelectorAll('ul li');

let options = document.querySelector('.options');
let option = document.querySelectorAll('.option');

let clearAll = document.querySelector('#clearAll');
let remove_img_btn = document.querySelector('#remove_img_btn');

let rotateImage = document.querySelector('#image');
let rightBtn = document.querySelector('#rotate_right_li');
let leftBtn = document.querySelector('#rotate_left_li');
let flipRight = document.querySelector('#horizontal_li');
let flipUp = document.querySelector('#vertical_li');
let zoomImage = document.querySelector('#image');
let zoomIn = document.querySelector('#zoomIn');
let zoomOut = document.querySelector('#zoomOut');
let crop = document.querySelector("#crop");
let en_de_crop = document.querySelector("#en_de_crop");

//for reseting purpose
let originalImage = "";

//for flipping and rotating
let rotateDeg = 0, flipHorizontal = 1, flipVertical = 1;

// let rotateOptions = document.querySelectorAll(".rotate");

// let canvas = document.querySelector("#image_canvas");
// const context = canvas.getContext("2d");

let File_Name;
let Edited = false;



/*handle choose image event*/
upload_img_box.addEventListener("click", function () {
   selectedImage.click();
});


/*choose image event*/
selectedImage.addEventListener("change", function () {
   const file = this.files[0];

   if (file) {
      const reader = new FileReader();
      File_Name = file.name;

      choose_image.style.display = "none";
      image_holder.style.display = "block";
      image_holder.style.backgroundColor = "transparent";

      reader.addEventListener("load", function () {
         image.setAttribute("src", this.result);
         originalImage = image.getAttribute("src");
      });

      reader.readAsDataURL(file);
      remove_img_btn.style.display = "block";
   }

   if (Edited == false) {
      Edited = true;
   }

})


/*function call when slider value change*/
for (let i = 0; i <= slider.length - 1; i++) {
   slider[i].addEventListener('input', editImage);
}

let bright;
let contrast;
let blur;
let grey;
let hue;
let saturation;
let invertion;

let brightVal;
let contrastVal;
let greyVal;
let blurVal;
let hueVal;
let satuVal;
let invertVal;

function editImage() {
   bright = document.querySelector('#brightness');
   contrast = document.querySelector('#contrast');
   blur = document.querySelector('#blur');
   grey = document.querySelector('#greyScale');
   hue = document.querySelector('#hue');
   saturation = document.querySelector('#saturation');
   invertion = document.querySelector('#invertion');


   let brightValShow = document.querySelector('#brightVal');
   let contrastValShow = document.querySelector('#contrastVal');
   let blurValShow = document.querySelector('#blurVal');
   let greyValShow = document.querySelector('#greyVal');
   let hueValShow = document.querySelector('#hueVal');
   let saturationValShow = document.querySelector('#saturationVal');
   let invertionValShow = document.querySelector('#invertionVal');
   let opacityValShow = document.querySelector('#opacityVal');

   brightVal = bright.value;
   contrastVal = contrast.value;
   greyVal = grey.value;
   blurVal = blur.value;
   hueVal = hue.value;
   satuVal = saturation.value;
   invertVal = invertion.value;

   brightValShow.innerHTML = brightVal;
   contrastValShow.innerHTML = contrastVal;
   blurValShow.innerHTML = blurVal;
   greyValShow.innerHTML = greyVal;
   hueValShow.innerHTML = hueVal;
   saturationValShow.innerHTML = satuVal;
   invertionValShow.innerHTML = invertVal;
   opacityValShow.innerHTML = opacityVal;

   image.style.filter = 'grayscale(' + greyVal + '%) invert('+ invertVal + '%) opacity(' + opacityVal + '%) hue-rotate(' + hueVal + 'deg) brightness(' + brightVal + '%) blur(' + blurVal + 'px) contrast(' + contrastVal + '%) saturate(' + satuVal + ')';

   // context.filter = 'grayscale(' + greyVal + '%) invert('+ invertVal + '%) hue-rotate(' + hueVal + 'deg) brightness(' + brightVal + '%) blur(' + blurVal + 'px) contrast(' + contrastVal + '%) saturate(' + satuVal + ')';
   
   clearAll.style.transform = 'translateY(0px)';
   clearAll.style.display = 'flex';
}


/*handle each option click even*/
list_options.forEach((list_option, index) => {
   list_option.addEventListener('click', function () {


      if (image.getAttribute('src') == "") {
         alert("Choose Image First");
      } else {

         options.style.transform = 'translateY(0px)';

         if (Edited == true) {
            for (let i = 0; i <= 7; i++) {

               if (index != i) {
                  list_options[i].classList.remove("active_option");
                  option[i].classList.remove("active_controller");

               } else {
                  this.classList.add("active_option");
                  option[i].classList.add("active_controller");
               }
            }

         } else {
            alert("Edit Your Image First");
         }

      }

   })
})


/*download image btn click*/
function Download_btn() {
  if (image.getAttribute("src") != "") {
    if (Edited == true) 
    {
      let canvas = document.querySelector("#image_canvas");
      const context = canvas.getContext("2d");
      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      context.filter = 'grayscale(' + greyVal + '%) invert('+ invertVal + '%) hue-rotate(' + hueVal + 'deg) brightness(' + brightVal + '%) blur(' + blurVal + 'px) contrast(' + contrastVal + '%) saturate(' + satuVal + ')';
      context.translate(canvas.width / 2, canvas.height / 2); // translating canvas from center
      if(rotateDeg !== 0) { // if rotate value isn't 0 , rotate the canvas
         context.rotate(rotateDeg * Math.PI / 180);
      }
      context.scale(flipHorizontal, flipVertical) ; // flip canvas, horizontally / vertically
      context.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

      var jpegUrl = canvas.toDataURL("image/jpg");

      const link = document.createElement("a");
      document.body.appendChild(link);

      link.setAttribute("href", jpegUrl);
      link.setAttribute("download", File_Name);
      link.click();
      document.body.removeChild(link);
    }
  }
}


/*clear or reset range value*/
clearAll.addEventListener("click", function () {
   clearAllRangeValue();
})

function clearAllRangeValue() {
  image.style.filter = "none";
//   context.filter = "none";
  for (let i = 0; i <= slider.length - 1; i++) {
    if (i == 0) {
      slider[i].value = "100";
    } else if (i == 1) {
      slider[i].value = "100";
    } else {
      slider[i].value = "0";
    }
  }
  image.src = originalImage;

   //reset image rotation
   rotateDeg = 0;
   flipHorizontal = 1;
   flipVertical = 1;
   rotateImage.style.transform = `rotate(${rotateDeg}deg) scale(${flipHorizontal}, ${flipVertical})`;

  editImage();
  clearAll.style.transform = "translateY(150px)";
  clearAll.style.display = 'flex';
  crop.style.transform = "translateY(150px)";
}

/*remove image btn click*/
remove_img_btn.addEventListener("click", function () {
  image.src = "";
  this.style.display = "none";
  choose_image.style.display = "block";
  image_holder.style.display = "none";
  options.style.transform = "translateY(80px)";
  clearAllRangeValue();

  //reset value of image input data
  selectedImage.value = null;

  //reset image rotation
  rotateDeg = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  rotateImage.style.transform = `rotate(${rotateDeg}deg) scale(${flipHorizontal}, ${flipVertical})`;
});

/*Rotate image */

rightBtn.addEventListener("click", () => {
   console.log(`before rotation: ${rotateDeg}`); 
   rotateDeg = (rotateDeg + 90) % 360;
   console.log(`after rotation: ${rotateDeg}`);
   rotateImage.style.transform = `rotate(${rotateDeg}deg) scale(${flipHorizontal}, ${flipVertical})`;
});

leftBtn.addEventListener("click", () => {
   console.log(`before rotation: ${rotateDeg}`); 
   rotateDeg = (rotateDeg - 90) % 360;
   console.log(`after rotation: ${rotateDeg}`);
   rotateImage.style.transform = `rotate(${rotateDeg}deg)`;
});

flipRight.addEventListener("click", () => {
   flipHorizontal = flipHorizontal === 1 ? -1 : 1;
   rotateImage.style.transform = `rotate(${rotateDeg}deg) scale(${flipHorizontal}, ${flipVertical})`;
});

flipUp.addEventListener("click", () => {
   flipVertical = flipVertical === 1 ? -1 : 1;
   rotateImage.style.transform = `rotate(${rotateDeg}deg) scale(${flipHorizontal}, ${flipVertical})`;
});


// zoom in zoom out image
zoomIn.addEventListener('click',() => {
   var currWidth = zoomImage.clientWidth;
   if(currWidth == 5000){
      alert('Maximum Zoom In reached');
   }
   else{
      zoomImage.style.width = (currWidth + 40) + 'px';
   }
})

zoomOut.addEventListener('click',() => {
   var currWidth = zoomImage.clientWidth;
   if(currWidth == 40){
      alert('Maximum zoom out reached');
   }else{
      zoomImage.style.width  = (currWidth - 40) + 'px';
   }
})

//enable disable cropping tool
let cropper = null;
let isEnabled = false;

document.getElementById('crop').addEventListener('click', function(){
   var croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
   image.src = croppedImage;
   cropper.destroy();
   cropper = null;
   isEnabled = false;
   crop.style.transform = "translateY(150px)";
});

document.getElementById('en_de_crop').addEventListener('click', ()=>{
   if(!isEnabled)
   {
      if(image.getAttribute('src') == "")
         crop.style.display = 'none';
      
      else
      {
         clearAll.style.display = 'flex';
         clearAll.style.transform = 'translateY(0px)';
         crop.style.display = 'inline';
         crop.style.transform = "translateY(0px)";
         cropper = new Cropper(image, {
            aspectRatio: 0,
            viewMode: 0,
            background: false
         });

         clearAll.style.transform = "translateY(0px)";
         isEnabled = true;
      }
   }
   else
   {
      crop.style.transform = "translateY(150px)";
      clearAll.style.transform = "translateY(150px)";
      cropper.destroy();
      cropper = null;
      isEnabled = false;
   }
});


/*///////////////////////////////////////*/ 

