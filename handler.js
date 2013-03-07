function canvasGrid(canvas,width,height) {
	this.canvas = canvas
	this.w = width
	this.h = height
	this.objects = []
	this.banked = []
	for ( i = 0; i < this.w; i++) {
		this.objects[i] = []
		for ( a = 0; a < this.h; a++ ) {
			this.objects[i][a] = null
		}
	}
}

canvasGrid.prototype.setObject = function(x,y,obj) {
	this.objects[x][y] = obj
}
canvasGrid.prototype.bankObject = function() {
	if (arguments.length==1) {
		obj = arguments[0]
		this.banked.push(obj)
		this.banked[this.banked.indexOf(obj)].ny = this.banked.indexOf(obj)
		this.banked[this.banked.indexOf(obj)].nx = -1
	} else if (arguments.length==2) {
		var x = arguments[0]
		var y = arguments[1]
		this.banked.push(this.objects[x][y])
		var obj = this.objects[x][y]
		this.banked[this.banked.indexOf(obj)].ny = this.banked.indexOf(obj)
		this.banked[this.banked.indexOf(obj)].nx = -1
		this.objects[x][y] = null
	}
}
canvasGrid.prototype.lockBank = function() {
	for (i in this.banked) {
		this.banked[i]
	}
}
canvasGrid.prototype.unBankObject = function(obj, nx, ny) {
	this.objects[nx][ny] = this.banked.splice(this.banked.indexOf(obj),1)
}
canvasGrid.prototype.getBankedObject = function(obj) {
	return this.banked[this.banked.indexOf(obj)]
}
canvasGrid.prototype.removeBankedObject = function(obj) {
	return this.banked.splice(this.banked.indexOf(obj),1)
}
canvasGrid.prototype.getObject = function(x,y) {
	if (x==-1) {
		return this.banked[y]
	}
	return this.objects[x][y]
}

canvasGrid.prototype.removeObject = function(x,y) {
	if (x==-1) {
		this.banked[y] = null
		return
	} 
	this.objects[x][y] = null
}
canvasGrid.prototype.moveObject = function(ox,oy,nx,ny) {
	if (ox==nx && oy==ny) {
		return
	}

	if (nx==-1) {
		this.banked[ny] = this.objects[ox][oy]
		this.objects[ox][oy] = null
		return
	}
	if (ox==-1) {
		this.objects[nx][ny] = this.banked.splice(oy,1)[0]
		return
	}
	this.objects[nx][ny] = this.objects[ox][oy]
	this.objects[ox][oy] = null
}
	
