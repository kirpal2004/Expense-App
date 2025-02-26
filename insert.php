<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Database connection
$conn = new mysqli("localhost", "root", "", "myblog");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// Get raw POST data
$data = file_get_contents("php://input");

// Debugging: Log received data
error_log("Received JSON: " . $data);

$decoded_data = json_decode($data, true);

// Check if JSON is valid
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON received", "raw_data" => $data]);
    exit();
}

// Check if required fields exist
if (!isset($decoded_data['title'], $decoded_data['price'], $decoded_data['date'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit();
}

// Sanitize and validate input
$title = trim($decoded_data['title']);
$price = filter_var($decoded_data['price'], FILTER_VALIDATE_INT);
$date = trim($decoded_data['date']);

if (!$title || $price === false || !$date) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input values"]);
    exit();
}

// Prepare and execute SQL statement (Prevents SQL Injection)
$stmt = $conn->prepare("INSERT INTO expense (title, price, date) VALUES (?, ?, ?)");
$stmt->bind_param("sis", $title, $price, $date);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "id" => $conn->insert_id, 
        "data" => [ 
            "id" => $conn->insert_id, // ✅ Inserted ID
            "title" => $title,
            "price" => (string) $price,  
            "date" => $date
        ],
        "message" => "Expense added successfully"
    ]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
