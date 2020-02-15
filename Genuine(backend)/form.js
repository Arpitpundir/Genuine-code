document.getElementById("form").addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('pass').value;
        const address = document.getElementById('add').value
        const phone = document.getElementById('phone').value
        console.log(name, email, password, address, phone);
        const res = axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/manufacturer/',
            data: {
                name,
                email,
                password,
                address,
                phone
            }
        });
        if (res.data.status === 'success') {

            showAlert('success', "Signed in sucessfully");
            window.setTimeout(() => {
                location.assign('/');
                //go back to home page
            }, 1500);
        }
    } );