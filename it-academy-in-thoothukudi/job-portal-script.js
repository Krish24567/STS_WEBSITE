const HASURA_URL = "https://adapted-guinea-87.hasura.app/v1/graphql";
const HASURA_SECRET = "juF64ZknQvAdAKZp4lTEv4jKUHa5q8OxX4TaBFcEy9lNgNl0mW1GooL3shazlmwW";

let jobs = [];

// ===============================
// FETCH JOBS
// ===============================
async function fetchJobs() {
    try {
        const response = await fetch(HASURA_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-hasura-admin-secret": HASURA_SECRET
            },
            body: JSON.stringify({
                query: `
                query {
                    job_data(
                        where: {
                            status: { _eq: "Active" }
                        }
                        order_by: {
                            created_at: desc
                        }
                    ) {
                        id
                        title
                        company_name
                        posted_date
                        short_description
                        job_description
                        apply_link
                    }
                }
                `
            })
        });

        const result = await response.json();

        if (result.errors) {
            console.error(result.errors);
            throw new Error("GraphQL Error");
        }

        jobs = result?.data?.job_data || [];

        displayJobs(jobs);

    } catch (err) {
        console.error(err);

        document.getElementById("jobs").innerHTML = `
            <div class="empty">
                Unable to load jobs.
            </div>
        `;
    }
}

// ===============================
// DISPLAY JOBS
// ===============================
function displayJobs(jobList) {

    const container = document.getElementById("jobs");

    if (!jobList.length) {
        container.innerHTML = `
            <div class="empty">
                No Jobs Found
            </div>
        `;
        return;
    }

    container.innerHTML = jobList.map(job => {

        const postedDate = job.posted_date
            ? new Date(job.posted_date)
                .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                })
                .replace(/ /g, "-")
            : "-";

        return `
            <div class="job-card">

                <span class="badge">
                    New Opening
                </span>

                <div class="job-title">
                    ${job.title || ""}
                </div>

                <div class="company">
                    ${job.company_name || ""}
                </div>

                <div class="meta">
                    📅 Posted : ${postedDate}
                    <br>
                    💼 Samudhra Tech Solutions
                </div>

                <p class="description">
                    ${job.short_description || ""}
                </p>

                <div class="actions">
                    <a
                        class="read-btn"
                        href="job-details.html?id=${job.id}"
                    >
                        Read More
                    </a>
                </div>

            </div>
        `;

    }).join("");
}

// ===============================
// SEARCH
// ===============================
function searchJobs() {

    const searchInput = document.getElementById("search");

    if (!searchInput) return;

    searchInput.addEventListener("input", function () {

        const value = this.value.trim().toLowerCase();

        if (value === "") {
            displayJobs(jobs);
            return;
        }

        const filtered = jobs.filter(job => {

            return (
                (job.title || "").toLowerCase().includes(value) ||
                (job.company_name || "").toLowerCase().includes(value) ||
                (job.short_description || "").toLowerCase().includes(value)
            );

        });

        displayJobs(filtered);

    });

}

// ===============================
// INITIALIZE
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    fetchJobs();
    searchJobs();
});