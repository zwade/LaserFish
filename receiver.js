function receiver(x,y,dir,static,color) {
	static = static | false
        this.loaded = null
	this.needs = color
	x = x||0
	y = y||0
	dir = dir||1
	this.nx = x
	this.ny = y
	this.ox = x
	this.oy = y
	this.dir = dir
	this.loaded = false
	var canvas
        var self = this
        fabric.loadSVGFromURL('receiver.svg',function(obj, opt) {
                shape = fabric.util.groupSVGElements(obj, opt)
		shape.id = genId()
		shape.lockScalingX = shape.lockScalingY = true
		shape.hasBorders = shape.hasControls = false
		shape.isMovable = static
                shape.selectable = static

		shape.setLeft(GRIDW+GRIDW*x)
		shape.setTop(GRIDH+GRIDH*y)
		shape.setAngle(dir*90)
		shape.setCoords()
		shape.parent = self
		self.fab = shape
        	self.loaded = true
		self.addToCanvas()
		
	})
}
receiver.prototype.updateCoords = function() {
	if (this.isBanked) {
		this.nx = -1
		this.ny = 1
	} else {
		this.nx = (this.fab.getLeft()-GRIDW)/GRIDW
		this.ny = (this.fab.getTop()-GRIDH)/GRIDH
	}
}
receiver.prototype.changeAngle = function(a) {
	if (!a) {
		this.fab.setAngle(this.fab.getAngle()+90)
		while (this.fab.getAngle()>360) {
			this.fab.setAngle(this.fab.getAngle()-360)
		}
		this.setDir(Math.round(this.fab.getAngle()/90))
	} else {
		this.setDir(a)
		this.fab.setAngle(Math.round(a*90))
	}
}
receiver.prototype.calculateLaser = function(dir,color) {
	a = this.dir-dir
	while (a<0) {a+=4}
	if (arguments[1] && color==this.needs && a==2) {
		console.log('Game Won')
	}
	return
}
receiver.prototype.preMove = function() {
	this.ox = this.nx
	this.oy = this.ny
}
receiver.prototype.getFabric = function() {
        return this.fab
}
receiver.prototype.getDir = function() {
	return this.dir
}
receiver.prototype.setDir = function(dir) {
	this.dir = dir
	this.fab.setAngle(dir*90)
	can.renderAll()
}
receiver.prototype.addToCanvas = function() {
	if (this.loaded && !inCanvas(this.fab)) {
		can.add(this.fab)
	} else {
		throw new TypeError('Could not add to canvas')
	}
	return this.loaded
}


