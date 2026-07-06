form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fields = ['name', 'college', 'department', 'email', 'phone', 'domain', 'preferred_mode','message'];
    let valid = true;

    fields.forEach((field) => {
        const input = document.getElementById(field);

        if (!input.value.trim()) {
            valid = false;
            input.style.borderColor = 'rgba(255,0,0,0.6)';
        } else {
            input.style.borderColor = 'rgba(49,68,149,0.12)';
        }
    });

    if (!valid) return;

    internshipSubmitButton.disabled = true;
    internshipSubmitButton.textContent = 'Submitting...';

    try {

        // 1. Submit to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            alert('Failed to submit application');
            console.log(result);
            return;
        }

        // 2. Save to Hasura DB (⚠️ better to move this to backend later)
        const dbResponse = await fetch("https://adapted-guinea-87.hasura.app/v1/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-hasura-admin-secret": "juF64ZknQvAdAKZp4lTEv4jKUHa5q8OxX4TaBFcEy9lNgNl0mW1GooL3shazlmwW"
            },
            body: JSON.stringify({
                query: `
                    mutation InsertData(
                        $name: String!,
                        $college: String!,
                        $department: String!,
                        $email: String!,
                        $phone: bigint!,
                        $domain: String!,
                        $preferred_mode: String!,
                        $message: String!
                    ) {
                        insert_internship_data_one(object: {
                            name: $name,
                            college_name: $college,
                            department: $department,
                            email: $email,
                            phone: $phone,
                            domain: $domain,
                            preferred_mode: $preferred_mode,
                            message: $message,
                            status: "Pending"
                        }) {
                            email
                        }
                    }
                `,
                variables: {
                    name: document.getElementById("name").value,
                    college: document.getElementById("college").value,
                    department: document.getElementById("department").value,
                    email: document.getElementById("email").value,
                    phone: document.getElementById("phone").value,
                    domain: document.getElementById("domain").value,
                    preferred_mode: document.getElementById("preferred_mode").value,
                    message: document.getElementById("message").value
                }
            })
        });

        const dbResult = await dbResponse.json();
        console.log("DB RESULT:", dbResult);

        if (dbResult.errors) {
            console.log("DB ERROR:", dbResult.errors);
            alert(dbResult.errors[0].message);
        }

        successToast.innerText = 'Application submitted successfully!';
        successToast.style.display = 'block';

        form.reset();

        setTimeout(() => {
            successToast.style.display = 'none';
        }, 4000);

    } catch (error) {
        console.error(error);
        alert('Something went wrong!');
    } finally {
        internshipSubmitButton.disabled = false;
        internshipSubmitButton.textContent = 'Submit Application';
    }
});
