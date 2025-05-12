let facemesh;
let video;
let predictions = [];

const lipsPoints = [
  409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,
  314,405,321,375,291,76,77,90,180,85,16,315,404,320,
  307,306,408,304,303,302,11,72,73,74,184
];
const leftEyePoints = [
  243,190,56,28,27,29,30,247,130,25,110,24,23,22,26,112,
  133,173,157,158,159,160,161,246,33,7,163,144,145,153,154,155
];
const rightEyePoints = [
  359,467,260,259,257,258,286,414,463,341,256,252,253,254,339,255,
  263,466,388,387,386,385,384,398,362,382,381,380,374,373,390,249
];

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO, () => {
    console.log("Camera ready");
  });
  video.size(width, height);
  video.hide();

  try {
    facemesh = ml5.faceMesh(video, modelReady);
    facemesh.on("predict", results => {
      predictions = results;
    });
  } catch (error) {
    console.error("Error initializing FaceMesh:", error);
  }
}

function modelReady() {
  console.log("FaceMesh model loaded");
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    console.log(predictions); // 檢查 predictions 的內容
    const keypoints = predictions[0].scaledMesh;
    console.log(keypoints); // 檢查 keypoints 的內容

    stroke(255, 0, 0);
    strokeWeight(5);
    noFill();

    drawPath(lipsPoints, keypoints);
    drawPath(leftEyePoints, keypoints);
    drawPath(rightEyePoints, keypoints);
  } else {
    console.log("No predictions available");
  }
}

function drawPath(points, keypoints) {
  beginShape();
  for (let i = 0; i < points.length; i++) {
    const index = points[i];
    if (keypoints[index]) {
      const [x, y] = keypoints[index];
      console.log(`Drawing point at (${x}, ${y})`); // 檢查繪製的點
      vertex(x, y);
    } else {
      console.log(`Keypoint at index ${index} is undefined`);
    }
  }
  endShape();
}
