levelSet = [
{
	isImage:true,
	name:"Image1",
	uri:"slide1.png",
	text:"Click Anywhere To Start"
},
{
	isImage:true,
	name:"Image2",
	uri:"slide2.png",
	text:"The Light Sea was a peaceful and happy place"
},
{
	isImage:true,
	name:"Image1",
	uri:"slide1.png",
	text:"One day a Kraken attacked and terrorized all the fish. \n\
But one fish stood up to the Kraken, Anglerfish"
},
{
	isImage:true,
	name:"Image3",
	uri:"slide3.png",
	text:"The Kraken was hurt by the laser produced from Anglerfish's bulb!\n\But, it became clear that he could not defeat the Kraken alone."
},
{
	isImage:true,
	name:"Image3",
	uri:"slide3.png",
	text:"Luckily, he made friends with a shiny fish that had just come out of \n\hiding from behind a large rock."
},
{
	isImage:true,
	name:"Inst1",
	uri:"inst1.jpg",
	text:"Tutorial - Aim the laser at the Kraken's eye by dragging over the two fish, \n\and clicking on them to rotate them."
},


{
	name:"Tutorial1",
	active:[mirror,mirror],
	emit:{
			x:2,
			y:5,
			dir:0
	},	
	static:[{
			x:6,
			y:5,
			dir:0,
			type:wall
		},
		{
			x:5,
			y:7,
			dir:1.5,
			type:mirror
		},
		{
			x:7,
			y:7,
			dir:2.5,
			type:mirror
		},
	],
	receive:[
		{
			x:10,
			y:5,
			dir:2,
			color:"white"
		},
	]
},
{
	isImage:true,
	name:"Inst2",
	uri:"inst2.jpg",
	text:" This is the one-way mirror fish. The laser will go through the textured side, \n\
but reflect off of the smooth one. Move the normal mirror in position \n\
to hit the Kraken."
},
{
	name:"Tutorial1",
	active:[mirror],
	emit:{
			x:2,
			y:5,
			dir:0
	},	
	static:[{
			x:5,
			y:5,
			dir:3.5,
			type:oneway
		},
	],
	receive:[
		{
			x:5,
			y:3,
			dir:1,
			color:"white"
		},
	]
},
{
	isImage:true,
	name:"Slide4",
	uri:"slide4.png",
	text:"The Kraken grabbed a glassy looking fish and was about to eat her!\n\
             Anglerfish had to do something quickly! He fired his laser \n\
                         at the Kraken,but missed and hit her instead..."
},
{
	isImage:true,
	name:"Slide5",
	uri:"slide5.png",
	text:"And light of every color spewed out in all directions, stunning the Kraken."
},
{
	isImage:true,
	name:"Inst3",
	uri:"inst3.jpg",
	text:"This is the prism fish. When hit from the front with white light, \nred, green, and blue light shoot out from all sides. \nThe color of the light corresponds to the color of the eye."
},
{
	name:"Tutorial3",
	active:[prism],
	emit:{
			x:2,
			y:5,
			dir:0
	},	
	static:[],
	receive:[
		{
			x:11,
			y:5,
			dir:2,
			color:"blue"
		},
		{
			x:9,
			y:7,
			dir:3,
			color:"green"
		}
	]
},
{
	isImage:true,
	name:"Inter1",
	uri:"blank.jpg",
	text:"Congratulations on completing the Tutorial.\nClick anywhere to start the game"
},
{
	isImage:true,
	name:"Inter1",
	uri:"blank.jpg",
	text:"Level 1\n\nClick anywhere to start"
},
{
	name:"Level1",
	active:[prism,mirror,mirror],
	emit:{
			x:2,
			y:8,
			dir:0
	},	
	static:[
		{
			x:6,
			y:8,
			dir:.5,
			type:mirror,
		},
		{
			x:6,
			y:2,
			dir:1.5,
			type:mirror,
		}


	],
	receive:[
		{
			x:2,
			y:6,
			dir:0,
			color:"red"
		},
		{
			x:2,
			y:4,
			dir:0,
			color:"green"
		},
		{
			x:2,
			y:2,
			dir:0,
			color:"blue"
		}
	]
},
{
	isImage:true,
	name:"Inter2",
	uri:"blank.jpg",
	text:"Level 2\n\nClick anywhere to start\n\nN.B. - Dark Colored fish can only be turned 90 degrees"
},
{
	name:"Level2",
	active:[odiag,diag],
	emit:{
			x:1,
			y:5,
			dir:0
	},	
	static:[
		{
			x:8,
			y:5,
			dir:.5,
			type:mirror,
		},
		{
			x:4,
			y:5,
			dir:.5,
			type:oneway,
		},
		{
			x:6,
			y:3,
			dir:.5,
			type:mirror,
		}


	],
	receive:[
		{
			x:4,
			y:8,
			dir:3,
			color:"white"
		},
	]
},
{
	isImage:true,
	name:"Inter3",
	uri:"blank.jpg",
	text:"Level 3\n\nClick anywhere to start"
},
{
	name:"Level3",
	active:[mirror,mirror,mirror,mirror,prism],
	emit:{
			x:3,
			y:7,
			dir:0
	},	
	static:[
		{
			x:4,
			y:3,
			dir:0,
			type:wall,
		},
		{
			x:4,
			y:2,
			dir:1.5,
			type:mirror,
		}
		

	],
	receive:[
		{
			x:4,
			y:9,
			dir:3,
			color:"green"
		},
		{
			x:10,
			y:4,
			dir:2,
			color:"blue"
		},
		{
			x:4,
			y:1,
			dir:1,
			color:"red"
		},
	]
},


{
	isImage:true,
	name:"Inter4",
	uri:"blank.jpg",
	text:"Level 4\n\nClick anywhere to start\n\nN.B. The small black and white circles you see on this next\nlevel are called \"Nubs\". Your laser must\npass through all of them to repel the Kracken"
},

{
	name:"Level4",
	active:[mirror,mirror,oneway,oneway],
	emit:{
			x:15,
			y:3,
			dir:2
	},	
	static:[

	],
	receive:[
		{
			x:2,
			y:6,
			dir:0,
			color:"white"
		},
		{
			isNub:true,
			x:3,
			y:3,
			dir:0,
			color:"white"
		},
		{
			isNub:true,
			x:10,
			y:8,
			dir:0,
			color:"white"
		}
	]
},

{
	isImage:true,
	name:"Inter5",
	uri:"blank.jpg",
	text:"Level 5\n\nClick anywhere to start\n\n\This is the final stage, where everything comes together. Good luck"
},

{
	name:"Level5",
	active:[mirror,mirror,mirror,mirror,mirror,mirror,mirror,mirror],
	emit:{
			x:10,
			y:5,
			dir:2
	},	
	static:[
		{
			x:6,
			y:4,
			dir:0,
			type:prism,
		},

	],
	receive:[
		{
			x:4,
			y:3,
			dir:0,
			color:"green"
		},
		{
			x:5,
			y:7,
			dir:0,
			color:"blue"
		},
		{
			isNub:true,
			x:7,
			y:6,
			dir:0,
			color:"white"
		},
		{
			isNub:true,
			x:6,
			y:2,
			dir:0,
			color:"white"
		},
		{
			x:8,
			y:5,
			dir:2,
			color:"red"
		},
	]
},

{
	isImage:true,
	name:"finally",
	uri:"fin.png",
	text:"The Kraken had not expected such resistance when he came to the Light Sea. \nHaving been defeated by its inhabitants, he had no other choice but to leave."
}

]	

