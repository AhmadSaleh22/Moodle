function signUpVal() {

    name = document.forms['signUp']['name'].value;
    email = document.forms['signUp']['email'].value;
    pass = document.forms['signUp']['password'].value;
    pass2 = document.forms['signUp']['pass2'].value;
    pre = document.forms['signUp']['pre'].value;

    valid = document.getElementById('valid');

    if (name == '' || name == null) {
        valid.innerHTML = "<h6 class='alert alert-danger'>Name is Required</h6>";
        return false;
    } else if (!isNaN(name)) {
        valid.innerHTML = "<h6 class='alert alert-danger'>Name is string</h6>";
        return false;
    } if (email == '' || email == null) {
        valid.innerHTML = "<h6 class='alert alert-danger'>Email is Required</h6>";
        return false;
    } else if (pass.length > 8) {
        valid.innerHTML = "<h6 class='alert alert-danger'>Please enter 8 charachter or Less</h6>";
        return false;
    } else if (pass !== pass2) {
        valid.innerHTML = "<h6 class='alert alert-danger'>Password dosent match</h6>";
        return false;
    } else if (pass == '' || pass == null) {
        valid.innerHTML = "<h6 class='alert alert-danger'>Password is Required</h6>";
        return false;
    } else {
        valid.innerHTML = "<h6 class='alert alert-success'>registration done successfully</h6>";
        return false;
    }

    return true;
}


var users = [
    { username: "Mohammed_ahmed", password: "123456", permeation: "std" },
    { username: "Omar_ali", password: "258852", permeation: "iug" }
]

function getInfo() {
    username = document.forms['login']['username'].value;
    password = document.forms['login']['password'].value;

    var pre = username.split('@');
    var vali = document.getElementById('val');

    login = true;
    for (i = 0; i < users.length; i++) {
        if (pre[0] == users[i].username && password == users[i].password) {
            login = false;
        }
    }

    var preName = pre[0].split('_');

    if (login == false) {
        if (pre[1] == "std") {
            window.location.href = "/folders/student.html";
            return false;
        } else if (pre[1] == "iug") {
            window.location.href = "folders/techer.html";
            return false;
        } else {
            vali.innerHTML = "<h6 class='alert alert-danger'>Sorry , there is not user in this permeation</h6>";
            return false;
        }
    } else {
        vali.innerHTML = "<h6 class='alert alert-danger'>Sorry , check username or password</h6>";
        return false;
    }

    return true;
}


function addNew() {

    var validation = document.getElementById('validation');

    degree = JSON.parse(localStorage.getItem(i));
    deg = document.getElementById('deg').value;
    hou = document.getElementById('hou').value;

    if (deg !== '' && deg !== null) {
        if (localStorage.length < 4) {
            key = localStorage.length;

            degrees = {
                key: key,
                deg: deg,
                hou: hou
            }

            localStorage.setItem(key, JSON.stringify(degrees));

            location.reload();
        } else {
            validation.innerHTML = '<h6 class="alert alert-danger">Sorry you can not calculate more than 4 courses</h6>';
        }
    } else {
        validation.innerHTML = '<h6 class="alert alert-danger">Please check the degree input</h6>';
    }



}

function getDegrees() {
    table = document.getElementById('degress');
    for (i = 0; i < localStorage.length; i++) {
        degree = JSON.parse(localStorage.getItem(i));
        row = table.insertRow(-1);
        row.insertCell(0).innerHTML = degree.key;
        row.insertCell(1).innerHTML = degree.deg;
        row.insertCell(2).innerHTML = degree.hou;
    }
}
function cal() {
    var degrs = document.getElementById('degrees');

    dg = 0; 
    hrs = 0;
    for (i = 0; i < localStorage.length; i++) {
        degree = JSON.parse(localStorage.getItem(i));

        dg += parseInt(degree.deg * degree.hou);
        hrs += parseInt(degree.hou);
        degrs.innerHTML = '<h6 class="alert alert-success">The Avarage is : ' + dg / hrs + '</h6>';
    }

    return false;

}

function addCourse() {
    name = document.getElementById('name').value;
    tech = document.getElementById('tech').value;
    num = document.getElementById('num').value;
    bio = document.getElementById('bio').value;
    key = localStorage.length;

    course = {
        key: key,
        name: name,
        tech: tech,
        num: num,
        bio: bio
    }

    localStorage.setItem(key, JSON.stringify(course));

}

function getCourses() {
    table = document.getElementById('courses');
    for (i = 0; i < localStorage.length; i++) {
        course = JSON.parse(localStorage.getItem(i));
        row = table.insertRow(-1);
        row.insertCell(0).innerHTML = course.key;
        row.insertCell(1).innerHTML = course.name;
        row.insertCell(2).innerHTML = course.tech;
        row.insertCell(3).innerHTML = course.num;
        row.insertCell(4).innerHTML = course.bio;
        row.insertCell(5).innerHTML = '<td><a onclick="editCourse(this)" class="btn btn-info text-white"><i class="fa fa-edit"></i></a> <a onclick="deleteCourse(this)" class="btn btn-danger text-white"><i class="fa fa-trash-alt"></i></a></td>';
    }
}


function deleteCourse(obj) {
    row = obj.parentElement.parentElement;
    localStorage.removeItem(row.children[0].innerHTML);
    row.remove();
}

function editCourse(obj) {

    row = obj.parentElement.parentElement;
    key = row.children[0].innerHTML;

    name = row.children[1].innerHTML;
    row.children[1].innerHTML = '<input class="form-control" type="text" value="' + name + '" />';

    tech = row.children[2].innerHTML;
    row.children[2].innerHTML = '<input class="form-control" type="text" value="' + tech + '" />';

    hours = row.children[3].innerHTML;
    row.children[3].innerHTML = '<input class="form-control" type="number" value="' + hours + '" />';

    txArea = row.children[4].innerHTML;
    row.children[4].innerHTML = '<textarea class="form-control" type="text">' + txArea + '</textarea>';

    row.children[5].innerHTML = '<input class="form-control btn btn-success" type="submit" onclick="saveCourse(this)" value="save" />';

}

function saveCourse(obj) {
    row = obj.parentElement.parentElement;
    key = row.children[0].innerHTML;
    cName = row.children[1].children[0].value;
    tName = row.children[2].children[0].value;
    hours = row.children[3].children[0].value;
    bio = row.children[4].children[0].value;

    course = {
        key: key,
        name: cName,
        tech: tName,
        num: hours,
        bio: bio
    }

    localStorage.setItem(key, JSON.stringify(course));

    name = row.children[1].innerHTML;
    row.children[1].innerHTML = course.name;

    tech = row.children[2].innerHTML;
    row.children[2].innerHTML = course.tech;

    hours = row.children[3].innerHTML;
    row.children[3].innerHTML = course.num;

    txArea = row.children[4].innerHTML;
    row.children[4].innerHTML = course.bio;

    row.children[5].innerHTML = '<td><a onclick="editCourse(this)" class="btn btn-info text-white"><i class="fa fa-edit"></i></a> <a onclick="deleteCourse(this)" class="btn btn-danger text-white"><i class="fa fa-trash-alt"></i></a></td>';

}

