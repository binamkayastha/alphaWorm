var app = angular.module('studio', ['ngMaterial']);

var WILL = {
	backgroundColor: Module.Color.TRANSPARENT,
	color: Module.Color.from(204, 204, 204),

	init: function(width, height) {
		this.initInkEngine(width, height);
		this.initEvents();
	},

	initInkEngine: function(width, height) {
		this.canvas = new Module.InkCanvas(document.getElementById("canvas"), width, height);
		this.strokesLayer = this.canvas.createLayer();

		this.clear();

		this.brush = new Module.DirectBrush();

		this.pathBuilder = new Module.SpeedPathBuilder();
		this.pathBuilder.setNormalizationConfig(182, 3547);
		this.pathBuilder.setPropertyConfig(Module.PropertyName.Width, 2.05, 34.53, 0.72, NaN, Module.PropertyFunction.Power, 1.19, false);

		this.smoothener = new Module.MultiChannelSmoothener(this.pathBuilder.stride);

		this.strokeRenderer = new Module.StrokeRenderer(this.canvas, this.strokesLayer);
		this.strokeRenderer.configure({brush: this.brush, color: this.color});
	},

	initEvents: function() {
		var self = this;
		$(Module.canvas).on("mousedown", function(e) {self.beginStroke(e);});
		$(Module.canvas).on("mousemove", function(e) {self.moveStroke(e);});
		$(document).on("mouseup", function(e) {self.endStroke(e);});

		Module.canvas.addEventListener("touchstart", function(e) {self.beginStroke(e);});
		Module.canvas.addEventListener("touchmove", function(e) {self.moveStroke(e);});
		document.addEventListener("touchend", function(e) {self.endStroke(e);});

		document.ontouchmove = function(е) {
			е.preventDefault();
		}
	},

	beginStroke: function(e) {
		if (["mousedown", "mouseup"].contains(e.type) && e.button != 0) return;

		this.inputPhase = Module.InputPhase.Begin;
		if (e.changedTouches) e = e.changedTouches[0];

		this.buildPath({x: e.clientX, y: (e.clientY - 50)});
		this.drawPath();
	},

	moveStroke: function(e) {
		if (!this.inputPhase) return;
		if (e.changedTouches) e = e.changedTouches[0];

		this.inputPhase = Module.InputPhase.Move;
		this.pointerPos = {x: e.clientX, y: (e.clientY - 50)};

		if (WILL.frameID != WILL.canvas.frameID) {
			var self = this;

			WILL.frameID = WILL.canvas.requestAnimationFrame(function() {
				if (self.inputPhase && self.inputPhase == Module.InputPhase.Move) {
					self.buildPath(self.pointerPos);
					self.drawPath();
				}
			}, true);
		}
	},

	endStroke: function(e) {
		if (!this.inputPhase) return;

		this.inputPhase = Module.InputPhase.End;
		if (e.changedTouches) e = e.changedTouches[0];

		this.buildPath({x: e.clientX, y: (e.clientY - 50)});
		this.drawPath();

		delete this.inputPhase;
	},

	buildPath: function(pos) {
		if (this.inputPhase == Module.InputPhase.Begin)
			this.smoothener.reset();

		var pathPart = this.pathBuilder.addPoint(this.inputPhase, pos, Date.now()/1000);
		var smoothedPathPart = this.smoothener.smooth(pathPart, this.inputPhase == Module.InputPhase.End);
		var pathContext = this.pathBuilder.addPathPart(smoothedPathPart);

		this.pathPart = pathContext.getPathPart();

		if (this.inputPhase == Module.InputPhase.Move) {
			var preliminaryPathPart = this.pathBuilder.createPreliminaryPath();
			var preliminarySmoothedPathPart = this.smoothener.smooth(preliminaryPathPart, true);

			this.preliminaryPathPart = this.pathBuilder.finishPreliminaryPath(preliminarySmoothedPathPart);
		}
	},

	drawPath: function() {
		if (this.inputPhase == Module.InputPhase.Begin) {
			this.strokeRenderer.draw(this.pathPart, false);
			this.strokeRenderer.blendUpdatedArea();
		}
		else if (this.inputPhase == Module.InputPhase.Move) {
			this.canvas.clear(this.strokeRenderer.updatedArea, this.backgroundColor);
			this.canvas.blend(this.strokesLayer, {rect: this.strokeRenderer.updatedArea});

			this.strokeRenderer.draw(this.pathPart, false);
			this.strokeRenderer.blendUpdatedArea();

			this.strokeRenderer.color = Module.Color.RED;
			this.strokeRenderer.drawPreliminary(this.preliminaryPathPart);
			this.strokeRenderer.color = this.color;
		}
		else if (this.inputPhase == Module.InputPhase.End) {
			this.strokeRenderer.draw(this.pathPart, true);

			this.strokeRenderer.blendStroke(this.strokesLayer);

			this.canvas.clear(this.strokeRenderer.strokeBounds, this.backgroundColor);
			this.canvas.blend(this.strokesLayer, {rect: this.strokeRenderer.strokeBounds});
		}
	},

	clear: function() {
		this.strokesLayer.clear(this.backgroundColor);
		this.canvas.clear(this.backgroundColor);
	},

  getPixels: function() {
		// var canvas = document.getElementById("canvas");
		// var gl = canvas.getContext("webgl");
		// var pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
		// gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

		return this.canvas.readPixels(0,0,100,100);
  }
};

