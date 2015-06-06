//Переменные для дивов
{
//Текста
    {
        var home_info =
            "<h3>Greetings on the web site of 'Save Your Time' android application!</h3>";
        var info_info =
            "<h3>Here you can know more about the project.</h3>" +
            "<p>Android application for planning personal time with the web interface.</p> " +
            "<p>Every man there comes a time when he feels the need to understand whether he spends his time as appropriate, " +
            "and may need to change something in his schedule for that would make it a goal to change something in his live. " +
            "Actually for this and there is this application. Time scheduler allows you to not only ask what is your desired schedule, " +
            "but also to analyze and statistics based on the data collected." +
            "The user enters the data amount of time he spent on the work, " +
            "study, recreation, entertainment, etc. for week statistics are collected what he was doing.</p> " +
            "<p>You can just follow the changes in the schedule, and like to correct it. " +
            "And you can set your own 'perfect' schedule, as people would like to spend a day, a week, " +
            "and on the basis of this chart application will inform the user on how close it is to its goal by silent-tips, " +
            "which will show information on how much user has deviated from the his 'ideal' graph, " +
            "or what business should have been given more time to achieve its goal by the user.</p> " +
            "<p>Also in the application has the ability to estimate the time spent by so-called 'emotional pictures' such as people went to the cinema, " +
            "circus, theater, and he liked it, it can be noted in the application that he liked it, respectively, " +
            "and it will be stored and subsequently if the person wants to do something than it will be shown a list of 'preferences'. " +
            "These lists are created separately by category, depending on the desires of the user. " +
            "If he wants to relax (sauna, massage, yoga), entertain (soccer, tennis, racing, hiking), " +
            "to celebrate anything (like a restaurant, cafe, dining room), etc. </p>";
        var download_info =
            "<h3>Download SVT on your phone!</h3>" +
            "<dl class='dl-horizontal'>" +
            "<dt>Name :</dt>" +
            "<dd>SVT(SaveYourTime application)</dd>" +
            "<dt>Latest version :</dt>" +
            "<dd>0.0.0</dd>" +
            "<dt>Google app link :</dt>" +
            "<dd><a href='#'>download latest version</a></dd>" +
            "</dl>";
    }
//Заполнение формы для регистрации
    {
        var registration_form =
            "<input id='login_1' type='text' class='input-block-level' placeholder='Login'><br><br>" +
            "<input id='password_1' type='password' class='input-block-level' placeholder='Password'><br><br>" +
            "<input id='password_2' type='password' class='input-block-level' placeholder='Retype password'><br><br>" +
            "<input id='mail' type='text' class='input-block-level' placeholder='e-mail'>";

        var btn4reg =
            '<button type="button" onclick="change_module_form_to_login()" class="btn btn-default" >Log In form</button>' +
            '<button type="submit" onclick="register()" class="btn btn-primary">Register</button>';
    }
//Заполнение формы для логина
    {
        var login_form =
            '<input id="login" type="text" class="input-block-level" placeholder="Login"><br><br>'+
            '<input id="password" type="password" class="input-block-level" placeholder="Password">'+
            '<label class="checkbox" style="margin-left: 20px;">'+
            '<input type="checkbox" value="remember-me"> Remember me</label>';

        var btn4login =
            '<button type="button" onclick="change_module_form_to_reg()" class="btn btn-default" >Registration form</button>'+
            '<button type="submit" onclick="login()" class="btn btn-primary">Log in</button>';
    }
//Таблица
    {
        var table = "";
        var actTable = "";
    }
//Профиль
    var profile="";
}
//работа с куками
{
    function set_cookie(name, value, exp_y, exp_m, exp_d, path, domain, secure) {
        var cookie_string = name + "=" + escape(value);

        if (exp_y) {
            var expires = new Date(exp_y, exp_m, exp_d);
            cookie_string += "; expires=" + expires.toGMTString();
        }

        if (path)
            cookie_string += "; path=" + escape(path);

        if (domain)
            cookie_string += "; domain=" + escape(domain);

        if (secure)
            cookie_string += "; secure";

        document.cookie = cookie_string;
    }

    function delete_cookie(cookie_name) {
        var cookie_date = new Date();  // Текущая дата и время
        cookie_date.setTime(cookie_date.getTime() - 1);
        document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
    }

    function get_cookie(cookie_name) {
        var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

        if (results)
            return ( unescape(results[2]) );
        else
            return null;
    }
}
//отображение html элементов
{
function ifOnline(){
    document.getElementById('login_modal').style.display = 'none';
    document.getElementById('login_indicator').style.display = 'block';
    document.getElementById('cabinet').style.display = 'block';
}

function change_module_form_to_reg(){
    document.getElementById('sign_form').innerHTML = registration_form;
    document.getElementById('button_sign_form').innerHTML = btn4reg;
}
function change_module_form_to_login(){
    document.getElementById('sign_form').innerHTML = login_form;
    document.getElementById('button_sign_form').innerHTML = btn4login;
}
}

