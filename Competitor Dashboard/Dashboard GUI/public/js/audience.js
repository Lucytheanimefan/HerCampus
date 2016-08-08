var colors = ["#6640CC ", "#FF0066", "#FCBD12", "#00D2C1"]
var aquablue = d3.rgb(0, 214, 194);
var hotpink = d3.rgb(255, 0, 102);
var indigo = d3.rgb(102, 64, 204);



//------------------------------Newsletter-------------------------
function addSubscribers(numSubs) {
    var newsletter = document.getElementById('newletterSubscribers');
    var sub_count = document.createElement('span');
    sub_count.innerHTML = numSubs.toString() + " SUBSCRIBERS";
    newsletter.appendChild(sub_count);
}

addSubscribers(localStorage.getItem("numSubs"));

//------------------------------MONTHLY UNIQUES/PAGEVIEW-------------------------
var newData = [{
    "interest_rate": "HC.COM",
    "Facebook": 500,
    "Twitter": 100,
    "Pinterest": 66,
    "Instagram": 20
}, {
    "interest_rate": "TEEN VOGUE",
    "Facebook": 300,
    "Twitter": 150,
    "Pinterest": 206,
    "Instagram": 60
}];



var dataset = [{
    data: [{
        month: 'May Uniques',
        count: 123
    }, {
        month: 'May Pageviews',
        count: 234
    }],
    name: 'Her Campus'
}, {
    data: [{
        month: 'May Uniques',
        count: 235
    }, {
        month: 'May Pageviews',
        count: 267
    }],
    name: 'InfluenceHer Collective'
}, {
    data: [{
        month: 'May Uniques',
        count: 235
    }, {
        month: 'May Pageviews',
        count: 267
    }],
    name: 'BetchesLoveThis.com'
}];

var chart = c3.generate({
    bindto: '#monthlyUniquesdiv',
    data: {
        x: 'x',
        columns: [
            ['x', 'Uniques', 'Pageviews'],
            ['Her Campus', 30, 200],
            ['InfluenceHer Collective', 90, 100],
            ['BetchesLoveThis.com', 50, 120]
        ],
        groups: [
            ['Her Campus', 'InfluenceHer Collective', 'BetchesLoveThis.com']
        ],
        colors: {
            'Her Campus': '#FF0066',
            'InfluenceHer Collective': '#00D6C2',
            'BetchesLoveThis.com': '#6640CC',

        },
        type: 'bar'
    },
    axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    }
});

//------------------------------SOCIAL MEDIA REACH-------------------------------

var chart = c3.generate({
    bindto: "#socialmediareach",
    data: {
        x: 'x',
        columns: [
            ['x', 'INFLUENCEHER', 'BETCHES', 'NATIONAL', 'CHAPTERS'],
            ['Facebook', 30, 200, 200, 400],
            ['Twitter', 130, 100, 100, 200],
            ['Instagram', 230, 200, 200, 300],
            ['Pinterest', 30, 100, 150, 230],
            ['YouTube', 230, 90, 200, 300],
            ['Tumblr', 130, 70, 500, 300],
        ],
        type: 'bar',
        groups: [
            ['Facebook']
        ],
        colors: {
            Facebook: '#FF0066',
            Twitter: '#00D6C2',
            Instagram: '#6640CC',
            Pinterest: '#FCBD12',
            YouTube: '#B5E136',
            Tumblr: '#B2167E'
        },
    },
    axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    },
    grid: {
        y: {
            lines: [{ value: 0 }]
        }
    }
});


setTimeout(function() {
    chart.groups([
        ['Facebook', 'Twitter']
    ])
}, 500);

setTimeout(function() {
    chart.groups([
        ['Facebook', 'Twitter', 'Instagram']
    ])
}, 1000);

setTimeout(function() {
    chart.groups([
        ['Facebook', 'Twitter', 'Instagram', 'Pinterest']
    ])
}, 1500);

setTimeout(function() {
    chart.groups([
        ['Facebook', 'Twitter', 'Instagram', 'Pinterest', 'YouTube']
    ])
}, 2000);

setTimeout(function() {
    chart.groups([
        ['Facebook', 'Twitter', 'Instagram', 'Pinterest', 'YouTube', 'Tumblr']
    ])
}, 2500);

setTimeout(function() {
    chart.load({
        columns: [
            ["B'", 50, 200, 200, 60]
        ]
    });
}, 3000);

setTimeout(function() {
    chart.groups([
        ['Facebook', 'Twitter', 'Instagram', 'Pinterest', 'YouTube', 'Tumblr', "B'"]
    ])
}, 3500);


/*--------------------------Site traffic----------------*/

function setSitetraffic(mobileP, desktopP, tabletP) {
    var mobile = document.getElementById('mobilePercent');
    mobile.innerHTML = "<span>MOBILE: " + mobileP + "%<br></span>" + mobile.innerHTML;
    var desktop = document.getElementById('desktopPercent');
    desktop.innerHTML = "<span>DESKTOP: " + desktopP + "%<br></span>" + desktop.innerHTML;
    var tablet = document.getElementById('tabletPercent');
    tablet.innerHTML = "<span>TABLET: " + tabletP + "%<br></span>" + tablet.innerHTML;
}

setSitetraffic(localStorage.getItem("deviceData[0]"), localStorage.getItem("deviceData[1]"), localStorage.getItem("deviceData[2]"));

/*----------------set total audience----------------------*/
 $("#audienceCount").html(localStorage.getItem("totalAudience"));

/*---------------hamburger menu-----------------*/
$("#submit").click(function(e) {
    console.log("Clicked");

    var deviceData = [];
    var siteTrafficData = $("#siteTrafficPerc").val();
    console.log(siteTrafficData);
    if (siteTrafficData != "") {
        var siteTrafficData = siteTrafficData.split(',');

        for (var i = 0; i < siteTrafficData.length; i++) {
            deviceData[i] = parseInt(siteTrafficData[i]);
            localStorage.setItem("deviceData[" + i.toString() + "]", deviceData[i]);
        }
    }
    console.log(deviceData);


    var numSubs = parseInt($("#newsletterSubs").val());
    if (numSubs != "") {
        localStorage.setItem("numSubs", numSubs);
    }

    var totalAudience = $("#totalAudience").val();
    if (totalAudience != "") {
        localStorage.setItem("totalAudience", totalAudience);
    }


    $(".devices span").empty();
    $("#newletterSubscribers span").empty();
    $("#audienceCount").empty();

    setSitetraffic(localStorage.getItem("deviceData[0]"), localStorage.getItem("deviceData[1]"), localStorage.getItem("deviceData[2]"));
    addSubscribers(localStorage.getItem("numSubs"));

     $("#audienceCount").html(localStorage.getItem("totalAudience"));


    e.preventDefault();

})