var target = {
  init: function(width, height){
    this.canvas = document.getElementById("trace-target");
    this.canvas.width = width;
    this.canvas.height = height;

    var ctx = this.canvas.getContext("2d");
    ctx.font = "300px Arial";
    ctx.fillText("A",width/2,height/2);
  },

  getPixels: function() {
		console.log(this.canvas.width)
		console.log(this.canvas.height)
    return document.getElementById("trace-target").getContext("2d").getImageData(0,0,this.canvas.width, this.canvas.height).data;
  }
}

app.controller('studioController', function(){
  // TODO: figure out how to use Module
  //      issue was that canvas was not ready when addPostScript is called
  // Module.addPostScript(function() {
  //   WILL.init(1600, 600);
  // });
  var width = window.innerWidth;
  var height = window.innerHeight - 100;
	width = 100
	height = 100
  WILL.init(width, height);
  target.init(width, height);

	var getAlpha = function(pixels){
		// Alpha is the 4th value in RGBA
		var ALPHA = [];
		var sum = 0
		var sump=0
		for(var i = 0; i < pixels.length; i++) {
			sum += pixels[i]
			if((i+1)%4 == 0){
				// console.log(i)
				var p = pixels[i] > 0 ? 1 : 0
				ALPHA.push(p);
				sump += p;
			}
		}
		console.log("for length-- " + pixels.length + "sum is::::" + sum + " sump::" + sump)
		return ALPHA;
	}

  this.check = function(){
    console.log("checking")
    console.log(WILL.getPixels());
    console.log(target.getPixels());

		var traceALPHA = getAlpha(WILL.getPixels());
		var targetALPHA = getAlpha(target.getPixels());

		var test = 0
		var sum = 0
		var sump=0
		for(var i = 0; i < targetALPHA.length; i++) {
			sump+=targetALPHA[i]
		}
		console.log("------------------" + sump)
		console.log(traceALPHA.length + " ???? " + targetALPHA.length)

		console.log(traceALPHA)
		console.log(targetALPHA)

		var hit = 0;
		var totalTrace = 0;
		var totalTarget = 0;

		for(var i = 0; i < traceALPHA.length; i++){
			hit += ((targetALPHA[i] - traceALPHA[i]) == 0 && targetALPHA[i] == 1) ? 1 : 0;
			totalTrace += traceALPHA[i]
			totalTarget += targetALPHA[i]
		}

		totalTarget = sump;

		console.log("You had: " + hit + " hits out of " + totalTarget + " targets")
		console.log("You had: " + hit + " hits out of " + totalTrace + " everything you traced")
		console.log("accuracy target: " + hit/totalTarget)
		console.log("accuracy trace: " + hit/totalTrace)
		console.log("----")
  }
});

app.directive('studioView', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/studio/studioView.html',
    controller: 'studioController',
    controllerAs: 'vm'
  };
});
