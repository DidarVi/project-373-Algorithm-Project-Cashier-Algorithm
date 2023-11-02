<?php
// Establishing a connection to the MySQL database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cse373project";

$conn = mysqli_connect($servername, $username, $password, $dbname);

// Checking the connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Fetching data from the "greedy" table
$sql = "SELECT input, time FROM greedy";
$result = mysqli_query($conn, $sql);

// Creating arrays to store the data
$inputData = array();
$timeData = array();

// Extracting data from the result set
while ($row = mysqli_fetch_assoc($result)) {
    $inputData[] = $row['input'];
    $timeData[] = $row['time'];
}

// Closing the database connection
mysqli_close($conn);

// Creating the line graph using the retrieved data
?>

<!DOCTYPE html>
<html>
<head>
    <title>Input vs Time Line Graph</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div style="width: 800px; height: 400px;">
        <canvas id="lineChart"></canvas>
    </div>

    <script>
        // Creating a line chart using Chart.js library
        var ctx = document.getElementById('lineChart').getContext('2d');
        var lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: <?php echo json_encode($inputData); ?>,
                datasets: [{
                    label: 'Input vs Time',
                    data: <?php echo json_encode($timeData); ?>,
                    borderColor: 'blue',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Input'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    }
                }
            }
        });
    </script>
</body>
</html>
