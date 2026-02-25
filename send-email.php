?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set response header
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim(htmlspecialchars($_POST['name'])) : '';
$email = isset($_POST['email']) ? trim(htmlspecialchars($_POST['email'])) : '';
$subject = isset($_POST['subject']) ? trim(htmlspecialchars($_POST['subject'])) : '';
$message = isset($_POST['message']) ? trim(htmlspecialchars($_POST['message'])) : '';

// Validate inputs
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Your email address
$to = 'madhanramalingam07@gmail.com';

// Email headers
$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Email body
$body = "Name: " . $name . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Subject: " . $subject . "\n\n";
$body .= "Message:\n" . $message;

// Send email
if (mail($to, "[Portfolio Contact] " . $subject, $body, $headers)) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Email sent successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again.']);
}
?>
