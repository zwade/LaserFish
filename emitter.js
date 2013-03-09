function emitter(x,y,dir,static) {
        this.loaded = null
        static = static | false
	x = x||0
	y = y||0
	dir = dir||0
	this.nx = x
	this.ny = y
	this.ox = x
	this.oy = y
	this.dir = dir
	this.loaded = false
	var canvas
        var self = this
        fabric.loadSVGFromURL('emitter.svg',function(obj, opt) {
                shape = fabric.util.groupSVGElements(obj, opt)
		shape.id = genId()
                shape.scaleX = GRIDW/40
                shape.scaleY = GRIDH/40
		shape.lockScalingX = shape.lockScalingY = true
		shape.hasBorders = shape.hasControls = false
		shape.isMovable = static
		shape.setLeft(GRIDW+GRIDW*x)
                shape.selectable = static

		shape.setTop(GRIDH+GRIDH*y)
		shape.setAngle(dir*90)
		shape.setCoords()
		shape.parent = self
		self.fab = shape
        	self.loaded = true
		self.addToCanvas()
		
	})
}
emitter.prototype.updateCoords = function() {
	if (this.isBanked) {
		this.nx = -1
		this.ny = 1
	} else {
		this.nx = (this.fab.getLeft()-GRIDW)/GRIDW
		this.ny = (this.fab.getTop()-GRIDH)/GRIDH
	}
}
emitter.prototype.changeAngle = function(a) {
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
emitter.prototype.calculateLaser = function() {
	return
}
emitter.prototype.preMove = function() {
	this.ox = this.nx
	this.oy = this.ny
}
emitter.prototype.getFabric = function() {
        return this.fab
}
emitter.prototype.getDir = function() {
	return this.dir
}
emitter.prototype.setDir = function(dir) {
	this.dir = dir
	this.fab.setAngle(dir*90)
	can.renderAll()
}
emitter.prototype.addToCanvas = function() {
	if (this.loaded && !inCanvas(this.fab)) {
		can.add(this.fab)
	} else {
		throw new TypeError('Could not add to canvas')
	}
	return this.loaded
}


