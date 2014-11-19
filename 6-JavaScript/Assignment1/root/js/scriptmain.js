$(document).ready(function(){
  
	alert("Hello");
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.translate(300,300)
	ctx.beginPath();	
	ctx.moveTo(0,-300);
	ctx.lineTo(0,300);
	ctx.stroke();
	ctx.moveTo(-300,0);
	ctx.lineTo(300,0);
	ctx.stroke();


	function Line (equation,steps,inbound,outbound){
		this.equation = equation;
		this.steps = steps;
		this.inbound = inbound;
		this.outbound = outbound;
	}

	Line.prototype.draw =function () {
					
		var step_value = Math.floor((this.outbound - this.inbound)/this.steps);
		var parts = this.equation.match(/^y=([-|+]?\d+)x([+|-]\d+)$/);
		delete(parts[0]);
		var m = parseInt(parts[1]);
		var c = parseInt(parts[2]);
		var i;
		var x;
		for(i=this.inbound;i<this.outbound;i=i+step_value){
			if((i+step_value)<=this.outbound)
			this.drawLine.call(this,i,step_value,m,c);
		}
		

		if((i-step_value) <this.outbound){
			this.drawLine.call(this,(i-step_value),(this.outbound-(i-step_value)),m,c);
		}
			
	}

	Line.prototype.drawLine = function(x,step_value,m,c){
		
		var y = m*x+c;
		
		this.point.call(this,x,y);		
		ctx.beginPath();
		ctx.moveTo(x,-y);
		x = x + step_value;
		y = m*x+c;
		ctx.lineTo(x,-y);
		this.point.call(this,x,y);
		ctx.stroke();
	}

	Line.prototype.point = function (x,y){		
		var text = x + "," +y;	
		ctx.fillText(text,x,-y);
	}
	




	//("y=-1x-100",10,-113,200);

	$('[name="reset"]').click(function(){
		
		c.width = c.width;
		c.height = c.height;
		ctx.translate(300,300)
		ctx.beginPath();	
		ctx.moveTo(0,-300);
		ctx.lineTo(0,300);
		ctx.stroke();
		ctx.moveTo(-300,0);
		ctx.lineTo(300,0);
		ctx.stroke();
		var text_box_id;
		var i ;
		for(i =1 ; i <= 4 ; i++){
			text_box_id = "#no"+i;
			$(text_box_id).val('');
		}	
		
		$("#erros").html("");
	});

	$('[name="draw"]').click(function(){
		
		$("#erros").html("");
		
		var empty_field = false;		
		var i;
		for(i =1 ; i <= 4 ; i++){
			var text_box_id;
			text_box_id = "#no"+i;
			if($(text_box_id).val()==''){
				$("#erros").append("<p style='color:red'><b>Please enter "+$(text_box_id).attr('name')+"</b></p>");
				empty_field = true;
			}
			
		}		
		

		
		if($('[name="equation"]').val()!=''){
			var equation = validateEquation($('[name="equation"]').val());
		
			if(equation==null)
				$("#erros").append("<p style='color:red'><b>ERROR:EQUATION Syntax!!!</b></p>");
		}

		if($('[name="steps"]').val()!=''){
			var steps = validateIsInt($('[name="steps"]').val());
			if(steps==null)
				$("#erros").append("<p style='color:red'><b>INVALID STEP VALUE!!!</b></p>");
		}

		if($('[name="inbound"]').val()!=''){
			var inbound = validateIsInt($('[name="inbound"]').val());
			if(inbound==null)
				$("#erros").append("<p style='color:red'><b>INVALID INBOUND VALUE!!!</b></p>");
		}

		if($('[name="outbound"]').val()!=''){
			var outbound = validateIsInt($('[name="outbound"]').val());
			if(outbound==null)
				$("#erros").append("<p style='color:red'><b>INVALID OUTBOUND VALUE!!!</b></p>");
		}

		if(inbound != null && outbound != null){
				if(inbound > outbound){
					$("#erros").append("<p style='color:red'><b>ERROR: INBOUND > OUTBOUND!!!</b></p>");
					inbound = null;
					outbound = null;
				}

		}

		

		
		if(empty_field == true || equation == null || steps == null || inbound == null || outbound == null ){
				
		}else{
				
				var line = new Line(equation,steps,inbound,outbound);//Creating Line Object
				line.draw();					
		}
			
		
		
	});


	function validateEquation(equation){
		equation = equation.replace(/\s/g,'');
		var parts = equation.match(/^y=([-|+]?\d*)x([+|-]\d+)$/);
		if(parts == null)
			return null;
		
		delete(parts[0]);
		var m = parseInt(parts[1]);
		var c = parseInt(parts[2]);		
		return equation;		
	}

	function validateIsInt(steps){
		steps = steps.replace(/\s/g,'');
		var parts = steps.match(/^[+|-]?[0-9]+$/);		
		if(parts == null)
			return null;
		return parseInt(parts[0]);
	}


	

});



