//TODO Calculate scaling
"use strict";

function generateOutput() {
    var tab = "&nbsp;&nbsp;&nbsp;&nbsp";
	var mf = document.forms.Mform;
	var monDiv = document.getElementById("monSetDiv");
	var chf = document.forms.CHform;
	var chDiv = document.getElementById("chSetDiv");
	var ch1f = document.forms.FRCH1form;
	var ch1FrSetDiv = document.getElementById("ch1FrSetDiv");
	var ch2f = document.forms.FRCH2form;
	var ch2FrSetDiv = document.getElementById("ch2FrSetDiv");
    var text_mon = "";
    var text_ch = "";
    var text_fr1 = "";
    var text_fr2 = "";
    var t = 0;
    var u = 0;
	var fr1 = 0;
	var fr2 = 0;

    // Generate Monitor text
    var contextsSource = [];
    var contextsResult = [];

    for (var i = 0; i < mf.length; i += 2) {
        t += 1;
        if (mf.elements[i].value !== "") {
            text_mon += tab +
						'Monitor("m' +
						(t) +
						'", "\\\\.\\\DISPLAY' +
						(t) +
						'", WaitForFrame(On), Size(' +
			   			document.getElementById("mon_width_" + t).value +
						',' +
						document.getElementById("mon_height_" + t).value +
						'), ColorModel(TrueColor), RefreshRate(60), DefaultColor($000000));<br>';
        } else {
            text_mon += "";
        }
        // Insert text
        document.getElementById("mon_out").innerHTML = text_mon;
    }
    // Generate Channel text
    for (var i = 0; i < chf.length; i += 2) {
        u += 1;
        if (chf.elements[i].value !== "") {
              // Generate Frame text channel 1
            if (u === 1) {
                for (var j = 0; j < ch1f.length; j += 10) {
					fr1 += 1;
					if (ch1f.elements[j].value !== "") {
						text_fr1 += tab + tab + tab +
									',Target("m' +
									document.getElementById("ch"+(u)+"_fr_mon_num_" + fr1).value +
									'", Source(Origin(' +
									document.getElementById("ch"+(u)+"_fr_sourcex_" + fr1).value +
									'/' +
									document.getElementById("ch_width_" + u).value +
									',' +
									document.getElementById("ch"+(u)+"_fr_sourcey_" + fr1).value +
									'/' +
									document.getElementById("ch_height_" + u).value +
									')), Dest(On, Position(' +
									document.getElementById("ch"+(u)+"_fr_destx_" + fr1).value +
									'/' +
			   						document.getElementById("mon_width_" + 	document.getElementById("ch"+(u)+"_fr_mon_num_" + fr1).value).value +
									',' +
									document.getElementById("ch"+(u)+"_fr_desty_" + fr1).value +
									'/' +
			   						document.getElementById("mon_height_" +	document.getElementById("ch"+(u)+"_fr_mon_num_" + fr1).value).value +
									'), Scale(' +
									// if window is smaler than screen size (in case of led screens)
									((parseInt(document.getElementById("ch"+(u)+"_fr_dest_width_" + fr1).value) < parseInt(document.getElementById("mon_width_" + document.getElementById("ch"+(u)+"_fr_mon_num_" + fr1).value).value)) ? (document.getElementById("ch"+(u)+"_fr_dest_width_" + fr1).value) : (document.getElementById("ch_width_1").value)) +
									'/' +
									// if rotation = 90 || 270
									((parseInt(document.getElementById("ch"+(u)+"_fr_dest_width_" + fr1).value) < parseInt(document.getElementById("mon_width_" + document.getElementById("ch"+(u)+"_fr_mon_num_" + fr1).value).value)) ? (document.getElementById("mon_width_" + document.getElementById("ch"+(u)+"_fr_mon_num_" + fr1).value).value) : (((document.getElementById("ch"+(u)+"_fr_orientation_" + fr1).value === "90" || document.getElementById("ch"+(u)+"_fr_orientation_" + fr1).value === "270") ? (parseInt(document.getElementById("ch"+ (u) + "_fr_width_" + fr1).value) / parseInt(document.getElementById("ch"+ (u) + "_fr_dest_width_" + fr1).value))*(parseInt(document.getElementById("mon_width_" + document.getElementById("ch"+(u)+"_fr_mon_num_" + fr1).value).value)) :
										// if rotation = 0 || 180
										(parseInt(document.getElementById("ch"+ (u) + "_fr_width_" + fr1).value) / parseInt(document.getElementById("ch"+ (u) + "_fr_dest_width_" + fr1).value))*(parseInt(document.getElementById("mon_width_" + document.getElementById("ch"+(u)+"_fr_mon_num_" + fr1).value).value))))) +
									',' +
									// if window is smaler than screen size (in case of led screens)
									((parseInt(document.getElementById("ch"+(u)+"_fr_dest_height_" + fr1).value) < parseInt(document.getElementById("mon_height_" + document.getElementById("ch"+(u)+"_fr_mon_num_" + fr1).value).value)) ? (document.getElementById("ch"+(u)+"_fr_dest_height_" + fr1).value) : (document.getElementById("ch_height_1").value)) +
									'/' +
									// if rotation = 90 || 270
									((parseInt(document.getElementById("ch"+(u)+"_fr_dest_height_" + fr1).value) < parseInt(document.getElementById("mon_height_" + document.getElementById("ch"+(u)+"_fr_mon_num_" + fr1).value).value)) ? (document.getElementById("mon_height_" + 	document.getElementById("ch"+(u)+"_fr_mon_num_" + fr1).value).value) : (((document.getElementById("ch"+(u)+"_fr_orientation_" + fr1).value === "90" || document.getElementById("ch"+(u)+"_fr_orientation_" + fr1).value === "270") ? (parseInt(document.getElementById("ch"+ (u) + "_fr_height_" + fr1).value) / parseInt(document.getElementById("ch"+ (u) + "_fr_dest_height_" + fr1).value))*(parseInt(document.getElementById("mon_height_" + document.getElementById("ch"+(u)+"_fr_mon_num_" + fr1).value).value)) :
										// if rotation = 0 || 180
										(parseInt(document.getElementById("ch"+ (u) + "_fr_height_" + fr1).value) / parseInt(document.getElementById("ch"+ (u) + "_fr_dest_height_" + fr1).value))*(parseInt(document.getElementById("mon_height_" + document.getElementById("ch"+(u)+"_fr_mon_num_" + fr1).value).value))))) +
									'), Rotate(0,0,' +
									document.getElementById("ch"+(u)+"_fr_orientation_" + fr1).value +
									')))<br>';
					} else {
						text_fr1 += "";
                    }
					// Insert text
                   	document.getElementById("fr_out_"+(u)).innerHTML = text_fr1 + tab + tab + ");";
                }
            }
            // Generate Frame text channel 2
            if (u > 1) {
				for (var j = 0; j < ch2f.length; j += 10) {
					fr2 += 1;
					if (ch2f.elements[j].value !== "") {
						text_fr2 += tab + tab + tab +
									',Target("m' +
									document.getElementById("ch"+(u)+"_fr_mon_num_" + fr2).value +
									'", Source(Origin(' +
									document.getElementById("ch"+(u)+"_fr_sourcex_" + fr2).value +
									'/' +
									document.getElementById("ch_width_" + u).value +
									',' +
									document.getElementById("ch"+(u)+"_fr_sourcey_" + fr2).value +
									'/' +
									document.getElementById("ch_height_" + u).value +
									')), Dest(On, Position(' +
									document.getElementById("ch"+(u)+"_fr_destx_" + fr2).value +
									'/' +
			   						document.getElementById("mon_width_" + 	document.getElementById("ch"+(u)+"_fr_mon_num_" + fr2).value).value +
									',' +
									document.getElementById("ch"+(u)+"_fr_desty_" + fr2).value +
									'/' +
			   						document.getElementById("mon_height_" +	document.getElementById("ch"+(u)+"_fr_mon_num_" + fr2).value).value +
									'), Scale(' +
									// if window is smaler than screen size (in case of led screens)
									((parseInt(document.getElementById("ch"+(u)+"_fr_dest_width_" + fr2).value) < parseInt(document.getElementById("mon_width_" + document.getElementById("ch"+(u)+"_fr_mon_num_" + fr2).value).value)) ? (document.getElementById("ch"+(u)+"_fr_dest_width_" + fr2).value) : (document.getElementById("ch_width_2").value)) +
									'/' +
									// if rotation = 90 || 270
									((document.getElementById("ch"+(u)+"_fr_dest_width_" + fr2).value < document.getElementById("mon_width_" + 	document.getElementById("ch"+(u)+"_fr_mon_num_" + fr2).value).value) ? (document.getElementById("mon_width_" + 	document.getElementById("ch"+(u)+"_fr_mon_num_" + fr2).value).value) : (((document.getElementById("ch"+(u)+"_fr_orientation_" + fr2).value === "90" || document.getElementById("ch"+(u)+"_fr_orientation_" + fr2).value === "270") ? (parseInt(document.getElementById("ch"+ (u) + "_fr_width_" + fr2).value) / parseInt(document.getElementById("ch"+ (u) + "_fr_dest_width_" + fr2).value))*(parseInt(document.getElementById("mon_width_" + document.getElementById("ch"+(u)+"_fr_mon_num_" + fr2).value).value)) :
										// if rotation = 0 || 180
										(parseInt(document.getElementById("ch"+ (u) + "_fr_width_" + fr2).value) / parseInt(document.getElementById("ch"+ (u) + "_fr_dest_width_" + fr2).value))*(parseInt(document.getElementById("mon_width_" + document.getElementById("ch"+(u)+"_fr_mon_num_" + fr2).value).value))))) +
									',' +
									// if window is smaler than screen size (in case of led screens)
									((parseInt(document.getElementById("ch"+(u)+"_fr_dest_height_" + fr2).value) < parseInt(document.getElementById("mon_height_" + document.getElementById("ch"+(u)+"_fr_mon_num_" + fr2).value).value)) ? (document.getElementById("ch"+(u)+"_fr_dest_height_" + fr2).value) : (document.getElementById("ch_height_2").value)) +
									'/' +
									// if rotation = 90 || 270
									((parseInt(document.getElementById("ch"+(u)+"_fr_dest_height_" + fr2).value) < parseInt(document.getElementById("mon_height_" + 	document.getElementById("ch"+(u)+"_fr_mon_num_" + fr2).value).value)) ? (document.getElementById("mon_height_" + 	document.getElementById("ch"+(u)+"_fr_mon_num_" + fr2).value).value) : (((document.getElementById("ch"+(u)+"_fr_orientation_" + fr2).value === "90" || document.getElementById("ch"+(u)+"_fr_orientation_" + fr2).value === "270") ? (parseInt(document.getElementById("ch"+ (u) + "_fr_height_" + fr2).value) / parseInt(document.getElementById("ch"+ (u) + "_fr_dest_height_" + fr2).value))*(parseInt(document.getElementById("mon_height_" + document.getElementById("ch"+(u)+"_fr_mon_num_" + fr2).value).value)) :
										// if rotation = 0 || 180
										(parseInt(document.getElementById("ch"+ (u) + "_fr_height_" + fr2).value) / parseInt(document.getElementById("ch"+ (u) + "_fr_dest_height_" + fr2).value))*(parseInt(document.getElementById("mon_height_" + document.getElementById("ch"+(u)+"_fr_mon_num_" + fr2).value).value))))) +
									'), Rotate(0,0,' +
									document.getElementById("ch"+(u)+"_fr_orientation_" + fr2).value +
									')))<br>';
					} else {
						text_fr2 += "";
                    }
					// Insert text
 					document.getElementById("fr_out_"+(u)).innerHTML = text_fr2 + tab + tab + ");";
                }
            }
			text_ch = tab + tab +
			'VirtualMonitor("Display ' +
			(u) +
			'", Primary(On), AutoScale(FillExact), AspectRatio(' +
			document.getElementById("ch_width_" + (u)).value +
			',' +
			document.getElementById("ch_height_" + (u)).value +
			')';
        } else {
            // Insert text
            text_ch = "";
        }
        document.getElementById("ch_out_" + u).innerHTML = text_ch;
	}

	//Generate canvas source
	for(var i = 1; i <= u; i++) {
		var context = createCanvas(document.getElementById("ch_width_" + (i)).value ? document.getElementById("ch_width_" + (i)).value : 0, document.getElementById("ch_height_" + (i)).value  ? document.getElementById("ch_height_" + (i)).value : 0, i, "source");
		contextsSource.push(context);
	}
	//Generate frame rectangles result
	for(var j = 1; j <= fr1; j++) {
   		createRectangles(contextsSource[0], document.getElementById("ch1_fr_sourcex_" + (j)).value, document.getElementById("ch1_fr_sourcey_" + (j)).value, document.getElementById("ch1_fr_width_" + (j)).value, document.getElementById("ch1_fr_height_" + (j)).value, 1, (j), "CornflowerBlue", "blue", 0);
	}
	for(var j = 1; j <= fr2; j++) {
   		createRectangles(contextsSource[1], document.getElementById("ch2_fr_sourcex_" + (j)).value, document.getElementById("ch2_fr_sourcey_" + (j)).value, document.getElementById("ch2_fr_width_" + (j)).value, document.getElementById("ch2_fr_height_" + (j)).value, 2, (j), "CornflowerBlue", "blue", 0);
	}
	//Generate canvas result
	for(var i = 1; i <= t; i++) {
		var context = createCanvas(document.getElementById("mon_width_" + (i)).value ? document.getElementById("mon_width_" + (i)).value : 0, document.getElementById("mon_height_" + (i)).value  ? document.getElementById("mon_height_" + (i)).value : 0, i, "result");
		contextsResult.push(context);
	}
	//Generate frame rectangles result
	for(var j = 1; j <= fr1; j++) {
		createRectangles(contextsResult[(document.getElementById("ch1_fr_mon_num_" + j).value)-1], document.getElementById("ch1_fr_destx_" + (j)).value, document.getElementById("ch1_fr_desty_" + (j)).value, document.getElementById("ch1_fr_dest_width_" + (j)).value, document.getElementById("ch1_fr_dest_height_" + (j)).value, 1, (j), "CornflowerBlue", "blue", document.getElementById("ch1_fr_orientation_" + (j)).value);
	}
	for(var j = 1; j <= fr2; j++) {
		createRectangles(contextsResult[(document.getElementById("ch2_fr_mon_num_" + j).value)-1], document.getElementById("ch2_fr_destx_" + (j)).value, document.getElementById("ch2_fr_desty_" + (j)).value, document.getElementById("ch2_fr_dest_width_" + (j)).value, document.getElementById("ch2_fr_dest_height_" + (j)).value, 2, (j), "CornflowerBlue", "blue", document.getElementById("ch2_fr_orientation_" + (j)).value);
	}
}

