var gallery_pic = document.getElementById("img1");
var my_canvas;

var img_num = 0;
var arr = [
    ["images/img1.jpg", "caption1"],
    ["images/img2.jpg", "caption2"],
    ["images/img3.jpg", "caption3"],
    ["images/img4.jpg", "caption4"],
    ["images/img5.jpg", "caption5"],
    ["images/img6.jpg", "caption6"]];
var thumbnail_array = [];

var time = 0;
var circle_time = 50;
var circle = 1.5;
var circle_factor = 0.025;
var circle_max_time = (2 / circle_factor) / (1000 / 50) * 1000;
var c = document.getElementById("my_canvas");
var context = c.getContext("2d");
var is_playing = true;

window.onload = function() {

    function play_down() {
        if (is_playing) {
            document.getElementById("my_canvas").style.backgroundImage = "url('images/pause_button.png')";
            is_playing = false;
        }
        else {
            document.getElementById("my_canvas").style.backgroundImage = "url('images/play_button.png')";
            is_playing = true;
        }
    }

    function play_out() {
        if (is_playing) {
            document.getElementById("my_canvas").style.backgroundImage = "url('images/play_button.png')";
        }
        else {
            document.getElementById("my_canvas").style.backgroundImage = "url('images/pause_button.png')";
        }
    }

    my_canvas = document.getElementById("my_canvas");
    my_canvas.onmousedown = play_down;
    my_canvas.onmouseout = play_out;


    function thumbnail_over() {
        this.className = 'thumbnail_over';
    }

    function thumbnail_down(img, caption) {
        this.className = 'thumbnail_down';
        gallery_pic.src = "images/" + img;
        document.getElementById("caption1").innerText = caption;
    }

    function thumbnail_out() {
        this.className = 'thumbnail_images';
    }

    function setup_thumbnail(thumbnail_img, thumbnail_id, img_arr) {

        thumbnail_img.src = "images/" + thumbnail_id + ".jpg";
        thumbnail_img.onmouseover = thumbnail_over;
        thumbnail_img.onmousedown = function() {
            thumbnail_down(img_arr[0], img_arr[1]);
        };
        thumbnail_img.onmouseup = thumbnail_over;
        thumbnail_img.onmouseout = thumbnail_out;
    }

    for (var i = 0; i < arr.length; i++) {
        thumbnail_array[i] = document.getElementById("thumbnail_img" + (i + 1));
        setup_thumbnail(thumbnail_array[i], "thumbnail_img" + (i + 1), arr[i]);
    }
};

function next_picture() {
    if (img_num >= 5) {
        img_num = 0;
    }
    img_num++;
    gallery_pic.src = arr[img_num][0];
    document.getElementById("caption1").innerText = arr[img_num][1];


}

setInterval(function() {
    if (time >= circle_max_time) {
        time = 0;
        circle = 1.5;
        next_picture();
    }
    if (is_playing) {
        circle += circle_factor;
        time += circle_time;
    }
    context.lineWidth = 5;
    context.clearRect(0, 0, 55, 55);
    context.beginPath();

    context.arc(29, 24, 19, 1.5 * Math.PI, circle * Math.PI);

    context.stroke();

}
, circle_time);
