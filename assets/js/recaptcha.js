
document.getElementById("fliptree=partners-contact-us-form").addEventListener("submit", (e) => {
    e.preventDefault()
    grecaptcha.enterprise.ready(async () => {
        const token = await grecaptcha.enterprise.execute('6LcBVZcnAAAAAGUXKt4mWa6fPlZYNjmBx9PmBsKg', { action: 'LOGIN' });
        var formData = new FormData(document.getElementById("fliptree=partners-contact-us-form"))

        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const phone = document.getElementById("phone").value
        const message = document.getElementById("message").value

        if (token) {

            const data = {
                name,
                email,
                subject,
                message,
                phone,
                token
            }

            //comment1

            fetch(`https://${window.location.hostname}/flip-api/flp`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((res) => {
                if (res.status == 200) {
                    document.getElementById("fliptree=partners-contact-us-form").reset()
                    document.getElementById("fliptree=partners-contact-us-form").disabled()
                    alert("✅ Submitted")
                    document.getElementById("name").disabled = true
                    document.getElementById("email").disabled = true
                    document.getElementById("subject").disabled = true
                    document.getElementById("phone").disabled = true
                    document.getElementById("message").disabled = true
                }

                if (res.status != 200) {
                    document.querySelector(".success_message.success").classList.add("active")
                    document.getElementById("fliptree=partners-contact-us-form").reset()
                }

            }).catch((err) => {
                document.querySelector(".success_message.failed").classList.add("active")
                document.getElementById("fliptree=partners-contact-us-form").reset()
            })
        }
    });


})


document.addEventListener("click", function (e) {
    var successMessage = document.querySelector(".success_message.active");
    if (
        !e.target.matches("#submit") &&
        !e.target.closest(".success_message") &&
        successMessage.classList.contains("active")
    ) {
        successMessage.classList.remove("active"); // Hide the success message when clicked outside
    }
});