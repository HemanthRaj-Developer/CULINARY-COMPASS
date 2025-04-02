
<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
$username = $_SESSION['username'];
?>
<link rel="stylesheet" href="style.css">
<h1>Welcome, <?php echo htmlspecialchars($username); ?>!</h1>
<a href="logout.php">Logout</a