$(document).ready(function(){
  
	
	
  
	$("input").focus(function(){
		color = $(this).val()
	});  
  
	$('[name="num"]').hover(function(){
		$(this).css("border-color","black");
	});

	$('[name="num"]').mouseleave(function(){
		$(this).css("border-color",$(this).css("background-color"));
	});

	$('[name="num"]').click(function(){
		if(color == undefined) alert("Please Select a Colour");

		if($(this).css("background-color") != 'rgb(204, 204, 204)'){
			 var box_color = hexc($(this).css("background-color"));
			 alert("Already applied "+stringc(box_color)+" colour");
		}
		else {
			$(this).css("background-color",color);
		}
	});
	var color = undefined;


	$('[name="randomize"]').click(function(){
		
		var randomNumber = getRandomInt(1,9);
		
		
		var random_sequence= [];
		random_sequence = randomSequence(randomNumber);
		
		var ori_box_value = []
		var ori_box_color = []
		var box_number;
		var i;
		var j;
		for(i =  0;i< 9; i++){
			j = i+1;
			box_number = ".b"+j;  			
			ori_box_value[i]= $(box_number).text();
			ori_box_color[i]= hexc($(box_number).css("background-color"));
						
		}

	
		j=0;
		var k = 0;
		var l = 0;
		var html_content = "";
		var bg_color = "";
		
		for(i =0;i<9;i++){
			j = i+1;
			box_number = ".b"+j;			
			html_content = "<h2>" + ori_box_value[random_sequence[i]-1] + "</h2>";
			bg_color = ori_box_color[random_sequence[i]-1];
			$(box_number).html(html_content);
			$(box_number).css("background-color",bg_color);
			$(box_number).css("border-color",bg_color);
				
		}

		

	});

	$('[name="reset"]').click(function(){
		var i;
		var color_radio_id;
		var box_id;
		color = undefined;	
		for(i=1 ; i<=9 ; i ++){
			if(i<=3){
				color_radio_id ="#color"+i;
				$(color_radio_id).prop('checked', false);
			}
			
			box_id = "#box"+i;
			$(box_id).css("background-color","#ccc");
			$(box_id).html("<h2>"+i+"<h2>");
			$(box_id).css("border-color","#ccc");
		}
	});

	function randomSequence(number){
		
		var result = [];
		var i;
		var j;
		j = number;
		
		for(i =0;i<9 ; i++){
			
			if(j==12)j=1;
			else if(j==11)j=3;
			else if(j==10)j=2;
			
			result[i]=j;
			j+=3;	
		}

		return result;
	}



	function getRandomInt(min,max) {
	    return  (Math.floor(Math.random() * (max - min + 1)) + min);
	}




	function hexc(colorval) {
		var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		delete(parts[0]);
		for (var i = 1; i <= 3; ++i) {
			parts[i] = parseInt(parts[i]).toString(16);
			if (parts[i].length == 1) parts[i] = '0' + parts[i];
		}
		return colorval = '#' + parts.join('');
	}

	function stringc(colorval) {
		if(colorval == '#008000')
			return colorval = 'Green';
		else if(colorval == '#0000ff')
			return colorval = 'Blue';
		else if(colorval == '#ff0000')
			return colorval = 'Red';
		
		return undefined;
	}


	

});