function createRectangles(context, rXpos, rYpos, rWidth, rHeight, chNum, frNum, fillColor, lineColor, angle) {
	context.beginPath();
	context.rotate(angle*Math.PI/180);

	switch(parseInt(angle)) {
		case 90:
			context.rect(-((rYpos/6)-4), (-(rXpos/6)+4), (rWidth/6)-8, (rHeight/6)-8);
			break;
		case 180:
			context.rect(-(rXpos/6)+4, -(rYpos/6)+4, (rWidth/6)-8, (rHeight/6)-8);
			break;
		case 270:
			context.rect(-((rYpos/6)-4), ((rXpos/6)+4), (rWidth/6)-8, (rHeight/6)-8);
			break;
		default:
			context.rect((rXpos/6)+4, (rYpos/6)+4, (rWidth/6)-8, (rHeight/6)-8);
			break;
	}

	context.lineWidth="4";
	context.strokeStyle= lineColor;
	context.fillStyle = fillColor;
	context.stroke();
  	context.fill();
	// Draw text
	context.fillStyle = "white";
	context.font = "10px Arial";
	switch(parseInt(angle)) {
		case 90:
			context.fillText("Channel" + chNum + " - Frame" + frNum, -((rYpos/6)-10), -((rXpos/6)-20));
			break;
		case 180:
			context.fillText("Channel" + chNum + " - Frame" + frNum, -((rXpos/6)-10), -((rYpos/6)-20));
			break;
		case 270:
			context.fillText("Channel" + chNum + " - Frame" + frNum, -((rYpos/6)-10), (rXpos/6)+20);
			break;
		default:
			context.fillText("Channel" + chNum + " - Frame" + frNum, (rXpos/6)+10, (rYpos/6)+20);
			break;
	}
	// reset rotation
	context.rotate(-angle*Math.PI/180);
}

