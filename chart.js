// Function to initialize the donut chart
function createChart(completedChapters, totalChapters) {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    // Creating the donut chart
    const progressChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Remaining'],
        datasets: [{
          data: [completedChapters, totalChapters - completedChapters],
          backgroundColor: ['#4caf50', '#e0e0e0'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.raw + ' chapters';
              }
            }
          },
          legend: {
            display: false
          }
        }
      }
    });
  }
  
  // Function to update the chart dynamically when chapters are ticked off
  function updateChart() {
    const completedChapters = [];
    Object.keys(chaptersData).forEach(subject => {
      Object.keys(chaptersData[subject]).forEach(classLevel => {
        const chapters = chaptersData[subject][classLevel];
        chapters.forEach(chapter => {
          if (chapter.completed) {
            completedChapters.push(chapter);
          }
        });
      });
    });
  
    const totalChapters = Object.keys(chaptersData).reduce((total, subject) => {
      return total + Object.keys(chaptersData[subject]).reduce((sum, classLevel) => {
        return sum + chaptersData[subject][classLevel].length;
      }, 0);
    }, 0);
  
    const progressPercent = (completedChapters.length / totalChapters) * 100;
    document.getElementById('progressPercent').innerText = `${progressPercent.toFixed(2)}%`;
  
    // Updating the donut chart
    createChart(completedChapters.length, totalChapters);
  }
  
  // Initialize chart when the page loads
  window.onload = function() {
    updateChart();  // Call updateChart to show the initial state of progress
  };
  