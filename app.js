let chartInstance = null; // Declare a variable to hold the chart instance

function calculateProjection() {
    // Get input values
    const monthlySaving = parseFloat(document.getElementById('monthlySaving').value);
    const currentFund = parseFloat(document.getElementById('currentFund').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const projectionYear = parseInt(document.getElementById('projectionYear').value);

    // Calculate annual saving
    const annualSaving = monthlySaving * 12;
    const currentYear = new Date().getFullYear();
    let totalAmountSaved = currentFund;

    // Arrays to hold the data for the graph
    const years = [];
    const funds = [];
    const labels = [];
    const amountSaved = [];

    // Initial values
    let fund = currentFund;

    // Populate data for each year up to the projection year
    for (let year = currentYear; year <= projectionYear; year++) {
       

        // Calculate the next year's fund value
        fund += annualSaving; // add annual saving
        totalAmountSaved += annualSaving;
        fund *= (1 + interestRate); // apply interest rate

        years.push(year);
        funds.push(fund);
        amountSaved.push(totalAmountSaved)
    }

    // Display the discounted gross income results
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('result').innerHTML = `
        
        <p>The accumulated value of your savings at the end of ${projectionYear} would be £${Math.round(fund).toLocaleString()}</p>
        <p>The total amount you would have paid into savings, including your current fund is £${Math.round(totalAmountSaved+currentFund).toLocaleString()}</p>
        <p>The total interest earned would be £${Math.round(fund-totalAmountSaved-currentFund).toLocaleString()}</p>
         
        
    `;



    // Draw the chart
    generateGraph(years, funds, amountSaved);
}



function generateGraph(yearsData, fundData, amountSavedData) {
    

    // Reveal the graph container
    document.getElementById('chartContainer').classList.remove('d-none');
    document.getElementById('result').classList.remove('d-none');

    // Destroy the previous chart instance if it exists
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Create a new chart for Graph 3
    const ctx3 = document.getElementById('Graph').getContext('2d');
    chartInstance = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: yearsData,
            datasets: [
            {
                label: 'Accumulated Savings',
                data: fundData,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
                tension: 0.1
            },
            {
                label: 'Total Amount Saved',
                data: amountSavedData,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: false,
                tension: 0.1
            }
            
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,  // Allows height to be controlled via CSS
            
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        color: '#333',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: false // Hide the x-axis grid lines
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Savings (£)',
                        color: '#333',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)', // Light grid lines
                        borderDash: [5, 5] // Dotted grid lines
                    }
                    
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Set up event listener for form submission
    document.getElementById('pensionForm').addEventListener('submit', generateGraph);
});