function get_statistic(){
    document.getElementById('content').innerHTML =
        '<div id="profile_info"></div>'+
        '<div id="cat_table"></div>'+
        '<div id="act_table"></div>';
    document.getElementById('profile_info').innerHTML = "";
    var client = new XMLHttpRequest();
    var result = "";
    client.open('POST', 'http://127.0.0.1:1338/get_user_statistic', false);
    client.onload = function () {
        result = JSON.parse(this.responseText);
    }
    client.onerror = function () {
        alert('Сервер недоступен. Код ошибки :' + this.status);
    }
    client.send('{"token":"'+get_cookie('token')+'"}');

    table =
        "<table class='table table-hover'><caption>Your Category Statistic Sheet.</caption><thead>"+
        "<tr><th>№</th><th>Category</th><th>Total time spent</th></tr></thead><tbody>";
    for(var i=0;i<result.length;i++){
        table=table+
            "<tr id ='"+result[i]['category_name']+"' onclick='tr_onclick(this)'>"+
            "<th scope='raw' >"+(i+1)+"</th>"+
            "<td>"+result[i]['category_name']+"</td>"+
            "<td>"+result[i]['category_time']+"</td>"+
            "</tr>";
    }
    table = table+"</tbody></table>";
    document.getElementById('cat_table').innerHTML = table;
}

function tr_onclick(el){
    var client = new XMLHttpRequest();
    var result = "";
    client.open('POST', 'http://127.0.0.1:1338/get_user_act_statistic', false);
    client.onload = function () {
        result = JSON.parse(this.responseText);
        console.log(result);
    }
    client.onerror = function () {
        alert('Сервер недоступен. Код ошибки :' + this.status);
    }
    client.send('{"token":"'+get_cookie('token')+'","category":"'+el.id+'"}');

        actTable =
            "<table class='table table-hover'><caption>Your Activity Statistic Sheet.</caption><thead>" +
            "<tr><th>№</th><th>Activity</th><th>Time spent</th><th>Emotion(1:like/0:dislike)</th></tr></thead><tbody>";
        for (var i = 0; i < result.length; i++) {
            actTable = actTable +
                "<tr id ='" + result[i]['activity_name'] + "'>" +
                "<th scope='raw' >" + (i + 1) + "</th>" +
                "<td>" + result[i]['activity_name'] + "</td>" +
                "<td>" + result[i]['activity_time'] + "</td>" +
                "<td>" + result[i]['emotion'] + "</td>" +
                "</tr>";
        }
        actTable =actTable + "</tbody></table>";
        document.getElementById('act_table').innerHTML = actTable;

}

function login(){
    var login = document.getElementById('login').value;
    var password =document.getElementById('password').value;
    var client = new XMLHttpRequest();
    client.open('POST', 'http://127.0.0.1:1338/get_user_info', true);
    client.onload = function () {
        var token = JSON.parse(this.responseText)[0]['token'];
        set_cookie("token",token,2015,10,25);
        set_cookie("login",login,2015,10,25);
        ifOnline();
    }
    client.onerror = function () {
        alert('Сервер недоступен. Код ошибки :' + this.status);
    }
    client.send('{"login":"'+login+'","password":"'+password+'"}');
}

function register(){
    if(document.getElementById('password_1').value == document.getElementById('password_2').value) {
        var client = new XMLHttpRequest();
        client.open('POST', 'http://127.0.0.1:1338/registration', true);
        client.onload = function () {
            alert("Congratulation you now registered user.Please Log In!!!");
        }
        client.onerror = function () {
            console.log('Ошибка :' + this.status);
        }
        client.send('{"login":"' + document.getElementById('login_1').value + '","password":"' + document.getElementById('password_2').value + '","e-mail":"'+document.getElementById('mail').value+'"}');
    }
}

function get_user_info(){
    document.getElementById('content').innerHTML =
        '<div id="profile_info"></div>'+
        '<div id="cat_table"></div>'+
        '<div id="act_table"></div>';
    document.getElementById('cat_table').innerHTML = "";
    document.getElementById('act_table').innerHTML = "";
    var client = new XMLHttpRequest();
    var result = "";
    client.open('POST', 'http://127.0.0.1:1338/get_user_profile', false);
    client.onload = function () {
        result = JSON.parse(this.responseText);
        console.log(result);
    }
    client.onerror = function () {
        alert('Сервер недоступен. Код ошибки :' + this.status);
    }
    client.send('{"token":"'+get_cookie('token')+'"}');

    profile =
        '<input type="text" class="form-control" id="p_login" placeholder="'+result[0]['login']+'"><br>'+
        '<input type="text" class="form-control" id="p_e-mail" placeholder="'+result[0]['e_mail']+'"><br>'+
        '<button type="submit" onclick="submit_changes()" class="btn btn-primary">Submit changes</button>';
    document.getElementById('profile_info').style.width = "300px";
    document.getElementById('profile_info').innerHTML = profile;
}

window.onload = function(){
    var existed_token = get_cookie("token");
    var existed_login = get_cookie("login");
    var client = new XMLHttpRequest();
    client.open('POST', 'http://127.0.0.1:1338/verify_token', true);
    client.onload = function () {
        var token = JSON.parse(this.responseText)[0]['token'];
        if(existed_token==token)
            ifOnline();
    }
    client.onerror = function () {
        console.log('Ошибка :' + this.status);
    }
    client.send('{"login":"'+existed_login+'"}');
}