function createCanvas(cWidth, cHeight, num, result) {
	var canvas = document.getElementById("myCanvas_" + num + "_" + result);
    var context = canvas.getContext('2d');
    canvas.width = cWidth/6;
    canvas.height = cHeight/6;
	context.fillstyle="black";
	context.fillRect(0,0,cWidth,cHeight);

    return context;
}

function monitorDropdown() {
//    var monDropDiv = document.getElementsByClassName("monDropDiv");
    var monDropDiv = document.getElementById("monDropDiv");
    //Create array of options to be added
    var array = ["", 1, 2, 3, 4];
	// Create label
	var monLabel = document.createElement("Label");
	monLabel.innerHTML = "Aantal Monitors (in Windows): ";
    //Create and append select list
    var monList = document.createElement("select");
    monList.setAttribute("onchange", "monitorSettings(value), channelDropDown(value)");
    monList.setAttribute("id", "mySelect");
	monDropDiv.appendChild(monLabel);
    monDropDiv.appendChild(monList);

    //Create and append the options
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
		if(i === 0) {
			option.setAttribute("disabled", array[i]);
			option.setAttribute("selected", array[i]);
		}
        option.setAttribute("value", array[i]);
        option.text = array[i];
        monList.appendChild(option);
    }
}

function monitorSettings(num) {
	var number = num;
	var monSetDiv = document.getElementById("monSetDiv");
	while (monSetDiv.hasChildNodes()) {
		monSetDiv.removeChild(monSetDiv.lastChild);
	}
	for ( var i=1; i <= number; i++){
		monSetDiv.appendChild(document.createTextNode("Monitor " + (i) + ": "));
		var inputW = document.createElement("input");
		inputW.id = "mon_width_" + (i);
		inputW.type = "number";
		inputW.placeholder = "Breedte";
		inputW.title = "Breedte";
		var inputH = document.createElement("input");
		inputH.id = "mon_height_" + (i);
		inputH.type = "number";
		inputH.placeholder = "Hoogte";
		inputH.title = "Hoogte";
		monSetDiv.appendChild(inputW);
		monSetDiv.appendChild(inputH);
		monSetDiv.appendChild(document.createElement("br"));
	}
}

