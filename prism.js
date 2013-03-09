function prism(x,y,dir,static) {
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
	this.corners = false
	this.loaded = false
	var canvas
	var self = this
        fabric.loadSVGFromURL('prism.svg',function(obj, opt) {
                var shape = fabric.util.groupSVGElements(obj, opt)
		shape.id = genId()
                shape.scaleX = GRIDW/40
                shape.scaleY = GRIDH/40
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
prism.prototype.updateCoords = function() {
	if (this.isBanked) {
		this.nx = -1
		this.ny = 1
	} else {
		this.nx = (this.fab.getLeft()-GRIDW)/GRIDW
		this.ny = (this.fab.getTop()-GRIDH)/GRIDH
	}
}
prism.prototype.changeAngle = function(a) {
	if (!a) {
		this.fab.setAngle(this.fab.getAngle()+90)
		while (this.fab.getAngle()>=360) {
			this.fab.setAngle(this.fab.getAngle()-360)
		}
		this.setDir(Math.round(this.fab.getAngle()/90))
	} else {
		this.setDir(a)
		this.fab.setAngle(Math.round(a*90))
	}
}
prism.prototype.calculateLaser = function(dir,color) {
	ret = ['prism',[this.nx,this.ny,0],[this.nx,this.ny,1],[this.nx,this.ny,2]]
	a = (this.getDir()-dir)
	while(a<0) {
		a+=4
	}
	if (a!=2 || ['white','#fff','#FFF','#ffffff','#FFFFFF','rgb(255,255,255)','RGB(255,255,255)'].indexOf(color)==-1 ) {
		return
	}
	dir1 = this.dir+1
	dir2 = this.dir+2
	dir3 = this.dir+3
	while (dir1>=4) {dir1-=4} 
	while (dir2>=4) {dir2-=4} 
	while (dir3>=4) {dir3-=4} 
	ret[1][2] = dir1
	ret[1][3] = 'red'
	ret[2][2] = dir2
	ret[2][3] = 'blue'
	ret[3][2] = dir3
	ret[3][3] = 'green'	
	return ret
}
prism.prototype.preMove = function() {
	this.ox = this.nx
	this.oy = this.ny
}
prism.prototype.getFabric = function() {
        return this.fab
}
prism.prototype.getDir = function() {
	return this.dir
}
prism.prototype.setDir = function(dir) {
	this.dir = dir
	this.fab.setAngle(dir*90)
	can.renderAll()
}
prism.prototype.addToCanvas = function() {
	if (this.loaded && !inCanvas(this.fab)) {
		can.add(this.fab)
	} else {
		throw new TypeError('Could not add to canvas')
	}
	return this.loaded
}


