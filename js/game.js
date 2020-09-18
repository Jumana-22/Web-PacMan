document.addEventListener("DOMContentLoaded", () => {

	const grid = document.querySelector(".grid");
	let squares = Array.from(grid.querySelectorAll("div"));
	const scoreDisplay = document.querySelector(".score");
	const livesDisplay = document.querySelector(".lives span");
	const pauseDisplay = document.querySelector(".pause");

	const walls = [55,56,58,59,60,61,63,64,65,66,67,69,70,,72,73,74,75,76,78,79,80,81,83,
	84,86,87,88,89,91,92,93,94,95,97,98,100,101,102,103,104,106,107,108,109,111,
	112,114,115,116,117,119,120,121,122,123,125,126,128,129,130,131,132,134,135,136,137,139,
	140,167,
	168,170,171,172,173,175,176,178,179,180,181,182,183,184,185,187,188,190,191,192,193,195,
	196,198,199,200,201,203,204,206,207,208,209,210,211,212,213,215,216,218,219,220,221,223,
	224,231,232,237,238,243,244,251,
	252,253,254,255,256,257,259,260,261,262,263,265,266,268,269,270,271,272,274,275,276,277,278,279,
	280,281,282,283,284,285,287,288,289,290,291,293,294,296,297,298,299,300,302,303,304,305,306,307,
	308,309,310,311,312,313,315,316,327,328,330,331,332,333,334,335,
	336,337,338,339,340,341,343,344,346,347,348,349,350,351,352,353,355,356,358,359,360,361,362,363,
	364,365,366,367,368,369,371,372,374,375,376,377,378,379,380,381,383,384,386,387,388,389,390,391,
	402,403,404,405,406,407,408,409,
	420,421,422,423,424,425,427,428,430,431,432,433,434,435,436,437,439,440,442,443,444,445,446,447,
	448,449,450,451,452,453,455,456,458,459,460,461,462,463,464,465,467,468,470,471,472,473,474,475,
	476,477,478,479,480,481,483,484,495,496,498,499,500,501,502,503,
	504,505,506,507,508,509,511,512,514,515,516,517,518,519,520,521,523,524,526,527,528,529,530,531,
	532,533,534,535,536,537,539,540,542,543,544,545,546,547,548,549,551,552,554,555,556,557,558,559,
	560,573,574,587,
	588,590,591,592,593,595,596,597,598,599,601,602,604,605,606,607,608,610,611,612,613,615,
	616,618,619,620,621,623,624,625,626,627,629,630,632,633,634,635,636,638,639,640,641,643,
	644,648,649,666,667,671,
	672,673,674,676,677,679,680,682,683,684,685,686,687,688,689,691,692,694,695,697,698,699,
	700,701,702,704,705,707,708,710,711,712,713,714,715,716,717,719,720,722,723,725,726,727,
	728,735,736,741,742,747,748,755,
	756,758,759,760,761,762,763,764,765,766,767,769,770,772,773,774,775,776,777,778,779,780,781,783,
	784,786,787,788,789,790,791,792,793,794,795,797,798,800,801,802,803,804,805,806,807,808,809,811,
	812,839,
	840,841,842,843,844,845,846,847,848,849,850,851,852,853,854,855,856,857,858,859,860,861,862,863,864,865,866,867
	];

	const foodS = 
	[29,30,31,32,33,34,35,36,37,38,39,40,43,44,45,46,47,48,49,50,51,52,53,54,
	57,62,68,71,77,82,
	90,96,99,105,
	113,118,124,127,133,138,
	141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,
	169,174,177,186,189,194,
	197,202,205,214,217,222,
	225,226,227,228,229,230,233,234,235,236,239,240,241,242,245,246,247,248,249,250,
	258,264,267,273,
	286,292,295,301,
	314,317,318,319,320,321,322,323,324,325,326,329,
	342,345,354,357,
	370,373,382,385,
	392,393,394,395,396,397,398,399,400,401,410,411,412,413,414,415,416,417,418,419,
	426,429,438,441,
	454,457,466,469,
	482,485,486,487,488,489,490,491,492,493,494,497,
	510,513,522,525,
	538,541,550,553,
	561,562,563,564,565,566,567,568,569,570,571,572,575,576,577,578,579,580,581,582,583,584,585,586,
	589,594,600,603,609,614,
	617,622,628,631,637,642,
	646,647,650,651,652,653,654,655,656,657,658,659,660,661,662,663,664,665,668,669,
	675,678,681,690,693,696,
	703,706,709,718,721,724,
	729,730,731,732,733,734,737,738,739,740,743,744,745,746,749,750,751,752,753,754,
	757,768,771,782,
	785,796,799,810,
	813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830,831,832,832,833,834,835,836,837,838
	];

	const foodB = [85,110,645,670];

	//set up level 
	for(let i = 0; i < squares.length; i++)
	{
		if(walls.includes(i))
		{
			squares[i].classList.add("wall");
		}
		if(foodB.includes(i))
		{
			squares[i].classList.add("foodB");
		}
		if(foodS.includes(i))
		{
			squares[i].classList.add("foodS");
		}
	}


	// game characters as classes 
	class pacman {
		constructor (x, y, i)
		{
			this.x = x; 
			this.y = y; 
			this.index = i; 
		}

		move() {
			squares[this.index].classList.remove("pacman");
			if(this.index == 419 && this.x == 1)
			{
				this.index = 392; 
			} else if(this.index == 392 && this.x == -1){
				this.index = 419; 
			} else {
				if(!(squares[this.index + this.x + this.y].classList.contains("wall")))
				{
					this.index = this.index + this.x + this.y; 
				}
			}
		}
	}

	class ghost {
		constructor (x, y, i, c)
		{
			this.x = x; 
			this.y = y; 
			this.index = i; 
			this.color = c; 
			this.target = 0; 
			this.mode = "chase"; 
		}

		move() {
			squares[this.index].classList.remove("ghost");
			this.callAI();
			if(this.index == 419 && this.x == 1)
			{
				this.index = 392; 
			} else if(this.index == 392 && this.x == -1){
				this.index = 419; 
			} else {
				if(!(squares[this.index + this.x + this.y].classList.contains("wall")))
				{
					this.index = this.index + this.x + this.y; 
				}
			}
		}

		callAI() {
			if(this.color === "red"){
				this.blinkyAI();
			} else if(this.color === "blue") {
				this.inkyAI();
			} else if(this.color === "pink") {
				this.pinkyAI();
			} else {
				this.clydeAI();
			}
			this.shortestPath();
		}

		blinkyAI() {
			if(this.mode == "chase")
			{
				this.target = pac.index; 
			}
			else if(this.target == "scatter")
			{
				this.target = 27;
			}
		}

		inkyAI() {
			if(this.mode == "chase")
			{
				let subTarget = 0; 
				if(pac.y < 0)
				{
					subTarget = pac.index - 4 + pac.y*4; 
				}
				else
				{
					subTarget = pac.index + pac.x*4 + pac.y*4; 	
				}

				let r = (subTarget - ghosts[0].index)%width;
				let t = Math.floor((subTarget - ghosts[0].index)/width); 
				this.target = subTarget - r - t;  

			}
			else if(this.target == "scatter")
			{
				this.target = 867;
			}
		}

		pinkyAI() {
			if(this.mode == "chase")
			{
				if(pac.y < 0)
				{
					this.target = pac.index - 4 + pac.y*4; 
				}
				else
				{
					this.target = pac.index + pac.x*4 + pac.y*4; 	
				}
			}
			else if(this.target == "scatter")
			{
				this.target = 0;
			}
		}

		clydeAI() {
			if(this.mode == "chase")
			{
				let r = (this.index - pac.index)%width;
				let t = Math.floor((this.index-pac.index)/width); 
				let dis = Math.sqrt(Math.pow(r,2) + Math.pow(t,2)); 
				if(dis > 8)
				{
					this.target = pac.index; 
				}
				else
				{
					this.target = 840; 
				}
			}
			else if(this.target == "scatter")
			{
				this.target = 840;
			} 
		}

		calDistance(i){
			let r = (this.target - i)%width;
			let t = Math.floor((this.target-i)/width); 
			let dis = Math.sqrt(Math.pow(r,2) + Math.pow(t,2)); 
			return dis; 
		}

		possibleDirs(){
			if(this.x == 1){
				return [[1,0],[0,width],[0,-width]]; 
			} else if(this.x == -1) {
				return [[-1,0],[0,width],[0,-width]]; 
			} else if(this.y == width) {
				return [[1,0],[-1,0],[0,width]]; 
			} else if(this.y == -width) {
				return [[1,0],[-1,0],[0,-width]];
			}
		}

		shortestPath(){
			let posDir = this.possibleDirs();
			let best  = posDir[0];
			posDir.forEach(dir => {
				let g = this.calDistance(this.index+best[0]+best[1]); 
				let h = this.calDistance(this.index+dir[0]+dir[1]); 
				if((squares[this.index+best[0]+best[1]].classList.contains("wall"))) {
					best = dir; 
				}
				else if(h < g && !(squares[this.index+dir[0]+dir[1]].classList.contains("wall"))) {
					best = dir;
				}
			})
			this.x = best[0]; 
			this.y = best[1];
		}
	}

	const pac = new pacman(-1,0,490); 
	const ghosts = [new ghost(-1,0,322,"red"), new ghost(-1,0,322,"blue"), new ghost(-1,0,322,"pink"), new ghost(-1,0,322,"orange")]; 
	//set the character on the grid 
	squares[pac.index].classList.add("pacman");
	ghosts.forEach(j => {
		squares[j.index].classList.add("ghost");
	})

	function collide()
	{
		if(squares[pac.index].classList.contains("ghost"))
		{
			lives = lives - 1; 

			ghosts.forEach(j => {
				if(j.index >= 485 && j.index <= 494)
				{
					squares[j.index].classList.remove("ghost")
					j.index = 322; 
					j.x = -1; 
					j.y = 0; 
				}
			})

			//reset pacman position 
			squares[pac.index].classList.remove("pacman")
			pac.index = 490; 
			pac.x = -1; 
			pac.y = 0; 
		}
		return lives; 
	}

	function eatCheck()
	{
		if(squares[pac.index].classList.contains("foodS"))
		{
			squares[pac.index].classList.remove("foodS")
			score = score + 10; 
		} else if(squares[pac.index].classList.contains("foodB")){
			squares[pac.index].classList.remove("foodB")
			score = score + 50; 
		}
		return score; 
	}

	function validM(i, x, y)
	{
		if(squares[i+x+y].classList.contains("wall"))
		{
			return false; 
		}
		return true; 
	}

	function changeMode()
	{
		ghosts.forEach(j => {
			if(j.mode == "scatter")
			{
				j.mode = "chase"; 
			}
			else if(j.mode == "chase")
			{
				j.mode = "scatter";
			}
		})
	}

	function controls(e)
	{
		if(e.keyCode === 39) { // if we press the right key 
			if(validM(pac.index, 1, 0))
			{
				pac.x = 1; 
				pac.y = 0; 
			}
		} else if (e.keyCode === 38) { //if we press the up key 
			if(validM(pac.index, 0, -width))
			{
				pac.x = 0; 
				pac.y = -width; 
			}
		} else if(e.keyCode === 37) { // if we press the left key 
			if(validM(pac.index, -1, 0))
			{
				pac.x = -1; 
				pac.y = 0; 
			}
		} else if (e.keyCode === 40) { // if we press down key 
			if(validM(pac.index, 0, width))
			{
				pac.x = 0; 
				pac.y = width; 
			}
		} else if(e.keyCode === 80) {
			if(paused == false){
				paused = true; 
				pauseDisplay.innerHTML = "Pause";
				clearInterval(modeChangeLoop);
				clearInterval(gameLoop);
			} else {
				paused = false; 
				pauseDisplay.innerHTML = "";
				gameLoop = setInterval(game,frameR);
				modeChangeLoop = setInterval(changeMode, modeTime);
			}
		}
	}

	const frameR = 250; 
	const modeTime = 20000; 
	let lives = 3; 
	let score = 0; 
	const width = 28; 
	let paused = false; 
	
	// console.log(squares);
	function game()
	{	
		//move the characters 
		pac.move(); 
		//check for collision between pacman and ghosts 
		lives = collide(); 
		ghosts.forEach(j => {
			j.move();
		})

		//set the character on the grid 
		squares[pac.index].classList.add("pacman");
		ghosts.forEach(j => {
			squares[j.index].classList.add("ghost");
		})

		//check for eating 
		score = eatCheck();

		//check for collision between pacman and ghosts 
		lives = collide(); 

		scoreDisplay.innerHTML = score; 
		livesDisplay.innerHTML = lives; 

		//if the game ends 
		if(lives <= 0)
		{
			clearInterval(gameLoop);
			clearInterval(modeChangeLoop);
			window.location.replace("end.html");
		}
	}

	let gameLoop = setInterval(game,frameR);
	let modeChangeLoop = setInterval(changeMode,modeTime);
	document.addEventListener("keydown", controls);

})