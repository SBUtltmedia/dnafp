
var tipLocation=0;
var keyframes =[{ name:'moveTube',
    '0%': {
        top: '71.9%'
},
    '100%': {
        top: '63%',
}},

{ name:'closeCap',
    '0%': {
        transform:'rotate(-135deg)'
},
    '100%':{
        transform:'rotate(0deg)'
}},

{ name:'tubeDown',
    '0%':{
        top: '63%',
},
    '100%': {
        top: '71.9%'
}},

{ name:'movePipet',
    '0%':{
        left: '0.5%',
        top: '52%',
},
    '10%':{
        left: '0.5%',
        top: '35%',
},
    '40%':{
        left: '52%',
        top: '35%',
},
    '50%':{
        left: '52%',
        top: '41.6%',
},
    '80%':{
        left: '82.5%',
        top: '47%',
},
    '90%':{
        left: '83%',
        top: '32%',
},
    '100%':{
        left: '86.4%',
        top: '40.8%',
}},



{ name:'removeLid',
    '0%':{
        top: '21.58%',
        left: '59.88%',
        transform:'rotate(0deg)'
},
    '10%':{
        top: '18.5%',
},
    '25%':{
        top: '16.7%',
        transform:'rotate(20deg)'
},
    '100%':{
        top: '11.6%',
        left: '70%',
        transform:'rotate(86deg)'
}},



{ name:'replaceLid',
    '0%':{
        top: '11.6%',
        left: '70%',
        transform:'rotate(86deg)'
},
    '10%':{
        top: '16.7%',
        transform:'rotate(20deg)'
},
    '25%':{
        top: '18.5%',
},
    '100%':{
        top: '21.58%',
        left: '59.88%',
        transform:'rotate(0deg)'
}},



{ name:'flickTube',
    '0%':{
        top: '63%',
        transform:'rotate(0deg)'
},
    '25%':{
        top: '63%',
        transform:'rotate(90deg)'
},
    '50%':{
        top: '63%',
        transform:'rotate(0deg)'
},
    '75%':{
        top: '63%',
        transform:'rotate(90deg)'
},
    '100%':{
        top: '63%',
        transform:'rotate(0deg)'
}},



{ name:'tapTube',
    '0%':{
        top: '63%',
},
    '35%':{
        top: '72.3%',
        left: '32%',
},
    '45%':{
        top: '67%',
        left: '32%',
},
    '55%':{
        top: '72.3%',
        left: '32%',
},
    '65%':{
        top: '67%',
        left: '32%',
},
    '75%':{
        top: '72.3%',
        left: '32%',
},
    '85%':{
        top: '67%',
        left: '32%',
},
    '100%':{
        top: '63%',
}},


{ name:'PrepPipet',
'0%':{
   left: '14.5%',
   top: '52%',
},
'100%':{
   left: '24.5%',
   top: '38%',
}},

//addTip1 is in eventLogic
{ name:'addTip1',
    '0':{

    },
    '100%':{
        left: '86.4%',
        top: '28%',
}},
{ name: 'pipetBacktoNormal',
    '0%':{
        left: '52.7%',
        top: '34.7%',
},
    '60%':{
        left: '27.5%',
        top: '40%',
},
    '100%':{
        left: '14.5%',
        top: '52%'
}},

{ name:'addTipp1',
    '0':{

    },
    '100%':{
        left: '20.9%',
        top: '5.4%',
}},

{ name:'addTip2',
    '0%':{
        left: '1.5%',
        top: '52%',
},
    '90%':{
        left: '17%',
        top: '47.6%',
},
    '100%':{
        left: '17%',
        top: '42%',
}},


{ name:'lowerPipet',
    '0%':{
        left: '24.5%',
        top: '38%',
},
    '100%':{
        left: '27.5%',
        top: '40%',
}},


{ name:'moveTip1',
    '0%':{
        left: '20.8%',
        top: '70%',
},
    '20%':{
        left: '20.8%',
        top: '70%',
},
    '25%':{
        left: '20.8%',
        top: '64.6%',
},
    '90%':{
        left: '85.5%',
        top: '50.6%',
},
    '100%':{
        left: '88.9%',
        top: '50.6%',
}},


{ name:'lowerTip1',
    '0%':{
        left: '88.9%',
        top: '50.6%',
},
    '100%':{
        left: '89.03%',
        top: '57.1%',
}},


{ name:'addTip2',
    '0%':{
        left: '52.7%',
        top: '34.7%',
},
    '20%':{
        left: '18.9%',
        top: '47.6%',
},
    '25%':{
        left: '18.9%',
        top: '42%',
},
    '90%':{
        left: '83%',
        top: '28%',
},
    '95%':{
        left: '86.4%',
        top: '28%',
},
    '100%':{
        left: '86.4%',
        top: '35%',
}},



{ name:'moveTip2',
    '0%':{
        left: '21.6%',
        top: '70.2%',
},
    '20%':{
        left: '21.6%',
        top: '70.2%',
},
    '25%':{
        left: '21.6%',
        top: '64.6%',
},
    '90%':{
        left: '85.5%',
        top: '50.6%',
},
    '95%':{
        left: '88.9%',
        top: '50.6%',
},
    '100%':{
        left: '89.03%',
        top: '57.1%',
}},



{ name:'addTip3',
    '0%':{
        left: '14.5%',
        top: '52%',
},
    '8%':{
        left: '14.5%',
        top: '44%',
},
    '14%':{
        left: '19.8%',
        top: '44%',
},
    '20%':{
        left: '19.8%',
        top: '47.6%',
},
    '25%':{
        left: '19.8%',
        top: '42%',
},
    '50%':{
        left: '61%',
        top: '42%',
},
    '58%':{
        left: '61%',
        top: '47%',
},
    '80%':{
        left: '75%',
        top: '47%',
},
    '90%':{
        left: '83%',
        top: '28%',
},
    '95%':{
        left: '86.4%',
        top: '28%',
},
    '100%':{
        left: '86.4%',
        top: '35%',
}},



{ name:'moveTip3',
    '0%':{
        left: '22.4%',
        top: '70.2%',
},
    '20%':{
        left: '22.4%',
        top: '70.2%',
},
    '25%':{
        left: '22.4%',
        top: '64.6%',
},
    '50%':{
        left: '63.5%',
        top: '64.6%',
},
    '58%':{
        left: '63.5%',
        top: '69.6%',
},
    '80%':{
        left: '77.5%',
        top: '69.6%',
},
    '90%':{
        left: '85.5%',
        top: '50.6%',
},
    '95%':{
        left: '89%',
        top: '50.6%',
},
    '100%':{
        left: '89.03%',
        top: '57.1%',
}},



{ name:'addTip4',
    '0%':{
        left: '14.5%',
        top: '52%',
},
    '8%':{
        left: '14.5%',
        top: '44%',
},
    '14%':{
        left: '20.6%',
        top: '44%',
},
    '20%':{
        left: '20.6%',
        top: '47.6%',
},
    '25%':{
        left: '20.6%',
        top: '42%',
},
    '50%':{
        left: '61%',
        top: '42%',
},
    '58%':{
        left: '61%',
        top: '47%',
},
    '80%':{
        left: '75%',
        top: '47%',
},
    '90%':{
        left: '83%',
        top: '28%',
},
    '95%':{
        left: '86.4%',
        top: '28%',
},
    '100%':{
        left: '86.4%',
        top: '35%',
}},



{ name:'moveTip4',
    '0%':{
        left: '23.2%',
        top: '70.2%',
},
    '20%':{
        left: '23.2%',
        top: '70.2%',
},
    '25%':{
        left: '23.2%',
        top: '64.6%',
},
    '50%':{
        left: '63.5%',
        top: '64.6%',
},
    '58%':{
        left: '63.5%',
        top: '69.6%',
},
    '80%':{
        left: '77.5%',
        top: '69.6%',
},
    '90%':{
        left: '85.5%',
        top: '50.6%',
},
    '95%':{
        left: '89%',
        top: '50.6%',
},
    '100%':{
        left: '89%',
        top: '57.6%',
}},



{ name:'tipToBin',
    '0%':{
        top: '100%',
},
    '10.9091%':{
        top: '105%',
},
    '72.72727%':{
        top: '120%',
},
    '90%':{
        top: '130%',
},
    '100%':{
        top: '170%',
}},

{ name:'pipetToBin',
    '0%':{
        left: '34%',
        top: '39%',
},
    '15%':{
        left: '34%',
        top: '31%',
},
    '100%':{
        left: '52.7%',
        top: '34.7%',
}},



{ name:'moveLoadingDye',
    '0%':{
        top: '23.2%',
        left: '7.8%',
},
    '15%':{
        top: '16%',
        left: '7.8%',
},
    '70%':{
        top: '16%',
        left: '22%',
},
    '100%':{
        top: '30%',
        left: '22%',
}},


{ name:'addDyeToTube',
    '0%':{
        left: '20.9%',
        top: '5.4%',
},
    '20%':{
        left: '20.9%',
        top: '0%',
},
    '60%':{
        left: '34.35%',
        top: '15%',
},
    '100%':{
        left: '34.35%',
        top: '39%',
}},


{ name:'returnLoadingDye1',
'0%':{
    top: '28%',
    left: '22%',
},
    '15%':{
        top: '16%',
        left: '22%',
},
    '70%':{
        top: '16%',
        left: '7.8%',
},
     '100%':{
    top: '23.2%',
    left: '7.8%',
},},



{ name:'moveLoadingDye2',
    '0%':{
        left: '11.7%',
        top: '23.2%',
},
    '15%':{
        top: '16%',
        left: '11.7%',
},
    '70%':{
        top: '16%',
        left: '26%',
},
    '100%':{
        top: '28%',
        left: '27%',
}},



{ name:'ejectTip',
    '0%': {
        left: '55.3%',
        top: '56.9%',
},
    '100%':{
        left: '55.3%',
        top: '65%',
}},



{ name:'tipToTube1',
    '0%':{
        left: '89%',
        top: '57.6%',
},
    '25%':{
        left: '89%',
        top: '50.6%',
},
    '85%':{
        left: '39.6%',
        top: '57.6%',
},
    '90%':{
        left: '36.6%',
        top: '54.2%',
},
    '100%':{
        left: '36.6%',
        top: '61.5%',
}},



{ name:'pipetToTube1',
    '0%':{
        left: '86.4%',
        top: '28%',
},
    '5%':{
        left: '86.4%',
        top: '35%',
},
    '25%':{
        left: '86.4%',
        top: '28%',
},
    '85%':{
        left: '37%',
        top: '35%'
},
    '90%':{
        left: '34.25%',
        top: '31.7%',
},
    '100%':{
        left: '34.25%',
        top: '39%',
}},



{ name:'tipToTube2',
    '0%':{
        left: '89%',
        top: '57.6%',
},
    '10%':{
        left: '89%',
        top: '50.6%',
},
    '85%':{
        left: '37.1%',
        top: '57.6%',
},
    '90%':{
        left: '34.1%',
        top: '54.2%',
},
    '100%':{
        left: '34.1%',
        top: '61.5%',
}},



{ name:'pipetToTube2',
    '0%':{
        left: '86.4%',
        top: '35%',
},
    '10%':{
        left: '86.4%',
        top: '28%',
},
    '85%':{
        left: '34.5%',
        top: '35%'
},
    '90%':{
        left: '31.5%',
        top: '31.7%',
},
    '100%':{
        left: '31.5%',
        top: '39%',
}},



{ name:'tipToTube3',
    '0%':{
        left: '89%',
        top: '57.6%',
},
    '10%':{
        left: '89%',
        top: '50.6%',
},
    '85%':{
        left: '37.1%',
        top: '57.6%',
},
    '90%':{
        left: '34.1%',
        top: '54.2%',
},
    '100%':{
        left: '34.1%',
        top: '61.5%',
}},



{ name:'pipetToTube3',
    '0%':{
        left: '86.4%',
        top: '35%',
},
    '10%':{
        left: '86.4%',
        top: '28%',
},
    '85%':{
        left: '34.5%',
        top: '35%'
},
    '90%':{
        left: '31.5%',
        top: '31.7%',
},
    '100%':{
        left: '31.5%',
        top: '39%',
}},



{ name:'tipToTube4',
    '0%':{
        left: '89%',
        top: '57.6%',
},
    '10%':{
        left: '89%',
        top: '50.6%',
},
    '85%':{
        left: '37.1%',
        top: '57.6%',
},
    '90%':{
        left: '34.1%',
        top: '54.2%',
},
    '100%':{
        left: '34.1%',
        top: '61.5%',
}},



{ name:'pipetToTube4',
    '0%':{
        left: '86.4%',
        top: '35%',
},
    '10%':{
        left: '86.4%',
        top: '28%',
},
    '85%':{
        left: '34.5%',
        top: '35%'
},
    '90%':{
        left: '31.5%',
        top: '31.7%',
},
    '100%':{
        left: '31.5%',
        top: '39%',
}},



{ name:'tipToTube5',
    '0%':{
        left: '89%',
        top: '57.6%',
},
    '10%':{
        left: '89%',
        top: '50.6%',
},
    '85%':{
        left: '37.1%',
        top: '57.6%',
},
    '90%':{
        left: '34.1%',
        top: '54.2%',
},
    '100%':{
        left: '34.1%',
        top: '61.5%',
}},



{ name:'pipetToTube5',
    '0%':{
        left: '86.4%',
        top: '35%',
},
    '10%':{
        left: '86.4%',
        top: '28%',
},
    '85%':{
        left: '34.5%',
        top: '35%'
},
    '90%':{
        left: '31.5%',
        top: '31.7%',
},
    '100%':{
        left: '31.5%',
        top: '39%',
}},



{ name:'tipToTube6',
    '0%':{
        left: '89%',
        top: '57.6%',
},
    '10%':{
        left: '89%',
        top: '50.6%',
},
    '85%':{
        left: '37.1%',
        top: '57.6%',
},
    '90%':{
        left: '34.1%',
        top: '54.2%',
},
    '100%':{
        left: '34.1%',
        top: '61.5%',
}},



{ name:'pipetToTube6',
    '0%':{
        left: '86.4%',
        top: '35%',
},
    '10%':{
        left: '86.4%',
        top: '28%',
},
    '85%':{
        left: '34.5%',
        top: '35%'
},
    '90%':{
        left: '31.5%',
        top: '31.7%',
},
    '100%':{
        left: '31.5%',
        top: '39%',
}},



{ name:'moveBlock',
    '0%':{
        left: '35.72%',
        top: '73.4%',

},
    '100%':{
        left: '30.72%',
        top: '57%',
}},



{ name:'tube0ToBath',
    '0%':{
        left: '35.72%',
        top: '71.9%',
},
    '100%':{
        left: '30.72%',
        top: '55%',
}},



{ name:'tube1ToBath',
    '0%':{
        left: '38%',
        top: '71.9%',
},
    '100%':{
        left: '33.5%',
        top: '55%',
}},



{ name:'tube2ToBath',
    '0%':{
        left: '40.5%',
        top: '71.9%',
},
    '100%':{
        left: '36.3%',
        top: '55%',
}},



{ name:'tube3ToBath',
    '0%':{
        left: '43%',
        top: '71.9%',
},
    '100%':{
        left: '39%',
        top: '55%',
}},



{ name:'tube4ToBath',
    '0%':{
        left: '45.5%',
        top: '71.9%',
},
    '100%':{
        left: '41.7%',
        top: '55%',
}},



{ name:'tube5ToBath',
    '0%':{
        left: '48%',
        top: '71.9%',
},
    '100%':{
        left: '44.4%',
        top: '55%',
}},



{ name:'oscillate',
    '0%':{
        left: '22%',
        top: '58.7%',
},
    '50%':{
        left: '22%',
        top: '57%',
},
    '100%':{
        left: '22%',
        top: '58.7%',
}},



{ name:'oscillate1',
    '0%':{
        left: '89%',
        top: '52%',
},
    '50%':{
        left: '89%',
        top: '54.5%',
},
    '100%':{
        left: '89%',
        top: '52%',
}},



{ name:'oscillate2',
    '0%':{
        left: '12%',
        top: '12%',
},
    '50%':{
        left: '12%',
        top: '14%',
},
    '100%':{
        left: '12%',
        top: '12%',
}},



{ name:'oscillate3',
    '0%':{
        left: '3.4%',
        top: '12%',
},
    '50%':{
        left: '3.4%',
        top: '14%',
},
    '100%':{
        left: '3.4%',
        top: '12%',
}},



{ name:'pressTube0',
    '0%': {
        left: '30.72%',
        top: '55%',
},
    '100%':{
        left: '30.72%',
        top: '56.5%',
}},



{ name:'pressTube1',
    '0%': {
        left: '33.5%',
        top: '55%',
},
    '100%':{
        left: '33.5%',
        top: '56.5%',
}},



{ name:'pressTube2',
    '0%': {
        left: '36.3%',
        top: '55%',
},
    '100%':{
        left: '36.3%',
        top: '56.5%',
}},



{ name:'pressTube3',
    '0%': {
        left: '39%',
        top: '55%',
},
    '100%':{
        left: '39%',
        top: '56.5%',
}},



{ name:'pressTube4',
    '0%': {
        left: '41.7%',
        top: '55%',
},
    '100%':{
        left: '41.7%',
        top: '56.5%',
}},



{ name:'pressTube5',
    '0%': {
        left: '44.4%',
        top: '55%',
},
    '100%':{
        left: '44.4%',
        top: '56.5%',
}},



{ name:'insertRack',
    '0%':{
        left: '30.72%',
        top: '57%',
},
    '70%':{
        left: '50%',
        top: '17%',

},
    '80%':{
        left: '60%',
        top: '17%',

},
    '100%':{
        left: '60%',
        top: '28%',


}},



{ name:'insertTube0',
    '0%':{
        left: '30.72%',
        top: '56.5%',
},
    '70%':{
        left: '50%',
        top: '17%',

},
    '80%':{
        left: '60%',
        top: '17%',
},
    '100%':{
        left: '60%',
        top: '28%',

}},



{ name:'insertTube1',
    '0%':{
        left: '33.5%',
        top: '56.5%',
},
    '70%':{
        left: '52.78%',
        top: '17%',

},
    '80%':{
        left: '62.78%',
        top: '17%',
},
    '100%':{
        left: '62.78%',
        top: '28%',

}},



{ name:'insertTube2',
    '0%':{
        left: '36.3%',
        top: '56.5%',
},
    '70%':{
        left: '55.56%',
        top: '17%',

},
    '80%':{
        left: '65.56%',
        top: '17%',
},
    '100%':{
        left: '65.56%',
        top: '28%',

}},



{ name:'insertTube3',
    '0%':{
        left: '38.8%',
        top: '56.5%',
},
    '70%':{
        left: '58%',
        top: '17%',

},
    '80%':{
        left: '68%',
        top: '17%',
},
    '100%':{
        left: '68%',
        top: '28%',

}},



{ name:'insertTube4',
    '0%':{
        left: '41.3%',
        top: '56.5%',
},
    '70%':{
        left: '61.5%',
        top: '17%',

},
    '80%':{
        left: '71.5%',
        top: '17%',
},
    '100%':{
        left: '71.5%',
        top: '28%',

}},



{ name:'insertTube5',
    '0%':{
        left: '44.4%',
        top: '56.5%',
},
    '70%':{
        left: '63%',
        top: '17%',

},
    '80%':{
        left: '73%',
        top: '17%',
},
    '100%':{
        left: '73%',
        top: '28%',

}},



{ name:'tipVisible',
    '0%': {
        visibility: 'hidden'
},
    '100%':{
        visibility: 'visible'
}},



{ name:'tipHidden',
    '0%': {
        visibility: 'visible'
},
    '100%':{
        visibility: 'hidden'
}},

{ name:'oscillate4',
    '0%':{
        left: '36.6%',
        top: '62%'
},
    '50%':{
        left: '36.6%',
        top: '64%'
},
    '100%':{
        left: '36.6%',
        top: '62%'
}},

{ name:'oscillate6',
    '0%':{
        left: '36.6%',
        top: '62%'
},
    '50%':{
        left: '36.6%',
        top: '64%'
},
    '100%':{
        left: '36.6%',
        top: '62%'
}},


{ name:'rotateCap',
    '0%': {
        transform:'rotate(0deg)'
},
    '100%':{
        transform:'rotate(-135deg)'
}},



{ name:'quickFadeIn',
    '0%':{
        opacity: 0
},
    '100%':{
        opacity: 1
}},
{ name:'slowFadeIn',
    '0%':{
        opacity: 0
},
    '100%':{
        opacity: 1
}},


{ name:'quickFadeOut',
    '0%':{
        opacity: 1
},
    '100%':{
        opacity: 0
}},

{ name:'slowFadeOut',
    '0%':{
        opacity: 1
},
    '100%':{
        opacity: 0
}},

{ name:'removeComb',
    '0%':{
        top: '71%',
},
    '90%':{
        top: '66%',
        opacity: 1
},
    '100%':{
        top: '66%',
        opacity: 0
}},
















{ name:'placeItem',
    '0%':{
        visibility: 'hidden'
},
    '100%':{
        visibility: 'visible'
}},



{ name:'pourStain',
    '0%':{
        transform:'rotate(0deg)',
},
    '60%':{
        transform:'rotate(105deg)'
},
    '95%':{
},
    '100%':{
        transform:'rotate(105deg)'
}},
{ name:'pourStainRev',
    '0%':{
        transform:'rotate(105deg)',
},
    '60%':{
        transform:'rotate(0deg)'
},
    '95%':{
},
    '100%':{
        transform:'rotate(0deg)'
}},

/*Step 1 & 2*/
{ name:'moveEnz',
    '0%': {
        top: '64.7%'
},
    '100%':{
        top: '60%'
}},


{ name:'moveEnzBack',
        '0%':{
        top: '60%'
},'100%': {
    top: '64.7%'
}},



{ name:'hideTip1',
    '0%':{
        opacity: 1,

},
    '47%':{
        opacity: 1,

},
    '100%':{
        opacity: 0,

}},
{ name:'hideTipp1',
    '0%':{
        opacity: 1,

},
    '47%':{
        opacity: 1,

},
    '100%':{
        opacity: 0,

}},
]
for (i of keyframes){

$.keyframe.define(i);

}


function findKeyFrameDef(defName){
  console.log(defName)
return  keyframes.find(function(element){
    return element.name==defName;
  })["100%"]
}
