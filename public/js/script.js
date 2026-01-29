document.addEventListener('DOMContentLoaded', function() {
    const pswdBtn = document.querySelector("#pswdBtn");
    if (pswdBtn) {
        pswdBtn.addEventListener("click", function() {
            const pswdInput = document.querySelector("#account_password");
            const type = pswdInput.getAttribute("type");
            if (type == "password") {
                pswdInput.setAttribute("type", "text");
                pswdBtn.innerHTML = "🙈";
            } else {
                pswdInput.setAttribute("type", "password");
                pswdBtn.innerHTML = "👁";
            }
        });
    }
});