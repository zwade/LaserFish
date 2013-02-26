function canvasGrid(canvas,width,height) {
	this.canvas = canvas
	this.w = width
	this.h = height
	this.objects = []
	this.banked = {}
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
		this.objects[nx][ny] = this.banked[oy]
		this.banked[oy] = null		
		return
	}
	this.objects[nx][ny] = this.objects[ox][oy]
	this.objects[ox][oy] = null
}
	
