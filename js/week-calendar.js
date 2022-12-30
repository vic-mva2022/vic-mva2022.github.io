function generate_year_range(start, end) {
    var years = "";
    for (var year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
}

today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
currentDate = today.getDate()
currentWeekDay = today.getDay() // gives int 0-6 (0 for sunday, 6 for saturday)
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");
selectDate = document.getElementById("date");
selectWeekday = document.getElementById("weekday");


createYear = generate_year_range(1970, 2050);
/** or
 * createYear = generate_year_range( 1970, currentYear );
 */

document.getElementById("year").innerHTML = createYear;

var calendar = document.getElementById("week-calendar");
var lang = calendar.getAttribute('data-lang');

var months = "";
var days = "";

var monthDefault = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var dayDefault = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

if (lang == "en") {
    months = monthDefault;
    days = dayDefault;
} else if (lang == "id") {
    months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    days = ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
} else if (lang == "fr") {
    months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
} else {
    months = monthDefault;
    days = dayDefault;
}


var $dataHead = "<tr style='color:#7D8994;font-size:15px;font-weight: bold;font-family:sans-serif;line-height: 1.6;'>";
for (dhead in days) {
    $dataHead += "<th data-days='" + days[dhead] + "'>"  + days[dhead] +  "</th>";
}
$dataHead += "</tr>";

//alert($dataHead);
document.getElementById("thead-month").innerHTML = $dataHead;


monthAndYear = document.getElementById("monthAndYear");
showWeekCalendar(currentMonth, currentYear, currentDate, currentWeekDay);



function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showWeekCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showWeekCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showWeekCalendar(currentMonth, currentYear);
}


function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function daysInWeek(iMonth, iYear) {
    return 7 - new Date(iYear, iMonth, 7).getDate();
}


function showWeekCalendar(month, year, date, weekday) {

    var firstDay = ( new Date( year, month ) ).getDay();

    tbl = document.getElementById("week-calendar-body");

    
    tbl.innerHTML = "";

    
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells for a week
    //var date = 1;
    var row = document.createElement("tr");

        
    for ( var j = 0; j < 7; j++ ) {
        if (date > daysInMonth(month, year)) {
            break;
        } else {
            cell = document.createElement("td");
            cell.setAttribute("data-date", date - weekday + j);
            cell.setAttribute("data-month", month + 1);
            cell.setAttribute("data-year", year);
            cell.setAttribute("data-month_name", months[month]);
            cell.className = "date-picker";
            cell.innerHTML = "<span>" + date - weekday + j + "</span>";

            if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                cell.className = "date-picker selected";
            }
            row.appendChild(cell);
            date++;
        }


    }
        tbl.appendChild(row);
}
