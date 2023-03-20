objects = [];

function setup()
{
canvas = createCanvas(480, 380);
canvas.center();
video = createCapture(VIDEO);
video.hide(); 
}
function draw(){
    image(video, 0, 0, 480, 380);
    if(status !="")
    {
        for(i=0 ; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Detecting Objects";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects";

            fill("#FF0000");
            nofill();
            stroke("#FF0000");
            percent = floor(objects[i].confidence * 100);
            rect(object[i].x , object[i].y , object[i].width , object[i].height);
            text(object[i].label + "" + percent + "%",objects[i].x + 15, objects[i].y + 15);
            if(objects[i].label == input_text)
            {
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("object_found").innerHTML = input_text + "Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text + "found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = input_text + " Not Found";
            }

        }
    }
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}
{

}

function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video,volume(0);
}
