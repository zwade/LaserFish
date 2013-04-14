function showCapt(text) {
        var self = this
	shape = new fabric.Text(text, {fontFamily:'arial', fontSize:30,textShadow:' rgba(240,240,240,.4) 3px 3px 3px'})
	shape.setTop(shape.height/2+40)
	shape.setLeft(shape.width/2+80)		

	shape.lockScalingX = shape.lockScalingY = true
	shape.hasBorders = shape.hasControls = false
	shape.isMovable = false
	
        shape.selectable = false

	shape.setCoords()
	shape.parent = self
	self.fab = shape
        self.loaded = true
	self.addToCanvas()
		

}
showCapt.prototype.addToCanvas = function() {
	if (this.loaded && !inCanvas(this.fab)) {
		can.add(this.fab)
	} else {
		throw new TypeError('Could not add to canvas')
	}
	return this.loaded
}

