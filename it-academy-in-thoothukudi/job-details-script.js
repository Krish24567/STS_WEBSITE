const HASURA_URL = "https://adapted-guinea-87.hasura.app/v1/graphql";
const HASURA_SECRET = "juF64ZknQvAdAKZp4lTEv4jKUHa5q8OxX4TaBFcEy9lNgNl0mW1GooL3shazlmwW";


const params = new URLSearchParams(window.location.search);

const jobId = params.get("id");


const container = document.getElementById("jobDetails");



async function fetchJobDetails() {


    if (!jobId) {

        container.innerHTML = `
        <div class="loading">
            Job ID not found.
        </div>
        `;

        return;

    }



    try {


        const response = await fetch(HASURA_URL, {


            method:"POST",


            headers:{


                "Content-Type":"application/json",

                "x-hasura-admin-secret":HASURA_SECRET

            },


            body:JSON.stringify({


                query:`

                query GetJob($id:uuid!){


                    job_data_by_pk(id:$id){


                        id

                        title

                        company_name

                        posted_date


                        short_description

                        job_description


                        role

                        qualification

                        experience

                        location

                        employment_type


                        apply_links


                        status


                    }

                }

                `,


                variables:{

                    id:jobId

                }


            })


        });



        const result = await response.json();



        if(result.errors){

            throw new Error(result.errors[0].message);

        }



        const job=result.data.job_data_by_pk;



        if(!job){


            container.innerHTML=`

            <div class="loading">
                Job not found.
            </div>

            `;


            return;

        }



        displayJob(job);



    }

    catch(error){


        console.log(error);



        container.innerHTML=`

        <div class="loading">
            Unable to load job details.
        </div>

        `;


    }


}







function formatText(text){


    return text

    .replace(/\n/g,"<br>")

    .replace(/•/g,"✓")

    .replace(/✅/g,"✓");


}







function createAccordion(title,icon,content){


    if(!content) return "";



    return `


    <div class="accordion">


        <button class="accordion-header">


            <span>

                ${icon} ${title}

            </span>


            <span>
                +
            </span>


        </button>



        <div class="accordion-content">


            <p>

                ${formatText(content)}

            </p>


        </div>


    </div>


    `;


}









function displayJob(job){



    const postedDate = job.posted_date

    ? new Date(job.posted_date)

    .toLocaleDateString(
        "en-GB",
        {
            day:"2-digit",
            month:"short",
            year:"numeric"
        }
    )

    .replace(/ /g,"-")


    :"N/A";








    const applyButtons =


    job.apply_links && job.apply_links.length


    ?


    `

    <div class="apply-buttons">


    ${

    job.apply_links.map(link=>`


        <a

        href="${link.url}"

        target="_blank"

        class="apply-btn"

        >

        ${link.label || "Apply Now"} 🚀

        </a>


    `).join("")


    }


    </div>


    `


    :


    `

    <a class="apply-btn"

    style="opacity:.6;pointer-events:none">

    Application Closed

    </a>

    `;







    container.innerHTML=`



<div class="details-card">



<span class="badge">

🚀 Hiring Now

</span>





<h1 class="job-title">

${job.title || "Job Opportunity"}

</h1>





<div class="company">

🏢 ${job.company_name || "Company"}

</div>






<div class="meta">


<span>

📅 Posted : ${postedDate}

</span>


<span>

💼 ${job.employment_type || "Full Time"}

</span>


</div>







<div class="divider"></div>






<h3 class="overview-title">

💼 Job Overview

</h3>







<div class="overview-grid">





<div class="overview-card">


<div class="overview-icon">
💼
</div>


<div>

<h4>
Role
</h4>


<p>
${job.role || job.title}
</p>


</div>


</div>







<div class="overview-card">


<div class="overview-icon">
🎓
</div>


<div>

<h4>
Qualification
</h4>


<p>
${job.qualification || "Not Specified"}
</p>


</div>


</div>







<div class="overview-card">


<div class="overview-icon">
👨‍💻
</div>


<div>

<h4>
Experience
</h4>


<p>
${job.experience || "Not Specified"}
</p>


</div>


</div>







<div class="overview-card">


<div class="overview-icon">
📍
</div>


<div>

<h4>
Location
</h4>


<p>
${job.location || "Not Specified"}
</p>


</div>


</div>





</div>







<div class="divider"></div>





${applyButtons}





<div class="divider"></div>






<div class="section">


<h3>

📌 About This Job

</h3>


<p>

${job.short_description || "No description available"}

</p>


</div>






${

createAccordion(

"Job Description",

"📋",

job.job_description

)


}






</div>



`;



activateAccordion();


}









function activateAccordion(){



document.querySelectorAll(".accordion-header")

.forEach(button=>{


button.addEventListener("click",()=>{


const content = button.nextElementSibling;



content.classList.toggle("show");

button.classList.toggle("active");


});


});


}






fetchJobDetails();