function channelDropDown(num) {
	var array = ["",1,2];
	var chDropDiv = document.getElementById("chDropDiv");
	while (chDropDiv.hasChildNodes()) {
		chDropDiv.removeChild(chDropDiv.lastChild);
	}
	// Create label
	var chLabel = document.createElement("Label");
	chLabel.innerHTML = "Aantal Channels: ";
    //Create and append select list
    var chList = document.createElement("select");
    chList.setAttribute("onchange", "channelSettings(value), checkFrameDropDown(value, " + num + ")");
    chList.setAttribute("id", "mySelect");
	chDropDiv.appendChild(chLabel);
    chDropDiv.appendChild(chList);

    //Create and append the options
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
		if(i === 0) {
			option.setAttribute("disabled", array[i]);
			option.setAttribute("selected", array[i]);
		}
        option.setAttribute("value", array[i]);
        option.text = array[i];
        chList.appendChild(option);
    }
}

function checkFrameDropDown(num, mNum) {
	if(num === "1") {
		frameChannel1DropDown(mNum);
	}
	else if(num === "2") {
		frameChannel1DropDown(mNum);
		frameChannel2DropDown(mNum);
	}
}

function channelSettings(num) {
	var number = num;
	var chSetDiv = document.getElementById("chSetDiv");
	while (chSetDiv.hasChildNodes()) {
		chSetDiv.removeChild(chSetDiv.lastChild);
	}
	for ( var i=1; i <= number; i++){
		chSetDiv.appendChild(document.createTextNode("Channel " + (i) + ": "));
		var inputW = document.createElement("input");
		inputW.id = "ch_width_" + (i);
		inputW.type = "number";
		inputW.placeholder = "Breedte";
		inputW.title = "Breedte";
		var inputH = document.createElement("input");
		inputH.id = "ch_height_" + (i);
		inputH.type = "number";
		inputH.placeholder = "Hoogte";
		inputH.title = "Hoogte";
		chSetDiv.appendChild(inputW);
		chSetDiv.appendChild(inputH);
		chSetDiv.appendChild(document.createElement("br"));
	}
}

