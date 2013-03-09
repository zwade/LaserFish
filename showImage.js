function showImage(uri,text) {
        var self = this
        fabric.Image.fromURL(uri,function(obj) {
		shape = obj
			

		shape.lockScalingX = shape.lockScalingY = true
		shape.hasBorders = shape.hasControls = false
		shape.isMovable = false
	
                shape.selectable = false

		shape.left = ((WIDTH*GRIDW+GRIDW*2)/2)
		shape.top = ((HEIGHT*GRIDH)/2)
		shape.setCoords()
		shape.parent = self
		self.fab = shape
        	self.loaded = true
		self.addToCanvas()
		if (text) {
			new showCapt(text)
		}
		
	})
}
showImage.prototype.addToCanvas = function() {
	if (this.loaded && !inCanvas(this.fab)) {
		can.add(this.fab)
	} else {
		throw new TypeError('Could not add to canvas')
	}
	return this.loaded
}

