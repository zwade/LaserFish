function oneway(x,y,dir,static) {
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
	this.corners = true
	this.loaded = false
	var canvas
	var self = this
        fabric.loadSVGFromURL('oneway.svg',function(obj, opt) {
                var shape = fabric.util.groupSVGElements(obj, opt)
		shape.id = genId()
		shape.lockScalingX = shape.lockScalingY = true
		shape.isMovable = static
                shape.selectable = static

		shape.hasBorders = shape.hasControls =  false
		shape.setLeft(GRIDW+GRIDW*x)
		shape.setTop(GRIDH+GRIDH*y)
		shape.setAngle(dir*90)
		shape.setCoords()
		shape.parent = self
		self.fab = shape
        	self.loaded = true
		self.addToCanvas()
		
                try {
                        handler.lockBank()
                } catch (e) {
                        console.log(e)
                }

	})
}
oneway.prototype.updateCoords = function() {
	if (this.isBanked) {
		this.nx = -1
		this.ny = 1
	} else {
		this.nx = (this.fab.getLeft()-GRIDW)/GRIDW
		this.ny = (this.fab.getTop()-GRIDH)/GRIDH
	}
}
oneway.prototype.changeAngle = function(a) {
	if (!a) {
		this.fab.setAngle(this.fab.getAngle()+45)
		while (this.fab.getAngle()>=360) {
			this.fab.setAngle(this.fab.getAngle()-360)
		}
		this.setDir(Math.round(this.fab.getAngle()/45)/2)
	} else {
		this.setDir(a)
		this.fab.setAngle(Math.round(a*90))
	}
}
oneway.prototype.calculateLaser = function(dir) {
	ret = [0,this.nx,this.ny]
	rdir = 0
	a = (this.getDir()-dir)
	while(a<0) {
		a+=4
	}
	if (a==0) {
		rdir=dir
	} 
	if (a==.5) {
		rdir=dir
	}
	if (a==1) {
		rdir=dir
	}
	if (a==1.5) {
		rdir=dir+1
	}
	if (a==2) {
		rdir=dir+2
	} 
	if (a==2.5) {
		rdir=dir+3
	} 
	if (a==3) {
		rdir=dir
	} 
	if (a==3.5) {
		rdir=dir
	} 
	while (rdir>=4) {
		rdir-=4
	}
	ret[0] = rdir
	return ret
}
oneway.prototype.preMove = function() {
	this.ox = this.nx
	this.oy = this.ny
}
oneway.prototype.getFabric = function() {
        return this.fab
}
oneway.prototype.getDir = function() {
	return this.dir
}
oneway.prototype.setDir = function(dir) {
	this.dir = dir
	this.fab.setAngle(dir*90)
	can.renderAll()
}
oneway.prototype.addToCanvas = function() {
	if (this.loaded && !inCanvas(this.fab)) {
		can.add(this.fab)
	} else {
		throw new TypeError('Could not add to canvas')
	}
	return this.loaded
}