function frameChannel1DropDown(num) {
	var array = [0,1,2,3,4,5,6,7,8,9];
	var ch1FrDropDiv = document.getElementById("ch1FrDropDiv");
	while (ch1FrDropDiv.hasChildNodes()) {
		ch1FrDropDiv.removeChild(ch1FrDropDiv.lastChild);
	}
	// Create label
	var ch1FrLabel = document.createElement("Label");
	ch1FrLabel.innerHTML = "Aantal Frames Channel 1: ";
    //Create and append select list
    var ch1FrList = document.createElement("select");
    ch1FrList.setAttribute("onchange", "channel1FrameSettings(value, " + num + ")");
    ch1FrList.setAttribute("id", "mySelect");
	ch1FrDropDiv.appendChild(ch1FrLabel);
    ch1FrDropDiv.appendChild(ch1FrList);

    //Create and append the options
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
		if(i === 0) {
			option.setAttribute("disabled", array[i]);
			option.setAttribute("selected", array[i]);
		}
        option.setAttribute("value", array[i]);
        option.text = array[i];
        ch1FrList.appendChild(option);
    }
}

function channel1FrameSettings(num, mNum) {
	var number = num;
	var ch1FrSetDiv = document.getElementById("ch1FrSetDiv");
	while (ch1FrSetDiv.hasChildNodes()) {
		ch1FrSetDiv.removeChild(ch1FrSetDiv.lastChild);
	}
	for ( var i = 1; i <= number; i++){
		ch1FrSetDiv.appendChild(document.createTextNode("Frame " + (i) + ": "));
		var inputW = document.createElement("input");
		inputW.id = "ch1_fr_width_" + (i);
		inputW.type = "number";
		inputW.placeholder = "Bron Breedte";
		inputW.title = "Bron Breedte";
		var inputH = document.createElement("input");
		inputH.id = "ch1_fr_height_" + (i);
		inputH.type = "number";
		inputH.placeholder = "Bron Hoogte";
		inputH.title = "Bron Hoogte";
		var inputSx = document.createElement("input");
		inputSx.id = "ch1_fr_sourcex_" + (i);
		inputSx.type = "number";
		inputSx.placeholder = "Bron Links";
		inputSx.title = "Bron Links";
		var inputSy = document.createElement("input");
		inputSy.id = "ch1_fr_sourcey_" + (i);
		inputSy.type = "number";
		inputSy.placeholder = "Bron Boven";
		inputSy.title = "Bron Boven";
		var inputDx = document.createElement("input");
		inputDx.id = "ch1_fr_destx_" + (i);
		inputDx.type = "number";
		inputDx.placeholder = "Best Links";
		inputDx.title = "Best Links";
		var inputDy = document.createElement("input");
		inputDy.id = "ch1_fr_desty_" + (i);
		inputDy.type = "number";
		inputDy.placeholder = "Best Boven";
		inputDy.title = "Best Boven";
		var inputDw = document.createElement("input");
		inputDw.id = "ch1_fr_dest_width_" + (i);
		inputDw.type = "number";
		inputDw.placeholder = "Best Breedte";
		inputDw.title = "Best Breedte";
		var inputDh = document.createElement("input");
		inputDh.id = "ch1_fr_dest_height_" + (i);
		inputDh.type = "number";
		inputDh.placeholder = "Best Hoogte";
		inputDh.title = "Best Hoogte";

    	var selectOr = document.createElement("select");
        selectOr.id = "ch1_fr_orientation_" + (i);
		var option1 = document.createElement("option");
		option1.value="0";
		option1.selected="";
		option1.innerHTML= "0 \u00B0";
		var option2 = document.createElement("option");
		option2.value="90";
		option2.innerHTML= "90 \u00B0";
		var option3 = document.createElement("option");
		option3.value="180";
		option3.innerHTML= "180 \u00B0";
		var option4 = document.createElement("option");
		option4.value="270";
		option4.innerHTML= "270 \u00B0";
		selectOr.appendChild(option1);
		selectOr.appendChild(option2);
		selectOr.appendChild(option3);
		selectOr.appendChild(option4);

		var selectMon = document.createElement("select");
		selectMon.id = "ch1_fr_mon_num_" + (i);
		for(var j = 1; j <= mNum; j++) {
			var Moption = document.createElement("option");
			Moption.setAttribute("value", (j));
			Moption.text = "Op Monitor " + (j);
			selectMon.appendChild(Moption);
		}


		ch1FrSetDiv.appendChild(inputW);
		ch1FrSetDiv.appendChild(inputH);
		ch1FrSetDiv.appendChild(inputSx);
		ch1FrSetDiv.appendChild(inputSy);
		ch1FrSetDiv.appendChild(inputDx);
		ch1FrSetDiv.appendChild(inputDx);
		ch1FrSetDiv.appendChild(inputDy);
		ch1FrSetDiv.appendChild(inputDw);
		ch1FrSetDiv.appendChild(inputDh);
		ch1FrSetDiv.appendChild(selectOr);
		ch1FrSetDiv.appendChild(selectMon);
		ch1FrSetDiv.appendChild(document.createElement("br"));
	}
}

function frameChannel2DropDown(num) {

	var array = [0,1,2,3,4,5,6,7,8,9];
	var ch2FrDropDiv = document.getElementById("ch2FrDropDiv");
	while (ch2FrDropDiv.hasChildNodes()) {
		ch2FrDropDiv.removeChild(ch2FrDropDiv.lastChild);
	}
	// Create label
	var ch2FrLabel = document.createElement("Label");
	ch2FrLabel.innerHTML = "Aantal Frames Channel 2: ";
    //Create and append select list
    var ch2FrList = document.createElement("select");
    ch2FrList.setAttribute("onchange", "channel2FrameSettings(value, " + num + ")");
    ch2FrList.setAttribute("id", "mySelect");
	ch2FrDropDiv.appendChild(ch2FrLabel);
    ch2FrDropDiv.appendChild(ch2FrList);

    //Create and append the options
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
		if(i === 0) {
			option.setAttribute("disabled", array[i]);
			option.setAttribute("selected", array[i]);
		}
        option.setAttribute("value", array[i]);
        option.text = array[i];
        ch2FrList.appendChild(option);
    }
}

function channel2FrameSettings(num, mNum) {
	var number = num;
	var ch2FrSetDiv = document.getElementById("ch2FrSetDiv");
	while (ch2FrSetDiv.hasChildNodes()) {
		ch2FrSetDiv.removeChild(ch2FrSetDiv.lastChild);
	}
	for ( var i = 1; i <= number; i++){
		ch2FrSetDiv.appendChild(document.createTextNode("Frame " + (i) + ": "));
		var inputW = document.createElement("input");
		inputW.id = "ch2_fr_width_" + (i);
		inputW.type = "number";
		inputW.placeholder = "Bron Breedte";
		inputW.title = "Bron Breedte";
		var inputH = document.createElement("input");
		inputH.id = "ch2_fr_height_" + (i);
		inputH.type = "number";
		inputH.placeholder = "Bron Hoogte";
		inputH.title = "Bron Hoogte";
		var inputSx = document.createElement("input");
		inputSx.id = "ch2_fr_sourcex_" + (i);
		inputSx.type = "number";
		inputSx.placeholder = "Bron Links";
		inputSx.title = "Bron Links";
		var inputSy = document.createElement("input");
		inputSy.id = "ch2_fr_sourcey_" + (i);
		inputSy.type = "number";
		inputSy.placeholder = "Bron Boven";
		inputSy.title = "Bron Boven";
		var inputDx = document.createElement("input");
		inputDx.id = "ch2_fr_destx_" + (i);
		inputDx.type = "number";
		inputDx.placeholder = "Best Links";
		inputDx.title = "Best Links";
		var inputDy = document.createElement("input");
		inputDy.id = "ch2_fr_desty_" + (i);
		inputDy.type = "number";
		inputDy.placeholder = "Best Boven";
		inputDy.title = "Best Boven";
		var inputDw = document.createElement("input");
		inputDw.id = "ch2_fr_dest_width_" + (i);
		inputDw.type = "number";
		inputDw.placeholder = "Best Breedte";
		inputDw.title = "Best Breedte";
		var inputDh = document.createElement("input");
		inputDh.id = "ch2_fr_dest_height_" + (i);
		inputDh.type = "number";
		inputDh.placeholder = "Best Hoogte";
		inputDh.title = "Best Hoogte";
    	var selectOr = document.createElement("select");
        selectOr.id = "ch2_fr_orientation_" + (i);

		var option1 = document.createElement("option");
		option1.value="0";
		option1.selected="";
		option1.innerHTML= "0 \u00B0";
		var option2 = document.createElement("option");
		option2.value="90";
		option2.innerHTML= "90 \u00B0";
		var option3 = document.createElement("option");
		option3.value="180";
		option3.innerHTML= "180 \u00B0";
		var option4 = document.createElement("option");
		option4.value="270";
		option4.innerHTML= "270 \u00B0";

		var selectMon = document.createElement("select");
		selectMon.id = "ch2_fr_mon_num_" + (i);
		for(var j = 1; j <= mNum; j++) {
			var Moption = document.createElement("option");
			Moption.setAttribute("value", (j));
			Moption.text = "Op Monitor " + (j);
			selectMon.appendChild(Moption);
		}

		selectOr.appendChild(option1);
		selectOr.appendChild(option2);
		selectOr.appendChild(option3);
		selectOr.appendChild(option4);


		ch2FrSetDiv.appendChild(inputW);
		ch2FrSetDiv.appendChild(inputH);
		ch2FrSetDiv.appendChild(inputSx);
		ch2FrSetDiv.appendChild(inputSy);
		ch2FrSetDiv.appendChild(inputDx);
		ch2FrSetDiv.appendChild(inputDx);
		ch2FrSetDiv.appendChild(inputDy);
		ch2FrSetDiv.appendChild(inputDw);
		ch2FrSetDiv.appendChild(inputDh);
		ch2FrSetDiv.appendChild(selectOr);
		ch2FrSetDiv.appendChild(selectMon);
		ch2FrSetDiv.appendChild(document.createElement("br"));
	}
}
